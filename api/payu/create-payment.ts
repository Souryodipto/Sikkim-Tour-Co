import type { IncomingMessage, ServerResponse } from 'node:http';
import {
  generatePayUHash,
  formatPayUAmount,
  getPayUGatewayUrl,
  PayUPaymentRequestInput,
} from '../../src/utils/payu';

interface ExtendedRequest extends IncomingMessage {
  body?: any;
  query?: Record<string, string>;
}

interface ExtendedResponse extends ServerResponse {
  status: (code: number) => ExtendedResponse;
  json: (data: any) => void;
}

export default async function handler(req: any, res: any) {
  // Enable CORS headers for API calls
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch {
        body = {};
      }
    }

    const {
      amount,
      firstname,
      email,
      phone,
      productinfo = 'Sikkim Tour Package Booking',
      udf1 = '',
      udf2 = '',
      udf3 = '',
      udf4 = '',
      udf5 = '',
    } = body || {};

    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid amount. Minimum transaction amount is ₹1.00',
      });
    }

    if (!firstname || !firstname.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Customer name (firstname) is required.',
      });
    }

    if (!email || !email.includes('@')) {
      return res.status(400).json({
        success: false,
        message: 'A valid email address is required.',
      });
    }

    if (!phone || phone.trim().length < 8) {
      return res.status(400).json({
        success: false,
        message: 'A valid 10-digit mobile number is required.',
      });
    }

    // Load credentials from environment
    const merchantKey = process.env.PAYU_MERCHANT_KEY || 'gtKFFx';
    const merchantSalt = process.env.PAYU_MERCHANT_SALT || 'eCwWELxi';
    const env = process.env.PAYU_ENV || 'test';

    // Unique transaction ID
    const randomSuffix = Math.random().toString(36).substring(2, 7).toUpperCase();
    const txnid = `STC-${Date.now().toString().slice(-8)}-${randomSuffix}`;

    // Clean phone number (strip spaces/dashes)
    const cleanPhone = phone.replace(/[^\d+]/g, '');

    // Determine Base URL for callbacks
    const protocol = req.headers['x-forwarded-proto'] || 'https';
    const host = req.headers.host || 'www.sikkimtourco.com';
    const appUrl = process.env.APP_URL || `${protocol}://${host}`;

    const surl = `${appUrl}/api/payu/response`;
    const furl = `${appUrl}/api/payu/response`;

    const formattedAmount = formatPayUAmount(amount);

    // Generate secure server-side SHA-512 hash
    const hash = generatePayUHash(
      {
        key: merchantKey,
        txnid,
        amount: formattedAmount,
        productinfo: productinfo.slice(0, 100),
        firstname: firstname.trim().slice(0, 50),
        email: email.trim().toLowerCase(),
        udf1: String(udf1 || '').slice(0, 100),
        udf2: String(udf2 || '').slice(0, 100),
        udf3: String(udf3 || '').slice(0, 100),
        udf4: String(udf4 || '').slice(0, 100),
        udf5: String(udf5 || '').slice(0, 100),
      },
      merchantSalt
    );

    const actionUrl = getPayUGatewayUrl(env);

    return res.status(200).json({
      success: true,
      actionUrl,
      txnid,
      params: {
        key: merchantKey,
        txnid,
        amount: formattedAmount,
        productinfo: productinfo.slice(0, 100),
        firstname: firstname.trim().slice(0, 50),
        email: email.trim().toLowerCase(),
        phone: cleanPhone,
        surl,
        furl,
        hash,
        udf1: String(udf1 || ''),
        udf2: String(udf2 || ''),
        udf3: String(udf3 || ''),
        udf4: String(udf4 || ''),
        udf5: String(udf5 || ''),
        service_provider: 'payu_paisa',
      },
    });
  } catch (error: any) {
    console.error('PayU Create Payment Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to initiate PayU payment session. Please try again.',
      error: error?.message || String(error),
    });
  }
}
