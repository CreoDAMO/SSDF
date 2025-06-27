import { router } from './trpc';
import { healthRouter } from './routes/health';
import { authRouter } from './routes/auth';
import { trustUnitsRouter } from './routes/trustUnits';
import { ubiRouter } from './routes/ubi';
import { spiralFlowRouter } from './routes/spiralFlow';
import { systemActivationRouter } from './routes/systemActivation';
import { apiValidationRouter } from './routes/apiValidation';

export const appRouter = router({
  health: healthRouter,
  trustUnits: trustUnitsRouter,
  ubi: ubiRouter,
  auth: authRouter,
  spiralFlow: spiralFlowRouter,
  systemActivation: systemActivationRouter,
  apiValidation: apiValidationRouter,
});

export type AppRouter = typeof appRouter;