import { getVerifiedTransaction } from '../../src/utils/payu';

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const { txnid } = req.query || {};

  if (!txnid || typeof txnid !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'Transaction ID (txnid) is required.',
    });
  }

  const txn = getVerifiedTransaction(txnid);

  if (!txn) {
    // If not found in memory (e.g. fresh lambda instance or simulated in dev)
    // We can return a helpful status
    return res.status(404).json({
      success: false,
      verified: false,
      message: 'Transaction record not found or pending gateway confirmation.',
    });
  }

  return res.status(200).json({
    success: true,
    verified: txn.status === 'success',
    transaction: txn,
  });
}
