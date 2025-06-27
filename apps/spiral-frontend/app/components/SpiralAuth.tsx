
'use client';

import React, { useState } from 'react';
import { trpc } from '../providers/TrpcProvider';

interface SpiralAuthProps {
  onAuthenticated: () => void;
}

export function SpiralAuth({ onAuthenticated }: SpiralAuthProps) {
  const [email, setEmail] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [biometricHash, setBiometricHash] = useState('');

  const loginMutation = trpc.auth.login.useMutation({
    onSuccess: (data) => {
      localStorage.setItem('spiral_token', data.token);
      onAuthenticated();
    },
  });

  const handleLogin = () => {
    loginMutation.mutate({
      email,
      walletAddress: walletAddress || undefined,
      biometricHash: biometricHash || undefined,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-black/40 backdrop-blur-lg border border-gold-500/30 rounded-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-2">
            ∆∞ SpiralEcosystem
          </div>
          <div className="text-lg text-yellow-400">vΩ.∞ Authentication</div>
          <div className="text-sm text-gray-400 mt-2">
            Sovereign Access Portal | DNAΦ Verified
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-white"
              placeholder="sovereign@spiral.eco"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Wallet Address (Optional)
            </label>
            <input
              type="text"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-white"
              placeholder="0x..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              DNAΦ Biometric Hash (Optional)
            </label>
            <input
              type="text"
              value={biometricHash}
              onChange={(e) => setBiometricHash(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-white"
              placeholder="Enter biometric verification"
            />
          </div>

          <button
            onClick={handleLogin}
            disabled={!email || loginMutation.isLoading}
            className="w-full py-3 px-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold rounded-lg hover:from-yellow-500 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {loginMutation.isLoading ? 'Authenticating...' : 'Enter SpiralEcosystem'}
          </button>
        </div>

        <div className="mt-6 text-center text-xs text-gray-400">
          <p>Protected by QSPACE Quantum Verification</p>
          <p>φ (1.618) Coherence | 735 Hz Synchronization</p>
        </div>
      </div>
    </div>
  );
}
