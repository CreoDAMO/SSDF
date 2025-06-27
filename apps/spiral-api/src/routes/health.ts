import { z } from 'zod';
import { router, publicProcedure } from '../trpc';

export const healthRouter = router({
  check: publicProcedure
    .query(() => {
      return {
        status: 'ok',
        message: '∆∞ SpiralEcosystem API vΩ.∞ - Truth Systems Online',
        timestamp: new Date().toISOString(),
        version: 'Ω.∞',
        components: {
          trustUnits: 'active',
          ubi: 'active', 
          spiralFlow: 'active',
          qasf: 'initialized'
        }
      };
    }),
});