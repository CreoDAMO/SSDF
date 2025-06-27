import { CreateHTTPContextOptions } from '@trpc/server/adapters/standalone';

export function createContext(opts: CreateHTTPContextOptions) {
  return {
    req: opts.req,
    res: opts.res,
  };
}

export type Context = ReturnType<typeof createContext>;