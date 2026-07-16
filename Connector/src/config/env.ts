import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
  PORT: z.string().default('5000'),
  NODE_ENV: z.string().default('development'),
  DATABASE_URL: z.string().min(1),
  CENTRAL_BANK_URL: z.string().min(1),
  CENTRAL_BANK_SERVICE_TOKEN: z.string().min(1), // for internal endpoints
  JWT_SECRET: z.string().min(1), // if needed for signing (actually service token is enough for internal)
  RATE_LIMIT_DEFAULT_RPS: z.string().default('50'),
  ADMIN_API_KEY: z.string().min(1),
});

export const env = envSchema.parse(process.env);
