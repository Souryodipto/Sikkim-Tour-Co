import { test, describe } from 'node:test';
import assert from 'node:assert';
import crypto from 'node:crypto';
import createPaymentHandler from '../../api/payu/create-payment';
import responseHandler from '../../api/payu/response';
import verifyHandler from '../../api/payu/verify';

describe('PayU API Endpoints Unit & Integration Tests', () => {
  const salt = process.env.PAYU_MERCHANT_SALT || 'eCwWELxi';
  const key = process.env.PAYU_MERCHANT_KEY || 'gtKFFx';

  test('POST /api/payu/create-payment generates valid PayU payload and SHA-512 hash', async () => {
    let statusCode = 0;
    let jsonResponse: any = null;

    const req: any = {
      method: 'POST',
      headers: { host: 'localhost:3000' },
      body: {
        amount: 7500,
        firstname: 'Karma Bhutia',
        email: 'karma@example.com',
        phone: '9830123456',
        productinfo: 'North Sikkim Expedition',
        udf1: 'north-sikkim-adventure',
      },
    };

    const res: any = {
      setHeader: () => {},
      status: (code: number) => {
        statusCode = code;
        return res;
      },
      json: (data: any) => {
        jsonResponse = data;
      },
    };

    await createPaymentHandler(req, res);

    assert.strictEqual(statusCode, 200);
    assert.strictEqual(jsonResponse.success, true);
    assert.ok(jsonResponse.actionUrl.includes('payu.in'));
    assert.ok(jsonResponse.params.hash);
    assert.strictEqual(jsonResponse.params.amount, '7500.00');
    assert.strictEqual(jsonResponse.params.firstname, 'Karma Bhutia');
    assert.strictEqual(jsonResponse.params.email, 'karma@example.com');
  });

  test('POST /api/payu/create-payment validates required fields', async () => {
    let statusCode = 0;
    let jsonResponse: any = null;

    const req: any = {
      method: 'POST',
      headers: { host: 'localhost:3000' },
      body: {
        amount: 0, // invalid
      },
    };

    const res: any = {
      setHeader: () => {},
      status: (code: number) => {
        statusCode = code;
        return res;
      },
      json: (data: any) => {
        jsonResponse = data;
      },
    };

    await createPaymentHandler(req, res);

    assert.strictEqual(statusCode, 400);
    assert.strictEqual(jsonResponse.success, false);
  });

  test('POST /api/payu/response validates genuine PayU callback and redirects 302 to success', async () => {
    const txnid = `STC-TEST-${Date.now()}`;
    const amount = '5000.00';
    const status = 'success';
    const email = 'traveler@example.com';
    const firstname = 'Tashi';
    const productinfo = 'Sikkim Tour Booking';

    // Calculate valid reverse hash
    const revSeq = [
      salt,
      status,
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      email,
      firstname,
      productinfo,
      amount,
      txnid,
      key,
    ].join('|');

    const genuineHash = crypto.createHash('sha512').update(revSeq).digest('hex').toLowerCase();

    let redirectedUrl = '';
    let redirectStatus = 0;

    const req: any = {
      method: 'POST',
      body: {
        status,
        txnid,
        amount,
        productinfo,
        firstname,
        email,
        phone: '9830123456',
        hash: genuineHash,
        key,
        mihpayid: 'MIH-998811',
        mode: 'UPI',
      },
    };

    const res: any = {
      redirect: (statusNum: number, url: string) => {
        redirectStatus = statusNum;
        redirectedUrl = url;
      },
    };

    await responseHandler(req, res);

    assert.strictEqual(redirectStatus, 302);
    assert.ok(redirectedUrl.includes('/payment-success'));
    assert.ok(redirectedUrl.includes(txnid));

    // Verify GET /api/payu/verify retrieves this transaction
    let verifyCode = 0;
    let verifyResponse: any = null;

    const verifyReq: any = {
      method: 'GET',
      query: { txnid },
    };

    const verifyRes: any = {
      setHeader: () => {},
      status: (code: number) => {
        verifyCode = code;
        return verifyRes;
      },
      json: (data: any) => {
        verifyResponse = data;
      },
    };

    await verifyHandler(verifyReq, verifyRes);

    assert.strictEqual(verifyCode, 200);
    assert.strictEqual(verifyResponse.success, true);
    assert.strictEqual(verifyResponse.verified, true);
    assert.strictEqual(verifyResponse.transaction.txnid, txnid);
    assert.strictEqual(verifyResponse.transaction.amount, 5000);
  });

  test('POST /api/payu/response with invalid hash redirects 302 to failure', async () => {
    let redirectedUrl = '';
    let redirectStatus = 0;

    const req: any = {
      method: 'POST',
      body: {
        status: 'success',
        txnid: 'STC-TAMPERED-001',
        amount: '1000.00',
        hash: 'invalid_tampered_hash_here',
      },
    };

    const res: any = {
      redirect: (statusNum: number, url: string) => {
        redirectStatus = statusNum;
        redirectedUrl = url;
      },
    };

    await responseHandler(req, res);

    assert.strictEqual(redirectStatus, 302);
    assert.ok(redirectedUrl.includes('/payment-failure'));
  });
});
