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

function redirect(res: any, url: string) {
  if (typeof res.redirect === 'function') {
    return res.redirect(302, url);
  }
  if (typeof res.writeHead === 'function') {
    res.writeHead(302, { Location: url });
    return res.end();
  }
  if (typeof Response !== 'undefined') {
    return Response.redirect(url, 302);
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

    const txnid = payload.txnid || `UNKNOWN-${Date.now()}`;
    const amount = parseFloat(payload.amount || '0');
    const mihpayid = payload.mihpayid || '';
    const mode = payload.mode || 'Online';
    const errorMessage =
      payload.error_Message ||
      payload.errorMessage ||
      payload.error ||
      (!isValidHash ? 'Digital signature verification failed (tampered response)' : 'Transaction unsuccessful');

    if (isValidHash && isSuccess) {
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

      const successUrl = `/payment-success?txnid=${encodeURIComponent(txnid)}&amount=${encodeURIComponent(
        amount
      )}&mihpayid=${encodeURIComponent(mihpayid)}&mode=${encodeURIComponent(mode)}&status=success`;

      return redirect(res, successUrl);
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

      const failureUrl = `/payment-failure?txnid=${encodeURIComponent(txnid)}&error=${encodeURIComponent(
        errorMessage
      )}&amount=${encodeURIComponent(amount)}`;

      return redirect(res, failureUrl);
    }
  } catch (error: any) {
    console.error('PayU Response Processing Error:', error);
    const fallbackFailureUrl = `/payment-failure?error=${encodeURIComponent(
      'An unexpected error occurred during payment processing. Please contact support.'
    )}`;
    return redirect(res, fallbackFailureUrl);
  }
}
