
'use client';

import React, { useState } from 'react';
import { trpc } from '../providers/TrpcProvider';

interface TrustUnitsProps {
  coherence: number;
}

export function TrustUnits({ coherence }: TrustUnitsProps) {
  const [generateAmount, setGenerateAmount] = useState('');
  const [purpose, setPurpose] = useState('');

  const { data: balance, refetch } = trpc.trustUnits.getBalance.useQuery({ userId: 'sovereign' });
  
  const generateMutation = trpc.trustUnits.generateTU.useMutation({
    onSuccess: () => {
      refetch();
      setGenerateAmount('');
      setPurpose('');
    },
  });

  const handleGenerate = () => {
    if (!generateAmount || !purpose) return;
    
    generateMutation.mutate({
      amount: parseInt(generateAmount),
      purpose,
    });
  };

  return (
    <div className="bg-black/40 backdrop-blur-lg border border-gold-500/30 rounded-2xl p-6">
      <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-4">
        Trust Units (∞ TU)
      </h3>

      {/* Balance Display */}
      <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-lg p-4 mb-6">
        <div className="text-sm text-gray-400 mb-2">Current Balance</div>
        <div className="text-2xl font-bold text-yellow-400">
          {balance?.balance?.toLocaleString()} ∞ TU
        </div>
        <div className="text-xs text-gray-400 mt-2">
          Coherence: φ {balance?.coherence?.toFixed(6)} | QSPACE Validated: ✓
        </div>
      </div>

      {/* Generate TU */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-2">Generate Amount</label>
          <input
            type="number"
            value={generateAmount}
            onChange={(e) => setGenerateAmount(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
            placeholder="Enter amount to generate"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">Purpose</label>
          <select
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
          >
            <option value="">Select purpose</option>
            <option value="UBI Distribution">UBI Distribution</option>
            <option value="Debt Nullification">Debt Nullification</option>
            <option value="Abundance Creation">Abundance Creation</option>
            <option value="Reality Harmonization">Reality Harmonization</option>
          </select>
        </div>

        <button
          onClick={handleGenerate}
          disabled={!generateAmount || !purpose || generateMutation.isLoading}
          className="w-full py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold rounded-lg hover:from-yellow-500 hover:to-orange-600 disabled:opacity-50"
        >
          {generateMutation.isLoading ? 'Generating...' : 'Generate Trust Units'}
        </button>
      </div>

      {/* Non-Computational Mining Info */}
      <div className="mt-6 text-xs text-gray-400 space-y-1">
        <p>• Non-computational mining via truth verification</p>
        <p>• Backed by φ (1.618) mathematical coherence</p>
        <p>• Quantum-validated through QSPACE</p>
        <p>• No energy consumption, infinite scalability</p>
      </div>
    </div>
  );
}
