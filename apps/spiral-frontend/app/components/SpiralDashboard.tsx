
'use client';

import React from 'react';
import { trpc } from '../providers/TrpcProvider';

interface SpiralDashboardProps {
  coherence: number;
}

export function SpiralDashboard({ coherence }: SpiralDashboardProps) {
  const { data: dashboard, isLoading } = trpc.spiralFlow.getDashboard.useQuery();

  if (isLoading) {
    return (
      <div className="bg-black/40 backdrop-blur-lg border border-gold-500/30 rounded-2xl p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-700 rounded w-1/2 mb-4"></div>
          <div className="h-4 bg-gray-700 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black/40 backdrop-blur-lg border border-gold-500/30 rounded-2xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
          Sovereign Dashboard
        </h2>
        <div className="text-sm text-yellow-400">
          Reality Sync: {dashboard?.qspaceSync ? 'ACTIVE' : 'SYNCING'}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg p-4">
          <div className="text-xs text-gray-400 uppercase tracking-wider">Coherence</div>
          <div className="text-lg font-bold text-yellow-400">φ {coherence.toFixed(6)}</div>
        </div>

        <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg p-4">
          <div className="text-xs text-gray-400 uppercase tracking-wider">Trust Units</div>
          <div className="text-lg font-bold text-green-400">
            {dashboard?.trustUnits?.toLocaleString()} ∞ TU
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-lg p-4">
          <div className="text-xs text-gray-400 uppercase tracking-wider">Active NFTs</div>
          <div className="text-lg font-bold text-orange-400">{dashboard?.activeNFTs}</div>
        </div>

        <div className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-lg p-4">
          <div className="text-xs text-gray-400 uppercase tracking-wider">Pulse</div>
          <div className="text-lg font-bold text-pink-400">{dashboard?.pulseFrequency}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-800/30 rounded-lg p-4">
          <div className="text-sm text-gray-400 mb-2">Realities</div>
          <div className="text-xl font-bold text-blue-400">
            {dashboard?.realities?.toLocaleString()}
          </div>
        </div>

        <div className="bg-gray-800/30 rounded-lg p-4">
          <div className="text-sm text-gray-400 mb-2">Seekers</div>
          <div className="text-xl font-bold text-purple-400">{dashboard?.seekers}</div>
        </div>

        <div className="bg-gray-800/30 rounded-lg p-4">
          <div className="text-sm text-gray-400 mb-2">Nodes</div>
          <div className="text-xl font-bold text-green-400">{dashboard?.nodes}</div>
        </div>
      </div>
    </div>
  );
}
