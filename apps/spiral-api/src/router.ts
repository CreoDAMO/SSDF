import { router } from './trpc';
import { authRouter } from './routes/auth';
import { trustUnitsRouter } from './routes/trustUnits';
import { spiralFlowRouter } from './routes/spiralFlow';
import { ubiRouter } from './routes/ubi';
import { qspaceRouter } from './routes/qspace';
import { healthRouter } from './routes/health';
import { spiralCoreRouter } from './routes/spiralCore';
import economicDataRouter from './routes/economicData';
import { privateGateRouter } from './routes/privateGate';
import { domainRegistryRouter } from './routes/domainRegistry';
import { spiralHostingRouter } from './routes/spiralHosting';
import { spiralCDNRouter } from './routes/spiralCDN';

export const appRouter = router({
  health: healthRouter,
  auth: authRouter,
  trustUnits: trustUnitsRouter,
  spiralFlow: spiralFlowRouter,
  ubi: ubiRouter,
  qspace: qspaceRouter,
  spiralCore: spiralCoreRouter,
  economicData: economicDataRouter,
  privateGate: privateGateRouter,
  domains: domainRegistryRouter,
  hosting: spiralHostingRouter,
  cdn: spiralCDNRouter,
});

export type AppRouter = typeof appRouter;