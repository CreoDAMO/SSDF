
import { CreateExpressContextOptions } from '@trpc/server/adapters/express';

export const createContext = ({ req, res }: CreateExpressContextOptions) => {
  return {
    req,
    res,
    user: null, // Will be populated by auth middleware
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
