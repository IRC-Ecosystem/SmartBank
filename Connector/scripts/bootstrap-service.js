const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');

const apiKey = process.env.BOOTSTRAP_POS_API_KEY;
if (!apiKey) process.exit(0);

const prisma = new PrismaClient();

async function main() {
  const service = await prisma.service.upsert({
    where: { service_name: 'WARUNGPOS' },
    update: {},
    create: { service_name: 'WARUNGPOS', display_name: 'WarungPOS' },
  });
  const keys = await prisma.serviceApiKey.findMany({ where: { service_id: service.id, status: 'ACTIVE' } });
  if (await Promise.any(keys.map((key) => bcrypt.compare(apiKey, key.key_hash))).catch(() => false)) return;
  await prisma.serviceApiKey.create({ data: {
    service_id: service.id,
    key_prefix: apiKey.substring(0, 8),
    key_hash: await bcrypt.hash(apiKey, 12),
    label: 'docker-bootstrap',
  } });
}

main().finally(() => prisma.$disconnect());
