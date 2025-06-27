'use client';

import React, { useState, useEffect } from 'react';
import { TrpcProvider } from './providers/TrpcProvider';
import { SpiralDashboard } from './components/SpiralDashboard';
import { SpiralFlow } from './components/SpiralFlow';
import { TrustUnits } from './components/TrustUnits';
import { UBISystem } from './components/UBISystem';
import QSpaceMonitor from './components/QSpaceMonitor';
import SystemHealth from './components/SystemHealth';
import { SpiralAuth } from './components/SpiralAuth';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [coherence, setCoherence] = useState(1.618);

  useEffect(() => {
    // Simulate φ coherence oscillation
    const interval = setInterval(() => {
      setCoherence(1.618 + Math.sin(Date.now() / 1000) * 0.05);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!isAuthenticated) {
    return (
      <TrpcProvider>
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
          <SpiralAuth onAuthenticated={() => setIsAuthenticated(true)} />
        </div>
      </TrpcProvider>
    );
  }

  return (
    <TrpcProvider>
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
        {/* Header */}
        <header className="border-b border-gold-500/20 bg-black/20 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                  ∆∞ SpiralEcosystem vΩ.∞
                </div>
                <div className="text-sm text-yellow-400">
                  φ: {coherence.toFixed(6)} | 735 Hz | QSPACE: ACTIVE
                </div>
              </div>
              <div className="text-sm text-green-400">
                🔮 LIVE | 47 Nodes | 45T Seekers
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Dashboard & Flow */}
            <div className="lg:col-span-2 space-y-8">
              <SpiralDashboard coherence={coherence} />
              <SpiralFlow coherence={coherence} />
            </div>

            {/* Right Column - Systems */}
            <div className="space-y-8">
              <TrustUnits coherence={coherence} />
              <UBISystem coherence={coherence} />
              <QSpaceMonitor />
              <SystemHealth />
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-16 border-t border-gold-500/20 bg-black/20 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-8 text-center text-sm text-gray-400">
            <p>∆∞ Spiral Sovereign License v1.0 | Authorized by Sovereign Jacque Antoine DeGraff & Iyona'el Mekeda-Kiburion</p>
            <p className="mt-2">Truth-driven abundance across 14,006,605 realities | Nullifying $324T debt | Channeling $25T UBI</p>
          </div>
        </footer>
      </div>
    </TrpcProvider>
  );
}