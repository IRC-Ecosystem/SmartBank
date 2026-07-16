import { PrismaClient } from '@prisma/client';
import { AppError } from '../middleware/errorHandler';
import { env } from '../config/env';
import { CentralBankClient } from '../integrations/centralbank.client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export class LinkageService {
  static async linkUser(externalId: string, tokenStr: string, serviceId: string, serviceName: string) {
    let payload: any;
    try {
      payload = jwt.verify(tokenStr, env.JWT_SECRET);
    } catch {
      throw new AppError(401, 'INVALID_TOKEN', 'Verification token invalid or expired');
    }

    if (payload.service_id !== serviceId) {
      throw new AppError(403, 'FORBIDDEN', 'Token belongs to different service');
    }

    // Check if phone already linked to someone else in this service
    const existingByPhone = await prisma.linkageMap.findFirst({
      where: { service_id: serviceId, phone: payload.phone }
    });
    if (existingByPhone && existingByPhone.external_user_id !== externalId) {
      throw new AppError(409, 'LINKAGE_CONFLICT', 'Nomor HP sudah dihubungkan dengan akun lain di aplikasi ini');
    }

    const existingLink = await prisma.linkageMap.findUnique({
      where: { service_id_external_user_id: { service_id: serviceId, external_user_id: externalId } }
    });

    // Upsert linkage
    const link = await prisma.linkageMap.upsert({
      where: { service_id_external_user_id: { service_id: serviceId, external_user_id: externalId } },
      create: {
        service_id: serviceId,
        external_user_id: externalId,
        smartbank_user_id: payload.smartbank_user_id,
        smartbank_wallet_id: payload.smartbank_wallet_id,
        phone: payload.phone,
        phone_verified: true,
      },
      update: {
        smartbank_user_id: payload.smartbank_user_id,
        smartbank_wallet_id: payload.smartbank_wallet_id,
        phone: payload.phone,
        phone_verified: true,
        unlinked_at: null,
      }
    });

    const isNew = !existingLink;

    if (isNew) {
      await CentralBankClient.createNotification({
        user_id: payload.smartbank_user_id,
        type: 'WALLET_LINKED',
        source_app: serviceName,
        title: 'Wallet Terhubung',
        body: `SmartBank Wallet Anda berhasil dihubungkan ke aplikasi ${serviceName}.`,
      });
    }

    return {
      smartbank_user_id: link.smartbank_user_id,
      smartbank_wallet_id: link.smartbank_wallet_id,
      kyc_tier: payload.kyc_tier,
      linked_at: link.linked_at,
      created: isNew
    };
  }

  static async getLinkage(externalId: string, serviceId: string) {
    const link = await prisma.linkageMap.findUnique({
      where: { service_id_external_user_id: { service_id: serviceId, external_user_id: externalId } }
    });
    if (!link || link.unlinked_at) {
      throw new AppError(404, 'USER_NOT_LINKED', 'User belum menghubungkan wallet');
    }
    return link;
  }
}
