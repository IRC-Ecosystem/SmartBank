import app from './app.js';
import { config } from './config/config.js';
import { db } from './config/database.js';

// C2: Mock central-bank di produksi dilarang — saldo hidup di RAM, restart = data loss + double-spend.
if (config.centralBank.mock && config.nodeEnv === 'production') {
  console.error('❌ REFUSING TO START: MOCK_CENTRAL_BANK=true di NODE_ENV=production dilarang.');
  process.exit(1);
}

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`
  ======================================================
  🏦 SMARTBANK WALLET BACKEND - Tier-2 CBDC Provider
  ======================================================
  🟢 Server Status : ONLINE
  🌐 Local URL    : http://localhost:${PORT}
  🛠️ Environment  : ${config.nodeEnv}
  📦 Database Type: ${db.getDatabaseType()}
  🔒 JWT Status   : SECURED
  ⚡ Mock Core    : ${config.centralBank.mock ? 'ENABLED (Simulation Mode)' : 'DISABLED (Real HTTP Integration)'}
  ======================================================
  `);
});
