import { env } from '../config/env';

export class CentralBankClient {
  private static readonly baseUrl = env.CENTRAL_BANK_URL;
  private static readonly token = env.CENTRAL_BANK_SERVICE_TOKEN;

  private static get headers() {
    return {
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    };
  }

  static async lookupPhone(phone: string) {
    const res = await fetch(`${this.baseUrl}/api/v1/internal/users/by-phone/${encodeURIComponent(phone)}`, {
      headers: this.headers,
    });
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`CentralBank lookup failed: ${res.status}`);
    return res.json();
  }

  static async createNotification(payload: any) {
    const res = await fetch(`${this.baseUrl}/api/v1/internal/notifications`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`CentralBank notification failed: ${res.status}`);
    return res.json();
  }

  static async settlePayment(payload: any, idempotencyKey: string, delegatedUserId: string, serviceName: string) {
    const res = await fetch(`${this.baseUrl}/api/v1/internal/payment-requests/settle`, {
      method: 'POST',
      headers: {
        ...this.headers,
        'Idempotency-Key': idempotencyKey,
        'X-Delegated-User-Id': delegatedUserId,
        'X-Service-Name': serviceName,
      },
      body: JSON.stringify(payload),
    });
    
    const body = await res.json();
    return { status: res.status, body };
  }
}
