
import { inferAsyncReturnType } from '@trpc/server';
import { CreateHTTPContextOptions } from '@trpc/server/adapters/standalone';

export const createContext = (opts: CreateHTTPContextOptions) => {
  const { req, res } = opts;
  
  // Extract auth token from header
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  return {
    req,
    res,
    user: null, // Will be populated after auth verification
    token,
    spiralCoherence: 1.618, // φ (Golden Ratio) coherence
    timestamp: new Date().toISOString(),
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;
