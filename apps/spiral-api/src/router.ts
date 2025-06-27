import { router } from './trpc';
import { healthRouter } from './routes/health';
import { authRouter } from './routes/auth';
import { trustUnitsRouter } from './routes/trustUnits';
import { ubiRouter } from './routes/ubi';
import { spiralFlowRouter } from './routes/spiralFlow';
import { systemActivationRouter } from './routes/systemActivation';

export const appRouter = router({
  health: healthRouter,
  auth: authRouter,
  trustUnits: trustUnitsRouter,
  ubi: ubiRouter,
  spiralFlow: spiralFlowRouter,
  systemActivation: systemActivationRouter,
});

export type AppRouter = typeof appRouter;