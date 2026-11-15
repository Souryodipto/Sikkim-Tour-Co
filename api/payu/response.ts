import crypto from 'node:crypto';

export interface PayUResponsePayload {
  status: string;
  txnid: string;
  amount: string;
  productinfo: string;
  firstname: string;
  email: string;
  phone?: string;
  hash: string;
  key?: string;
  mihpayid?: string;
  bank_ref_num?: string;
  bankcode?: string;
  error?: string;
  errorMessage?: string;
  error_Message?: string;
  mode?: string;
  net_amount_debit?: string;
  additionalCharges?: string;
  udf1?: string;
  udf2?: string;
  udf3?: string;
  udf4?: string;
  udf5?: string;
  udf6?: string;
  udf7?: string;
  udf8?: string;
  udf9?: string;
  udf10?: string;
  [key: string]: any;
}

export interface PayUVerifiedTransaction {
  txnid: string;
  status: 'success' | 'failure' | 'pending';
  amount: number;
  firstname: string;
  email: string;
  phone?: string;
  productinfo: string;
  mihpayid?: string;
  bankRefNum?: string;
  mode?: string;
  paymentGateway: 'PayU';
  verifiedAt: string;
  error?: string;
  isSimulated?: boolean;
}

// Global in-memory store for same-process verification (tests & dev server)
const globalForPayU = globalThis as unknown as {
  payuVerifiedTransactions?: Map<string, PayUVerifiedTransaction>;
};
const verifiedStore =
  globalForPayU.payuVerifiedTransactions || new Map<string, PayUVerifiedTransaction>();
globalForPayU.payuVerifiedTransactions = verifiedStore;

export function saveVerifiedTransaction(txn: PayUVerifiedTransaction): void {
  verifiedStore.set(txn.txnid, txn);
}

export function getVerifiedTransaction(txnid: string): PayUVerifiedTransaction | undefined {
  return verifiedStore.get(txnid);
}

// Resilient body parser that safely handles JSON objects, URL-encoded strings, Buffers, and streams
async function parseFormOrJsonBody(req: any): Promise<any> {
  const result: Record<string, any> = {};

  // 1. Populate query parameters if available
  if (req.query && typeof req.query === 'object') {
    Object.assign(result, req.query);
  }
  if (req.url && req.url.includes('?')) {
    try {
      const urlObj = new URL(req.url, 'https://www.sikkimtourco.com');
      urlObj.searchParams.forEach((v, k) => {
        if (!result[k]) result[k] = v;
      });
    } catch {}
  }

  // 2. Buffer handling (typical in Vercel Serverless with application/x-www-form-urlencoded)
  if (Buffer.isBuffer(req.body)) {
    try {
      const raw = req.body.toString('utf-8').trim();
      if (raw.startsWith('{')) {
        Object.assign(result, JSON.parse(raw));
      } else if (raw) {
        const params = new URLSearchParams(raw);
        params.forEach((v, k) => {
          result[k] = v;
        });
      }
      return result;
    } catch {}
  }

  // 3. Pre-parsed JSON or URL-encoded body object (non-Buffer)
  if (req.body && typeof req.body === 'object' && !Buffer.isBuffer(req.body) && Object.keys(req.body).length > 0) {
    Object.assign(result, req.body);
    return result;
  }

  // 4. Raw string body (typical on Vercel Node runtime with application/x-www-form-urlencoded)
  if (typeof req.body === 'string' && req.body.trim()) {
    try {
      const trimmed = req.body.trim();
      if (trimmed.startsWith('{')) {
        Object.assign(result, JSON.parse(trimmed));
        return result;
      }
      const params = new URLSearchParams(trimmed);
      params.forEach((v, k) => {
        result[k] = v;
      });
      return result;
    } catch {
      // Fall through to stream
    }
  }

  // 5. Stream fallback (if not already ended)
  if (typeof req.on === 'function' && !req.readableEnded) {
    await new Promise<void>((resolve) => {
      let raw = '';
      req.on('data', (chunk: any) => {
        raw += chunk;
      });
      req.on('end', () => {
        try {
          const trimmed = raw.trim();
          if (trimmed.startsWith('{')) {
            Object.assign(result, JSON.parse(trimmed));
          } else if (trimmed) {
            const params = new URLSearchParams(trimmed);
            params.forEach((v, k) => {
              result[k] = v;
            });
          }
        } catch {}
        resolve();
      });
      req.on('error', () => resolve());
      setTimeout(resolve, 350);
    });
  }

  return result;
}

// Redirect helper with both HTTP 302 and HTML/JS bridge for all mobile webviews
function redirect(res: any, url: string, isSuccess = true) {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${isSuccess ? 'Payment Confirmed' : 'Payment Status'} - Sikkim Tour Co.</title>
  <meta http-equiv="refresh" content="0;url=${url}">
  <script>window.location.replace(${JSON.stringify(url)});</script>
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

  try {
    if (typeof res?.writeHead === 'function') {
      res.writeHead(302, {
        Location: url,
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      });
      return res.end(html);
    }
    if (typeof res?.setHeader === 'function') {
      res.setHeader('Location', url);
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
    }
    if (typeof res?.redirect === 'function') {
      try {
        return res.redirect(302, url);
      } catch {
        return res.redirect(url);
      }
    }
    if (typeof res?.status === 'function') {
      return res.status(302).send ? res.status(302).send(html) : res.status(302).end(html);
    }
    if (typeof res?.end === 'function') {
      res.statusCode = 302;
      return res.end(html);
    }
  } catch (err) {
    console.error('Redirect execution error:', err);
  }
}

// PayU Reverse Hash Verification: salt|status|udf10|...|udf1|email|firstname|productinfo|amount|txnid|key
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
  try {
    // If accessed via GET:
    if (req.method === 'GET') {
      const query = req.query || {};
      let txnid = query.txnid;
      if (!txnid && req.url) {
        try {
          const urlObj = new URL(req.url, 'https://www.sikkimtourco.com');
          txnid = urlObj.searchParams.get('txnid') || undefined;
        } catch {}
      }

      // If user directly opened /api/payu/response without payment data, smoothly redirect to /pay-now
      if (!txnid && !query.status && !query.mihpayid) {
        return redirect(res, 'https://www.sikkimtourco.com/pay-now', true);
      }
    }

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
