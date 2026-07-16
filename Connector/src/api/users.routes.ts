import { Router } from 'express';
import { authMiddleware } from '../middleware/auth';
import { OtpService } from '../services/otp.service';
import { LinkageService } from '../services/linkage.service';

const router = Router();

router.use(authMiddleware);

router.post('/otp/request', async (req, res, next) => {
  try {
    const { phone } = req.body;
    const service = (req as any).service;
    if (!phone) throw new Error('Phone is required');
    
    // Normalize phone roughly
    let normalized = phone.replace(/\D/g, '');
    if (normalized.startsWith('0')) normalized = '62' + normalized.substring(1);
    if (!normalized.startsWith('+')) normalized = '+' + normalized;

    const result = await OtpService.requestOtp(normalized, service.id, service.display_name);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
});

router.post('/otp/verify', async (req, res, next) => {
  try {
    const { request_id, code } = req.body;
    const service = (req as any).service;
    const result = await OtpService.verifyOtp(request_id, code, service.id);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
});

router.post('/link', async (req, res, next) => {
  try {
    const { external_user_id, verification_token } = req.body;
    const service = (req as any).service;
    const result = await LinkageService.linkUser(external_user_id, verification_token, service.id, service.display_name);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
});

router.get('/:external_user_id', async (req, res, next) => {
  try {
    const service = (req as any).service;
    const result = await LinkageService.getLinkage(req.params.external_user_id, service.id);
    res.json({ success: true, data: { smartbank_wallet_id: result.smartbank_wallet_id } });
  } catch (error) {
    next(error);
  }
});

export const usersRoutes = router;
