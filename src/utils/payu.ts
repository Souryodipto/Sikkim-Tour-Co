import crypto from 'node:crypto';

export interface PayUPaymentRequestInput {
  key?: string;
  txnid: string;
  amount: string | number;
  productinfo: string;
  firstname: string;
  email: string;
  phone: string;
  surl?: string;
  furl?: string;
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
}

export interface PayUPaymentRequestPayload extends PayUPaymentRequestInput {
  key: string;
  amount: string;
  surl: string;
  furl: string;
  hash: string;
  service_provider?: string;
}

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

/**
 * Standard PayU Gateway Endpoint URLs
 */
export function getPayUGatewayUrl(env?: string): string {
  const currentEnv = env || process.env.PAYU_ENV || 'test';
  const isProd = currentEnv.toLowerCase() === 'prod' || currentEnv.toLowerCase() === 'production';
  return isProd ? 'https://secure.payu.in/_payment' : 'https://test.payu.in/_payment';
}

/**
 * Normalizes amount to string with up to 2 decimal places (e.g. "5000.00" or "5000")
 */
export function formatPayUAmount(amount: string | number): string {
  const num = typeof amount === 'number' ? amount : parseFloat(amount);
  if (isNaN(num)) return '0.00';
  return num.toFixed(2);
}

/**
 * Generates the SHA-512 Payment Request Hash for PayU Hosted Checkout.
 * Formula: sha512(key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5|udf6|udf7|udf8|udf9|udf10|SALT)
 */
export function generatePayUHash(
  params: {
    key: string;
    txnid: string;
    amount: string | number;
    productinfo: string;
    firstname: string;
    email: string;
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
  },
  salt: string
): string {
  const formattedAmount = formatPayUAmount(params.amount);
  
  const sequence = [
    params.key.trim(),
    params.txnid.trim(),
    formattedAmount,
    params.productinfo.trim(),
    params.firstname.trim(),
    params.email.trim(),
    params.udf1 || '',
    params.udf2 || '',
    params.udf3 || '',
    params.udf4 || '',
    params.udf5 || '',
    params.udf6 || '',
    params.udf7 || '',
    params.udf8 || '',
    params.udf9 || '',
    params.udf10 || '',
    salt.trim(),
  ];

  const hashString = sequence.join('|');
  return crypto.createHash('sha512').update(hashString).digest('hex').toLowerCase();
}

/**
 * Verifies the PayU Response SHA-512 Hash.
 * Reverse Formula:
 * If additionalCharges: sha512(additionalCharges|SALT|status||||||udf5|udf4|udf3|udf2|udf1|email|firstname|productinfo|amount|txnid|key)
 * Without: sha512(SALT|status||||||udf5|udf4|udf3|udf2|udf1|email|firstname|productinfo|amount|txnid|key)
 */
export function verifyPayUResponseHash(payload: PayUResponsePayload, salt: string): boolean {
  if (!payload || !payload.hash || !salt) {
    return false;
  }

  const expectedKey = payload.key || process.env.PAYU_MERCHANT_KEY || '';

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

  const receivedHash = payload.hash.trim().toLowerCase();

  if (receivedHash === standardHash) {
    return true;
  }

  // Check additionalCharges variation if present
  if (payload.additionalCharges) {
    const additionalSequence = [payload.additionalCharges.trim(), ...standardSequence];
    const additionalHash = crypto
      .createHash('sha512')
      .update(additionalSequence.join('|'))
      .digest('hex')
      .toLowerCase();

    if (receivedHash === additionalHash) {
      return true;
    }
  }

  return false;
}

/**
 * Global In-Memory Store for Verified PayU Transactions
 * (Works across serverless warm executions and Express server)
 */
declare global {
  // eslint-disable-next-line no-var
  var __payuVerifiedTransactions: Map<string, PayUVerifiedTransaction> | undefined;
}

const verifiedTransactionsMap: Map<string, PayUVerifiedTransaction> =
  globalThis.__payuVerifiedTransactions || new Map<string, PayUVerifiedTransaction>();

if (!globalThis.__payuVerifiedTransactions) {
  globalThis.__payuVerifiedTransactions = verifiedTransactionsMap;
}

export function saveVerifiedTransaction(txn: PayUVerifiedTransaction): void {
  verifiedTransactionsMap.set(txn.txnid, txn);
}

export function getVerifiedTransaction(txnid: string): PayUVerifiedTransaction | undefined {
  return verifiedTransactionsMap.get(txnid);
}
