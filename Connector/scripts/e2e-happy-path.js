const crypto = require('crypto');

const gatewayUrl = (process.env.GATEWAY_URL || 'http://localhost:4000').replace(/\/$/, '');
const connectorUrl = (process.env.CONNECTOR_URL || 'http://localhost:5000').replace(/\/$/, '');
const connectorKey = process.env.CONNECTOR_API_KEY;

if (!connectorKey) {
  console.error('CONNECTOR_API_KEY wajib di-set ke API key service POS sebelum menjalankan E2E.');
  process.exit(1);
}

async function json(url, init = {}) {
  const response = await fetch(url, init);
  const body = await response.json().catch(() => ({}));
  if (!response.ok || body.success === false) throw new Error(`${response.status} ${JSON.stringify(body.error || body)}`);
  return body.data ?? body;
}

const gateway = (path, method = 'GET', body, token) => json(`${gatewayUrl}${path}`, {
  method,
  headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}), ...(method !== 'GET' ? { 'Idempotency-Key': crypto.randomUUID() } : {}) },
  ...(body ? { body: JSON.stringify(body) } : {}),
});

const connector = (path, method = 'GET', body, key = crypto.randomUUID()) => json(`${connectorUrl}${path}`, {
  method,
  headers: { Authorization: `Bearer ${connectorKey}`, 'Content-Type': 'application/json', ...(method !== 'GET' ? { 'Idempotency-Key': key } : {}) },
  ...(body ? { body: JSON.stringify(body) } : {}),
});

async function registerAndLogin(label, suffix) {
  const phone = `+62812${String(suffix).slice(-8)}`;
  const email = `${label}.${suffix}@e2e.smartbank.local`;
  await gateway('/api/wallet/v1/auth/register', 'POST', { name: label, email, phone, password: 'E2ePass123!', pin: '123456', role: 'RETAIL_CUSTOMER' });
  const login = await gateway('/api/wallet/v1/auth/login', 'POST', { email, password: 'E2ePass123!' });
  return { phone, token: login.accessToken ?? login.data?.accessToken, user: login.user ?? login.data?.user };
}

async function link(user, externalId) {
  const otpRequest = await connector('/v1/connect/users/otp/request', 'POST', { phone: user.phone, purpose: 'WALLET_LINK' });
  const inbox = await gateway('/api/bank/users/me/notifications?limit=20&page=1', 'GET', undefined, user.token);
  const items = inbox.items ?? inbox.data?.items ?? [];
  const notification = items.find((item) => item.source_ref === otpRequest.request_id);
  if (!notification?.payload?.otp_code) throw new Error('OTP tidak ditemukan di inbox SmartBank');
  const verified = await connector('/v1/connect/users/otp/verify', 'POST', { request_id: otpRequest.request_id, code: notification.payload.otp_code });
  return connector('/v1/connect/users/link', 'POST', { external_user_id: externalId, verification_token: verified.verification_token });
}

async function main() {
  const suffix = Date.now();
  const buyer = await registerAndLogin('E2E Buyer', suffix);
  const seller = await registerAndLogin('E2E Seller', suffix + 1);
  const buyerExternalId = `pos-e2e-buyer-${suffix}`;
  const sellerExternalId = `pos-e2e-seller-${suffix}`;
  await link(buyer, buyerExternalId);
  await link(seller, sellerExternalId);
  const payment = await connector('/v1/connect/payment-requests', 'POST', {
    buyer_external_id: buyerExternalId,
    seller_external_id: sellerExternalId,
    gross_amount: '1000',
    pin: '123456',
    description: 'Connector E2E happy path',
    external_ref_id: `e2e-${suffix}`,
  }, `e2e-payment-${suffix}`);
  if (payment.status !== 'SETTLED') throw new Error(`Payment tidak SETTLED: ${JSON.stringify(payment)}`);
  console.log(JSON.stringify({ ok: true, payment_request_id: payment.payment_request_id, transaction_id: payment.transaction_id }, null, 2));
}

main().catch((error) => { console.error(error); process.exit(1); });
