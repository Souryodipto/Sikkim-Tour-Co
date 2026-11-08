import { test, describe } from 'node:test';
import assert from 'node:assert';
import crypto from 'node:crypto';
import {
  generatePayUHash,
  verifyPayUResponseHash,
  formatPayUAmount,
  getPayUGatewayUrl,
  saveVerifiedTransaction,
  getVerifiedTransaction,
  PayUResponsePayload,
} from './payu';

describe('PayU Integration Utility Tests', () => {
  const testKey = 'test_merchant_key';
  const testSalt = 'test_merchant_salt';

  test('formatPayUAmount formats amount to 2 decimal places', () => {
    assert.strictEqual(formatPayUAmount(5000), '5000.00');
    assert.strictEqual(formatPayUAmount('5000'), '5000.00');
    assert.strictEqual(formatPayUAmount('1234.5'), '1234.50');
    assert.strictEqual(formatPayUAmount('invalid'), '0.00');
  });

  test('getPayUGatewayUrl returns correct URL based on environment', () => {
    assert.strictEqual(getPayUGatewayUrl('test'), 'https://test.payu.in/_payment');
    assert.strictEqual(getPayUGatewayUrl('prod'), 'https://secure.payu.in/_payment');
    assert.strictEqual(getPayUGatewayUrl('production'), 'https://secure.payu.in/_payment');
  });

  test('generatePayUHash produces valid SHA-512 hex matching manual reference', () => {
    const params = {
      key: 'gtKFFx',
      txnid: 'txnid_999',
      amount: '5000.00',
      productinfo: 'Sikkim Tour Advance',
      firstname: 'Tashi',
      email: 'tashi@example.com',
      udf1: 'gangtok-escape',
    };
    const salt = 'eCwWELxi';

    const generatedHash = generatePayUHash(params, salt);

    // Manual hash computation of the exact pipe sequence
    const expectedSequence = [
      'gtKFFx',
      'txnid_999',
      '5000.00',
      'Sikkim Tour Advance',
      'Tashi',
      'tashi@example.com',
      'gangtok-escape',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      'eCwWELxi',
    ].join('|');

    const expectedHash = crypto
      .createHash('sha512')
      .update(expectedSequence)
      .digest('hex')
      .toLowerCase();

    assert.strictEqual(generatedHash, expectedHash);
    assert.strictEqual(generatedHash.length, 128); // SHA-512 produces 128 hex characters
  });

  test('verifyPayUResponseHash correctly verifies genuine PayU success response', () => {
    const salt = 'eCwWELxi';
    const key = 'gtKFFx';
    const txnid = 'txnid_12345';
    const amount = '5000.00';
    const productinfo = 'Sikkim Tour Package';
    const firstname = 'Rohan';
    const email = 'rohan@example.com';
    const status = 'success';
    const udf1 = 'bk-9482';

    // Build the expected response hash sequence
    const revSequence = [
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
      udf1,
      email,
      firstname,
      productinfo,
      amount,
      txnid,
      key,
    ].join('|');

    const genuineHash = crypto
      .createHash('sha512')
      .update(revSequence)
      .digest('hex')
      .toLowerCase();

    const responsePayload: PayUResponsePayload = {
      status,
      txnid,
      amount,
      productinfo,
      firstname,
      email,
      hash: genuineHash,
      key,
      udf1,
      mihpayid: '987654321',
      mode: 'UPI',
    };

    assert.strictEqual(verifyPayUResponseHash(responsePayload, salt), true);
  });

  test('verifyPayUResponseHash rejects tampered amount or invalid hash', () => {
    const salt = 'eCwWELxi';
    const responsePayload: PayUResponsePayload = {
      status: 'success',
      txnid: 'txnid_12345',
      amount: '5000.00',
      productinfo: 'Sikkim Tour Package',
      firstname: 'Rohan',
      email: 'rohan@example.com',
      hash: 'tampered_or_invalid_hash_signature',
      key: 'gtKFFx',
    };

    assert.strictEqual(verifyPayUResponseHash(responsePayload, salt), false);
  });

  test('saveVerifiedTransaction and getVerifiedTransaction persist in memory', () => {
    const sampleTxn = {
      txnid: 'STC-TEST-001',
      status: 'success' as const,
      amount: 5000,
      firstname: 'Rohan Mukherjee',
      email: 'rohan@example.com',
      phone: '+919830123456',
      productinfo: 'Sikkim Tour Booking',
      mihpayid: 'MIH-882109',
      bankRefNum: 'BRN-5544',
      mode: 'UPI',
      paymentGateway: 'PayU' as const,
      verifiedAt: new Date().toISOString(),
    };

    saveVerifiedTransaction(sampleTxn);
    const retrieved = getVerifiedTransaction('STC-TEST-001');

    assert.ok(retrieved);
    assert.strictEqual(retrieved?.txnid, 'STC-TEST-001');
    assert.strictEqual(retrieved?.amount, 5000);
    assert.strictEqual(retrieved?.status, 'success');
  });
});
