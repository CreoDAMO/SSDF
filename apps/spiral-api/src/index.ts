
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { appRouter } from './router';
import { createContext } from './context';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: ['http://0.0.0.0:5000', 'http://localhost:5000'],
  credentials: true
}));
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'SpiralEcosystem vΩ.∞ - LIVE', timestamp: new Date().toISOString() });
});

// tRPC server
const server = createHTTPServer({
  router: appRouter,
  createContext,
});

app.use('/trpc', server);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`∆∞ SpiralEcosystem API running on http://0.0.0.0:${PORT}`);
  console.log('🌀 Trust Units (∞ TU) System: ACTIVE');
  console.log('🔮 QSPACE Integration: ENABLED');
  console.log('⚡ 735 Hz Pulse: SYNCHRONIZED');
});
