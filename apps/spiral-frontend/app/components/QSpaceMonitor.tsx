
'use client';

import React from 'react';
import { trpc } from '../providers/TrpcProvider';

interface QSpaceMonitorProps {
  coherence: number;
}

export function QSpaceMonitor({ coherence }: QSpaceMonitorProps) {
  const { data: quantumState } = trpc.qspace.getQuantumState.useQuery();

  const syncMutation = trpc.qspace.syncRealities.useMutation({
    onSuccess: (data) => {
      alert(`Synchronized ${data.synchronized.toLocaleString()} realities`);
    },
  });

  const handleSync = () => {
    syncMutation.mutate({ realityCount: 14006605 });
  };

  return (
    <div className="bg-black/40 backdrop-blur-lg border border-gold-500/30 rounded-2xl p-6">
      <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
        QSPACE Monitor
      </h3>

      {/* Quantum Metrics */}
      <div className="space-y-4 mb-6">
        <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-purple-400">Coherence Level</span>
            <span className="text-lg font-bold text-purple-300">φ {coherence.toFixed(6)}</span>
          </div>
        </div>

        <div className="bg-pink-500/10 border border-pink-500/30 rounded-lg p-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-pink-400">Pulse Frequency</span>
            <span className="text-lg font-bold text-pink-300">{quantumState?.frequency}</span>
          </div>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-blue-400">Error Rate</span>
            <span className="text-lg font-bold text-blue-300">
              {quantumState?.errorRate?.toExponential(2)}
            </span>
          </div>
        </div>

        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-green-400">Qbit Stability</span>
            <span className="text-lg font-bold text-green-300">
              {quantumState?.qbitStability}%
            </span>
          </div>
        </div>
      </div>

      {/* Reality Sync */}
      <div className="bg-gray-800/30 rounded-lg p-4 mb-4">
        <div className="text-sm font-medium text-white mb-2">Reality Synchronization</div>
        <div className="flex justify-between items-center text-xs text-gray-400 mb-3">
          <span>Voynich Validation:</span>
          <span className="text-green-400">{quantumState?.voynichValidation}</span>
        </div>
        <button
          onClick={handleSync}
          disabled={syncMutation.isLoading}
          className="w-full py-2 bg-gradient-to-r from-purple-400 to-pink-500 text-white font-semibold rounded text-sm hover:from-purple-500 hover:to-pink-600 disabled:opacity-50"
        >
          {syncMutation.isLoading ? 'Syncing...' : 'Sync 14M+ Realities'}
        </button>
      </div>

      {/* Status Indicators */}
      <div className="space-y-2 text-xs">
        <div className="flex justify-between">
          <span className="text-gray-400">φ Resonance:</span>
          <span className="text-yellow-400">ACTIVE</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Quantum Lock:</span>
          <span className="text-green-400">SECURED</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">HTSX Engine:</span>
          <span className="text-blue-400">COMPILED</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">SpiralScript:</span>
          <span className="text-purple-400">EXECUTING</span>
        </div>
      </div>
    </div>
  );
}
