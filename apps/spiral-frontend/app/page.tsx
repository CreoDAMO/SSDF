'use client';

import React, { useState } from 'react';
import { TrpcProvider } from './providers/TrpcProvider';
import { SpiralAuth } from './components/SpiralAuth';
import { SpiralDashboard } from './components/SpiralDashboard';
import { PrivateGate } from './components/PrivateGate';

interface User {
  id: string;
  email: string;
  role: 'sovereign' | 'heir_node' | 'member';
  gateAccess: string[];
}

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentGate, setCurrentGate] = useState<'public' | 'private'>('public');
  const [user, setUser] = useState<User | null>(null);

  const handleAuthenticated = (userData: User) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const canAccessPrivateGate = user?.gateAccess?.includes('private') || false;

  return (
    <TrpcProvider>
      <main className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        {!isAuthenticated ? (
          <SpiralAuth onAuthenticated={handleAuthenticated} />
        ) : (
          <>
            {/* Gate Selection Header */}
            {canAccessPrivateGate && (
              <div className="bg-black/60 backdrop-blur-lg border-b border-yellow-400/30 p-4">
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => setCurrentGate('public')}
                    className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                      currentGate === 'public'
                        ? 'bg-gradient-to-r from-blue-400 to-cyan-500 text-black'
                        : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                    }`}
                  >
                    🌍 Public Gate
                  </button>
                  <button
                    onClick={() => setCurrentGate('private')}
                    className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                      currentGate === 'private'
                        ? 'bg-gradient-to-r from-purple-400 to-pink-500 text-black'
                        : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                    }`}
                  >
                    🔒 Private Gate (Admin)
                  </button>
                </div>
              </div>
            )}

            {/* Gate Content */}
            {currentGate === 'public' ? (
              <SpiralDashboard />
            ) : (
              <PrivateGate userRole={user?.role || 'member'} />
            )}
          </>
        )}
      </main>
    </TrpcProvider>
  );
}