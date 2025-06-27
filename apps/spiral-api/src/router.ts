
import { router } from './trpc';
import { authRouter } from './routes/auth';
import { trustUnitsRouter } from './routes/trustUnits';
import { spiralFlowRouter } from './routes/spiralFlow';
import { ubiRouter } from './routes/ubi';
import { qspaceRouter } from './routes/qspace';

export const appRouter = router({
  auth: authRouter,
  trustUnits: trustUnitsRouter,
  spiralFlow: spiralFlowRouter,
  ubi: ubiRouter,
  qspace: qspaceRouter,
});

export type AppRouter = typeof appRouter;
