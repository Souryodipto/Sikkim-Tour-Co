import type { IncomingMessage, ServerResponse } from 'node:http';
import {
  verifyPayUResponseHash,
  saveVerifiedTransaction,
  PayUResponsePayload,
  PayUVerifiedTransaction,
} from '../../src/utils/payu';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed. PayU callbacks must be HTTP POST.');
  }

  try {
    const payload: PayUResponsePayload = req.body || {};

    const merchantSalt = process.env.PAYU_MERCHANT_SALT || 'eCwWELxi';

    // Verify reverse hash signature
    const isValidHash = verifyPayUResponseHash(payload, merchantSalt);
    const isSuccess = payload.status?.toLowerCase() === 'success';

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
      // Record genuine verified payment
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

      // Redirect to frontend Payment Success page
      const successUrl = `/payment-success?txnid=${encodeURIComponent(txnid)}&amount=${encodeURIComponent(
        amount
      )}&mihpayid=${encodeURIComponent(mihpayid)}&mode=${encodeURIComponent(mode)}&status=success`;

      if (typeof res.redirect === 'function') {
        return res.redirect(302, successUrl);
      } else {
        res.writeHead(302, { Location: successUrl });
        return res.end();
      }
    } else {
      // Record failed or unverified payment
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

      // Redirect to frontend Payment Failure page
      const failureUrl = `/payment-failure?txnid=${encodeURIComponent(txnid)}&error=${encodeURIComponent(
        errorMessage
      )}&amount=${encodeURIComponent(amount)}`;

      if (typeof res.redirect === 'function') {
        return res.redirect(302, failureUrl);
      } else {
        res.writeHead(302, { Location: failureUrl });
        return res.end();
      }
    }
  } catch (error: any) {
    console.error('PayU Response Processing Error:', error);
    const fallbackFailureUrl = `/payment-failure?error=${encodeURIComponent(
      'An unexpected error occurred during payment processing. Please contact support.'
    )}`;
    if (typeof res.redirect === 'function') {
      return res.redirect(302, fallbackFailureUrl);
    } else {
      res.writeHead(302, { Location: fallbackFailureUrl });
      return res.end();
    }
  }
}
