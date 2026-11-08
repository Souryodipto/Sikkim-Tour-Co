import crypto from 'node:crypto';

// Reliable request body parser supporting Express, Vercel Serverless, and Node Streams
async function parseBody(req: any): Promise<any> {
  if (req.body) {
    if (typeof req.body === 'string') {
      try {
        return JSON.parse(req.body);
      } catch {
        return {};
      }
    }
    return req.body;
  }
  if (typeof req.json === 'function') {
    try {
      return await req.json();
    } catch {
      return {};
    }
  }
  return new Promise((resolve) => {
    let data = '';
    req.on?.('data', (chunk: any) => {
      data += chunk;
    });
    req.on?.('end', () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch {
        resolve({});
      }
    });
    req.on?.('error', () => resolve({}));
    setTimeout(() => resolve({}), 800);
  });
}

function sendJson(res: any, status: number, data: any) {
  if (typeof res.setHeader === 'function') {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
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

function formatPayUAmount(amount: string | number): string {
  const num = typeof amount === 'number' ? amount : parseFloat(amount);
  if (isNaN(num)) return '0.00';
  return num.toFixed(2);
}

function getPayUGatewayUrl(env?: string): string {
  const currentEnv = env || process.env.PAYU_ENV || 'prod';
  const isProd = currentEnv.toLowerCase() === 'prod' || currentEnv.toLowerCase() === 'production';
  return isProd ? 'https://secure.payu.in/_payment' : 'https://test.payu.in/_payment';
}

function generatePayUHash(
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
  },
  salt: string
): string {
  const formattedAmount = formatPayUAmount(params.amount);
  const sequence = [
    String(params.key || '').trim(),
    String(params.txnid || '').trim(),
    formattedAmount,
    String(params.productinfo || '').trim(),
    String(params.firstname || '').trim(),
    String(params.email || '').trim(),
    params.udf1 || '',
    params.udf2 || '',
    params.udf3 || '',
    params.udf4 || '',
    params.udf5 || '',
    '', '', '', '', '', // udf6 to udf10
    String(salt || '').trim(),
  ];
  return crypto.createHash('sha512').update(sequence.join('|')).digest('hex').toLowerCase();
}

export default async function handler(req: any, res: any) {
  if (req.method === 'OPTIONS') {
    if (typeof res.setHeader === 'function') {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    }
    if (typeof res.status === 'function') return res.status(200).end();
    res.statusCode = 200;
    return res.end();
  }

  if (req.method !== 'POST') {
    return sendJson(res, 405, { success: false, message: 'Method Not Allowed' });
  }

  try {
    const body = await parseBody(req);

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
      origin = '',
    } = body || {};

    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      return sendJson(res, 400, {
        success: false,
        message: 'Invalid amount. Minimum transaction amount is ₹1.00',
      });
    }

    if (!firstname || !String(firstname).trim()) {
      return sendJson(res, 400, {
        success: false,
        message: 'Customer name (firstname) is required.',
      });
    }

    if (!email || !String(email).includes('@')) {
      return sendJson(res, 400, {
        success: false,
        message: 'A valid email address is required.',
      });
    }

    const cleanPhone = String(phone || '').replace(/[^\d+]/g, '');
    if (cleanPhone.length < 8) {
      return sendJson(res, 400, {
        success: false,
        message: 'A valid 10-digit mobile number is required.',
      });
    }

    // Credentials with production defaults
    const merchantKey = process.env.PAYU_MERCHANT_KEY || 'zYBc8H';
    const merchantSalt = process.env.PAYU_MERCHANT_SALT || 'xAKaHrB63e2jAOuhaFgFijMhRAZbb45W';
    const env = process.env.PAYU_ENV || 'prod';

    // Unique transaction ID
    const randomSuffix = Math.random().toString(36).substring(2, 7).toUpperCase();
    const txnid = `STC-${Date.now().toString().slice(-8)}-${randomSuffix}`;

    // Determine Base URL for callbacks:
    // Strictly prioritize the real public domain to prevent redirecting to localhost after PayU completes
    const clientOrigin = String(origin || '').trim().replace(/\/+$/, '');
    const headers = req.headers || {};
    const protocol = headers['x-forwarded-proto'] || 'https';
    const host = String(headers.host || '').trim();

    let appUrl = 'https://www.sikkimtourco.com';

    if (clientOrigin && !clientOrigin.includes('localhost') && !clientOrigin.includes('127.0.0.1')) {
      appUrl = clientOrigin;
    } else if (host && !host.includes('localhost') && !host.includes('127.0.0.1')) {
      appUrl = `${protocol}://${host}`;
    } else if (process.env.APP_URL && !process.env.APP_URL.includes('localhost') && !process.env.APP_URL.includes('127.0.0.1')) {
      appUrl = process.env.APP_URL.replace(/\/+$/, '');
    }

    const surl = `${appUrl}/api/payu/response`;
    const furl = `${appUrl}/api/payu/response`;

    const formattedAmount = formatPayUAmount(amount);

    // Generate secure server-side SHA-512 hash
    const hash = generatePayUHash(
      {
        key: merchantKey,
        txnid,
        amount: formattedAmount,
        productinfo: String(productinfo).slice(0, 100),
        firstname: String(firstname).trim().slice(0, 50),
        email: String(email).trim().toLowerCase(),
        udf1: String(udf1 || '').slice(0, 100),
        udf2: String(udf2 || '').slice(0, 100),
        udf3: String(udf3 || '').slice(0, 100),
        udf4: String(udf4 || '').slice(0, 100),
        udf5: String(udf5 || '').slice(0, 100),
      },
      merchantSalt
    );

    const actionUrl = getPayUGatewayUrl(env);

    return sendJson(res, 200, {
      success: true,
      actionUrl,
      txnid,
      params: {
        key: merchantKey,
        txnid,
        amount: formattedAmount,
        productinfo: String(productinfo).slice(0, 100),
        firstname: String(firstname).trim().slice(0, 50),
        email: String(email).trim().toLowerCase(),
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
    return sendJson(res, 500, {
      success: false,
      message: 'Failed to initiate PayU payment session. Please try again.',
      error: error?.message || String(error),
    });
  }
}
