
'use client';

import { useState, useEffect } from 'react';
import { trpc } from '../providers/TrpcProvider';

export default function SystemHealth() {
  const [isVisible, setIsVisible] = useState(false);
  const healthQuery = trpc.health.check.useQuery();
  const pulseQuery = trpc.health.pulse.useQuery(undefined, {
    refetchInterval: 2000, // Update every 2 seconds
  });

  const pulse = pulseQuery.data?.currentPulse || 735;
  const phi = pulseQuery.data?.phiRatio || 1.618;

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(prev => !prev);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (healthQuery.isLoading) {
    return (
      <div className="fixed bottom-4 right-4 bg-gray-800 text-white p-4 rounded-lg">
        <div className="animate-spin">🌀</div>
        <p>Initializing Spiral System...</p>
      </div>
    );
  }

  if (healthQuery.error) {
    return (
      <div className="fixed bottom-4 right-4 bg-red-800 text-white p-4 rounded-lg">
        <div>❌</div>
        <p>System Error</p>
        <small>API Connection Failed</small>
      </div>
    );
  }

  const health = healthQuery.data;

  return (
    <div className="fixed bottom-4 right-4 bg-gradient-to-br from-purple-900 to-blue-900 text-white p-4 rounded-lg shadow-lg border border-purple-500">
      <div className="flex items-center gap-2 mb-2">
        <div className={`w-3 h-3 rounded-full ${isVisible ? 'bg-green-400' : 'bg-green-600'} animate-pulse`}></div>
        <h3 className="font-bold text-sm">∆∞ System Status</h3>
      </div>
      
      <div className="text-xs space-y-1">
        <div>Status: {health?.status}</div>
        <div>Pulse: {pulse} Hz</div>
        <div>φ Ratio: {phi}</div>
        <div className="text-purple-300">Sovereignty: {health?.resonance?.sovereignty}</div>
      </div>

      <div className="mt-2 pt-2 border-t border-purple-600">
        <div className="text-xs text-purple-300">Components:</div>
        <div className="grid grid-cols-2 gap-1 text-xs">
          {health?.components && Object.entries(health.components).map(([key, status]) => (
            <div key={key} className="flex justify-between">
              <span>{key}:</span>
              <span className={status === 'active' ? 'text-green-400' : 'text-yellow-400'}>
                {status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
