import { PrismaClient } from '@prisma/client';
import { Router } from 'express';

const prisma = new PrismaClient();

export const healthRoutes = Router();

healthRoutes.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

healthRoutes.get('/ready', async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: 'ready' });
  } catch (error) {
    res.status(503).json({ status: 'unavailable', error: String(error) });
  }
});
