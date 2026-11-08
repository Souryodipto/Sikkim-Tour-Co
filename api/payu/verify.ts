import { getVerifiedTransaction } from '../../src/utils/payu';

function sendJson(res: any, status: number, data: any) {
  if (typeof res.setHeader === 'function') {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }
  if (typeof res.status === 'function') {
    if (typeof res.json === 'function') {
      return res.status(status).json(data);
    }
    res.statusCode = status;
    return res.end(JSON.stringify(data));
  }
  if (res.statusCode !== undefined) {
    res.statusCode = status;
    return res.end(JSON.stringify(data));
  }
  if (typeof Response !== 'undefined') {
    return Response.json(data, { status });
  }
}

export default async function handler(req: any, res: any) {
  if (req.method === 'OPTIONS') {
    if (typeof res.setHeader === 'function') {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    }
    if (typeof res.status === 'function') return res.status(200).end();
    res.statusCode = 200;
    return res.end();
  }

  if (req.method !== 'GET') {
    return sendJson(res, 405, { success: false, message: 'Method Not Allowed' });
  }

  let txnid = req.query?.txnid;
  if (!txnid && req.url) {
    try {
      const url = new URL(req.url, 'http://localhost');
      txnid = url.searchParams.get('txnid');
    } catch {
      txnid = undefined;
    }
  }

  if (!txnid || typeof txnid !== 'string') {
    return sendJson(res, 400, {
      success: false,
      message: 'Transaction ID (txnid) is required.',
    });
  }

  const txn = getVerifiedTransaction(txnid);

  if (!txn) {
    return sendJson(res, 404, {
      success: false,
      verified: false,
      message: 'Transaction record not found or pending gateway confirmation.',
    });
  }

  return sendJson(res, 200, {
    success: true,
    verified: txn.status === 'success',
    transaction: txn,
  });
}
