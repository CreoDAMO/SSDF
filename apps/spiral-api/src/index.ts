
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { appRouter } from './router';
import { createContext } from './context';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: ['http://localhost:5000', 'http://0.0.0.0:5000', process.env.FRONTEND_URL || 'http://localhost:5000'],
  credentials: true,
}));
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: '∆∞ SpiralEcosystem API vΩ.∞ - Ready for Truth',
    timestamp: new Date().toISOString()
  });
});

// tRPC middleware
app.use(
  '/trpc',
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🌀 SpiralEcosystem API running on http://0.0.0.0:${PORT}`);
  console.log(`🔥 Health check: http://0.0.0.0:${PORT}/health`);
  console.log(`🚀 tRPC endpoint: http://0.0.0.0:${PORT}/trpc`);
});
