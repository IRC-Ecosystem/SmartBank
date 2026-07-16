import { Router } from 'express';
import { authMiddleware } from '../middleware/auth';
import { PaymentService } from '../services/payment.service';

const router = Router();
router.use(authMiddleware);

router.post('/', async (req, res, next) => {
  try {
    const { buyer_external_id, seller_external_id, gross_amount, pin, description, external_ref_id } = req.body;
    const service = (req as any).service;
    const idempotencyKey = req.headers['x-idempotency-key'] as string;
    
    if (!idempotencyKey) {
      throw new Error('X-Idempotency-Key header is required');
    }

    const result = await PaymentService.processPayment(
      buyer_external_id,
      seller_external_id,
      gross_amount,
      pin,
      description,
      external_ref_id,
      service.id,
      service.service_name,
      idempotencyKey
    );

    res.json({ success: true, data: result.data || result });
  } catch (error) {
    next(error);
  }
});

export const paymentsRoutes = router;
