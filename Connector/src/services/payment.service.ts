import { CentralBankClient } from '../integrations/centralbank.client';
import { LinkageService } from './linkage.service';
import { AppError } from '../middleware/errorHandler';

export class PaymentService {
  static async processPayment(
    buyerExternalId: string,
    sellerExternalId: string,
    grossAmount: string,
    pin: string,
    description: string,
    externalRefId: string | undefined,
    serviceId: string,
    serviceName: string,
    idempotencyKey: string
  ) {
    // 1. Resolve linkages
    const buyerLink = await LinkageService.getLinkage(buyerExternalId, serviceId);
    const sellerLink = await LinkageService.getLinkage(sellerExternalId, serviceId);

    // 2. Call CentralBank atomic settlement
    const payload = {
      payer_wallet_id: buyerLink.smartbank_wallet_id,
      payee_wallet_id: sellerLink.smartbank_wallet_id,
      gross_amount: grossAmount,
      pin,
      source_app: serviceName,
      description,
      external_ref_id: externalRefId,
    };

    const res = await CentralBankClient.settlePayment(
      payload,
      idempotencyKey,
      buyerLink.smartbank_user_id, // delegated user
      serviceName
    );

    if (res.status === 401 && res.body.error?.code === 'INVALID_PIN') {
      throw new AppError(401, 'INVALID_PIN', res.body.error.message);
    }
    if (res.status !== 200 && res.status !== 201) {
      throw new AppError(res.status, res.body.error?.code || 'PAYMENT_FAILED', res.body.error?.message || 'Payment failed');
    }

    return res.body; // already matches expected spec format
  }
}
