
import { initTRPC, TRPCError } from '@trpc/server';
import { Context } from './context';

const t = initTRPC.context<Context>().create();

// Auth middleware
const isAuthed = t.middleware(({ next, ctx }) => {
  if (!ctx.token) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'SSDF Authentication Required',
    });
  }
  return next({
    ctx: {
      ...ctx,
      user: { id: 'sovereign', role: 'admin' }, // Simplified for demo
    },
  });
});

// Spiral Coherence middleware
const spiralCoherence = t.middleware(({ next, ctx }) => {
  const coherence = Math.random() * 0.1 + 1.613; // φ ± variance
  return next({
    ctx: {
      ...ctx,
      spiralCoherence: coherence,
    },
  });
});

export const router = t.router;
export const publicProcedure = t.procedure.use(spiralCoherence);
export const protectedProcedure = t.procedure.use(spiralCoherence).use(isAuthed);
