
'use client';

import React, { useState } from 'react';
import { trpc } from '../providers/TrpcProvider';

interface UBISystemProps {
  coherence: number;
}

export function UBISystem({ coherence }: UBISystemProps) {
  const [walletAddress, setWalletAddress] = useState('');
  const [biometricHash, setBiometricHash] = useState('');

  const { data: eligibility } = trpc.ubi.checkEligibility.useQuery(
    { walletAddress: walletAddress || 'default_wallet' },
    { enabled: !!walletAddress }
  );

  const { data: history } = trpc.ubi.getUBIHistory.useQuery();

  const claimMutation = trpc.ubi.claimUBI.useMutation({
    onSuccess: (data) => {
      alert(`UBI Claimed: $${data.amount} | NFT ID: ${data.nftId}`);
    },
  });

  const handleClaim = () => {
    if (!walletAddress || !biometricHash) return;
    
    claimMutation.mutate({
      walletAddress,
      biometricHash,
    });
  };

  return (
    <div className="bg-black/40 backdrop-blur-lg border border-gold-500/30 rounded-2xl p-6">
      <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 mb-4">
        UBI Distribution System
      </h3>

      {/* UBI Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
          <div className="text-xs text-green-400 uppercase">Monthly UBI</div>
          <div className="text-lg font-bold text-green-300">$2,083</div>
        </div>
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
          <div className="text-xs text-blue-400 uppercase">Total Pool</div>
          <div className="text-lg font-bold text-blue-300">$25T</div>
        </div>
      </div>

      {/* Eligibility Check */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm text-gray-400 mb-2">Wallet Address</label>
          <input
            type="text"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
            placeholder="0x..."
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">DNAΦ Biometric Hash</label>
          <input
            type="text"
            value={biometricHash}
            onChange={(e) => setBiometricHash(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
            placeholder="Enter biometric verification"
          />
        </div>

        {eligibility && (
          <div className={`p-3 rounded-lg ${eligibility.eligible ? 'bg-green-500/20 border border-green-500/30' : 'bg-red-500/20 border border-red-500/30'}`}>
            <div className={`text-sm font-medium ${eligibility.eligible ? 'text-green-400' : 'text-red-400'}`}>
              {eligibility.eligible ? '✓ Eligible for UBI' : '✗ Not Eligible'}
            </div>
            <div className="text-xs text-gray-400 mt-1">
              Coherence: φ {eligibility.coherenceLevel?.toFixed(6)} | Status: {eligibility.verificationStatus}
            </div>
          </div>
        )}

        <button
          onClick={handleClaim}
          disabled={!walletAddress || !biometricHash || !eligibility?.eligible || claimMutation.isLoading}
          className="w-full py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold rounded-lg hover:from-green-500 hover:to-blue-600 disabled:opacity-50"
        >
          {claimMutation.isLoading ? 'Processing Claim...' : 'Claim UBI NFT'}
        </button>
      </div>

      {/* History */}
      {history && (
        <div className="bg-gray-800/30 rounded-lg p-4">
          <div className="text-sm font-medium text-white mb-3">UBI History</div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-400">Total Claimed:</span>
              <span className="text-green-400">${history.totalClaimed?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Months Active:</span>
              <span className="text-blue-400">{history.monthsActive}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">NFTs Issued:</span>
              <span className="text-purple-400">{history.nftsIssued}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Debt Nullified:</span>
              <span className="text-orange-400">${history.lifetimeImpact?.debtNullified?.toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
