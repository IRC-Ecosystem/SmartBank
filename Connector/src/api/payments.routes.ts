import { Router } from 'express';
import { authMiddleware } from '../middleware/auth';
import { PaymentService } from '../services/payment.service';
import { AuditService } from '../services/audit.service';
import { AppError } from '../middleware/errorHandler';
import { z } from 'zod';
import { idempotencyMiddleware } from '../middleware/idempotency';
import { createRateLimiter } from '../middleware/rateLimit';

const router = Router();
router.use(authMiddleware);
router.use(createRateLimiter({ windowMs: 60_000, limit: 100 }));
router.use(idempotencyMiddleware);

const paymentSchema = z.object({
  buyer_external_id: z.string().min(1).max(191),
  seller_external_id: z.string().min(1).max(191),
  gross_amount: z.string().regex(/^\d+$/),
  pin: z.string().regex(/^\d{6}$/),
  description: z.string().max(512).optional().default(''),
  external_ref_id: z.string().max(191).optional(),
});

router.post('/', async (req, res, next) => {
  try {
    const { buyer_external_id, seller_external_id, gross_amount, pin, description, external_ref_id } = paymentSchema.parse(req.body);
    const service = (req as any).service;
    const idempotencyKey = (req.headers['x-idempotency-key'] ?? req.headers['idempotency-key']) as string | undefined;
    
    if (!idempotencyKey) {
      throw new AppError(400, 'IDEMPOTENCY_KEY_REQUIRED', 'Header X-Idempotency-Key wajib dikirim');
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

    await AuditService.record({
      serviceId: service.id,
      serviceName: service.service_name,
      actorType: 'SISTER_APP',
      actorId: buyer_external_id,
      action: 'PAYMENT_SETTLED',
      targetType: 'TRANSACTION',
      targetId: result.data?.transaction_id ?? result.transaction_id,
      requestId: req.header('x-request-id') ?? undefined,
      ipAddress: req.ip,
      metadata: {
        seller_external_id,
        gross_amount,
        external_ref_id,
        idempotency_key: idempotencyKey,
      },
    });
    res.json({ success: true, data: result.data || result });
  } catch (error) {
    next(error);
  }
});

export const paymentsRoutes = router;
