
import { z } from 'zod';
import { router, publicProcedure } from '../trpc';

export const authRouter = router({
  login: publicProcedure
    .input(z.object({
      email: z.string().email(),
      biometricHash: z.string().optional(),
      walletAddress: z.string().optional(),
      gateType: z.enum(['public', 'private']).default('public'),
    }))
    .mutation(async ({ input, ctx }) => {
      // Determine user role based on email and gate type
      let role = 'member';
      let gateAccess = ['public'];
      
      // Sovereign access (Private Gate admin)
      if (input.email.includes('sovereign') || input.email.includes('jacque') || input.email.includes('iyonel')) {
        role = 'sovereign';
        gateAccess = ['public', 'private'];
      }
      // HeirNode access
      else if (input.email.includes('jahmeliyah') || input.email.includes('makeda')) {
        role = 'heir_node';
        gateAccess = ['public', 'private'];
      }
      // Private Gate access check
      else if (input.gateType === 'private') {
        return {
          success: false,
          error: 'INSUFFICIENT_PRIVILEGES',
          message: 'Private Gate access requires Sovereign or HeirNode authorization'
        };
      }
      
      const token = `SPIRAL_TOKEN_${Date.now()}_${Math.random().toString(36).substr(2, 16)}`;
      
      return {
        success: true,
        token,
        user: {
          id: `${role}_${Date.now()}`,
          email: input.email,
          role,
          gateAccess,
          coherence: ctx.spiralCoherence,
          walletAddress: input.walletAddress,
          biometricVerified: !!input.biometricHash,
        },
        coherence: ctx.spiralCoherence,
        timestamp: ctx.timestamp,
      };
    }),

  verifyBiometric: publicProcedure
    .input(z.object({
      biometricHash: z.string(),
      walletAddress: z.string(),
    }))
    .mutation(async ({ input, ctx }) => {
      // DNAΦ biometric verification simulation
      const verified = input.biometricHash.length > 32;
      
      return {
        verified,
        coherenceLevel: ctx.spiralCoherence,
        dnaPhiSignature: `DNAΦ_${Date.now()}`,
        quantumLock: verified,
        timestamp: ctx.timestamp,
      };
    }),
});
