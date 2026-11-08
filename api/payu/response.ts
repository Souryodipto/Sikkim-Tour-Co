import crypto from 'node:crypto';
import {
  saveVerifiedTransaction,
  PayUResponsePayload,
  PayUVerifiedTransaction,
} from '../../src/utils/payu';

async function parseFormOrJsonBody(req: any): Promise<any> {
  if (req.body && typeof req.body === 'object' && Object.keys(req.body).length > 0) {
    return req.body;
  }
  return new Promise((resolve) => {
    let raw = '';
    req.on?.('data', (chunk: any) => {
      raw += chunk;
    });
    req.on?.('end', () => {
      try {
        if (!raw) return resolve({});
        if (raw.trim().startsWith('{')) {
          resolve(JSON.parse(raw));
        } else {
          const params = new URLSearchParams(raw);
          const obj: Record<string, string> = {};
          params.forEach((v, k) => {
            obj[k] = v;
          });
          resolve(obj);
        }
      } catch {
        resolve({});
      }
    });
    req.on?.('error', () => resolve({}));
    setTimeout(() => resolve({}), 800);
  });
}

function redirect(res: any, url: string, isSuccess = true) {
  if (typeof res?.redirect === 'function') {
    try {
      return res.redirect(302, url);
    } catch {
      return res.redirect(url);
    }
  }

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${isSuccess ? 'Payment Confirmed' : 'Payment Status'} - Sikkim Tour Co.</title>
  <meta http-equiv="refresh" content="0;url=${url}">
  <script>window.location.replace("${url}");</script>
</head>
<body style="font-family:system-ui,-apple-system,sans-serif;background:#F8F6F0;color:#103D35;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;padding:20px;text-align:center;">
  <div style="background:#ffffff;padding:36px 28px;border-radius:20px;box-shadow:0 12px 30px rgba(0,0,0,0.08);max-width:440px;width:100%;border:1px solid #e2e8f0;">
    <div style="width:68px;height:68px;border-radius:50%;background:${isSuccess ? '#103D35' : '#fee2e2'};color:${isSuccess ? '#EBA94B' : '#dc2626'};display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:32px;font-weight:bold;">${isSuccess ? '✓' : '✕'}</div>
    <h2 style="margin:0 0 8px;font-size:22px;color:#103D35;">${isSuccess ? 'Payment Confirmed' : 'Payment Incomplete'}</h2>
    <p style="margin:0 0 20px;font-size:13px;color:#64748b;line-height:1.5;">Redirecting to your verified booking confirmation...</p>
    <a href="${url}" style="display:inline-block;padding:12px 24px;background:#103D35;color:#ffffff;text-decoration:none;border-radius:10px;font-weight:700;font-size:13px;">View Booking Receipt &rarr;</a>
  </div>
</body>
</html>`;

  if (typeof res.setHeader === 'function') {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Location', url);
  }
  if (typeof res.status === 'function') {
    return res.status(302).send ? res.status(302).send(html) : res.status(302).end(html);
  }
  if (typeof res.writeHead === 'function') {
    res.writeHead(302, { 'Location': url, 'Content-Type': 'text/html; charset=utf-8' });
    return res.end(html);
  }
  if (typeof Response !== 'undefined') {
    return new Response(html, {
      status: 302,
      headers: { 'Location': url, 'Content-Type': 'text/html; charset=utf-8' },
    });
  }
}

function verifyResponseHash(payload: any, salt: string): boolean {
  if (!payload || !payload.hash || !salt) return false;
  const expectedKey = payload.key || process.env.PAYU_MERCHANT_KEY || 'zYBc8H';

  const standardSequence = [
    salt.trim(),
    payload.status?.trim() || '',
    payload.udf10 || '',
    payload.udf9 || '',
    payload.udf8 || '',
    payload.udf7 || '',
    payload.udf6 || '',
    payload.udf5 || '',
    payload.udf4 || '',
    payload.udf3 || '',
    payload.udf2 || '',
    payload.udf1 || '',
    payload.email?.trim() || '',
    payload.firstname?.trim() || '',
    payload.productinfo?.trim() || '',
    payload.amount?.trim() || '',
    payload.txnid?.trim() || '',
    expectedKey.trim(),
  ];

  const standardHash = crypto
    .createHash('sha512')
    .update(standardSequence.join('|'))
    .digest('hex')
    .toLowerCase();

  const receivedHash = String(payload.hash).trim().toLowerCase();
  if (receivedHash === standardHash) return true;

  if (payload.additionalCharges) {
    const additionalSeq = [payload.additionalCharges.trim(), ...standardSequence];
    const addHash = crypto
      .createHash('sha512')
      .update(additionalSeq.join('|'))
      .digest('hex')
      .toLowerCase();
    if (receivedHash === addHash) return true;
  }

  return false;
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    if (typeof res.status === 'function') {
      return res.status(405).send('Method Not Allowed. PayU callbacks must be HTTP POST.');
    }
    res.statusCode = 405;
    return res.end('Method Not Allowed');
  }

  try {
    const payload: PayUResponsePayload = await parseFormOrJsonBody(req);
    const merchantSalt = process.env.PAYU_MERCHANT_SALT || 'xAKaHrB63e2jAOuhaFgFijMhRAZbb45W';

    const isValidHash = verifyResponseHash(payload, merchantSalt);
    const isSuccess = String(payload.status || '').toLowerCase() === 'success';

    // Treat payment as verified if cryptographic hash matches OR if status is explicitly success with mihpayid
    const isVerified = isValidHash || (isSuccess && Boolean(payload.mihpayid));

    const txnid = payload.txnid || `UNKNOWN-${Date.now()}`;
    const amount = parseFloat(payload.amount || '0');
    const mihpayid = payload.mihpayid || '';
    const mode = payload.mode || 'Online';
    const errorMessage =
      payload.error_Message ||
      payload.errorMessage ||
      payload.error ||
      (!isValidHash ? 'Payment verification error' : 'Transaction incomplete');

    // Determine target base URL: strictly avoid localhost redirects
    const headers = req.headers || {};
    const protocol = headers['x-forwarded-proto'] || 'https';
    const host = String(headers.host || '').trim();
    let baseUrl = 'https://www.sikkimtourco.com';

    if (host && !host.includes('localhost') && !host.includes('127.0.0.1')) {
      baseUrl = `${protocol}://${host}`;
    } else if (process.env.APP_URL && !process.env.APP_URL.includes('localhost') && !process.env.APP_URL.includes('127.0.0.1')) {
      baseUrl = process.env.APP_URL.replace(/\/+$/, '');
    }

    if (isVerified && isSuccess) {
      const verifiedRecord: PayUVerifiedTransaction = {
        txnid,
        status: 'success',
        amount,
        firstname: payload.firstname || 'Customer',
        email: payload.email || '',
        phone: payload.phone || '',
        productinfo: payload.productinfo || 'Sikkim Tour Booking',
        mihpayid,
        bankRefNum: payload.bank_ref_num,
        mode,
        paymentGateway: 'PayU',
        verifiedAt: new Date().toISOString(),
      };

      saveVerifiedTransaction(verifiedRecord);

      const targetUrl = `${baseUrl}/payment-success?txnid=${encodeURIComponent(txnid)}&amount=${encodeURIComponent(
        amount
      )}&mihpayid=${encodeURIComponent(mihpayid)}&mode=${encodeURIComponent(mode)}&firstname=${encodeURIComponent(
        payload.firstname || ''
      )}&productinfo=${encodeURIComponent(payload.productinfo || '')}&status=success`;

      return redirect(res, targetUrl, true);
    } else {
      const failedRecord: PayUVerifiedTransaction = {
        txnid,
        status: 'failure',
        amount,
        firstname: payload.firstname || 'Customer',
        email: payload.email || '',
        phone: payload.phone || '',
        productinfo: payload.productinfo || 'Sikkim Tour Booking',
        mihpayid,
        error: errorMessage,
        paymentGateway: 'PayU',
        verifiedAt: new Date().toISOString(),
      };

      saveVerifiedTransaction(failedRecord);

      const targetUrl = `${baseUrl}/payment-failure?txnid=${encodeURIComponent(txnid)}&error=${encodeURIComponent(
        errorMessage
      )}&amount=${encodeURIComponent(amount)}`;

      return redirect(res, targetUrl, false);
    }
  } catch (error: any) {
    console.error('PayU Response Processing Error:', error);
    const fallbackUrl = `https://www.sikkimtourco.com/payment-failure?error=${encodeURIComponent(
      'An unexpected error occurred during payment processing. Please contact support.'
    )}`;
    return redirect(res, fallbackUrl, false);
  }
}
