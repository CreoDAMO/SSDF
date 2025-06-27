
'use client';

import React, { useState } from 'react';
import { trpc } from '../providers/TrpcProvider';
import { TrustUnits } from './TrustUnits';
import { QSpaceMonitor } from './QSpaceMonitor';
import { SystemHealth } from './SystemHealth';

interface PrivateGateProps {
  userRole: 'sovereign' | 'heir_node' | 'member';
}

export function PrivateGate({ userRole }: PrivateGateProps) {
  const [activeTab, setActiveTab] = useState('dashboard');

  const { data: systemStatus } = trpc.health.status.useQuery();
  const { data: trustUnits } = trpc.trustUnits.getBalance.useQuery();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-indigo-900">
      {/* Private Gate Header */}
      <div className="bg-black/50 backdrop-blur-lg border-b border-yellow-400/30 p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
              ∆∞ Private Gate
            </h1>
            <p className="text-yellow-400">Sovereign Spiral Development Framework Admin Center</p>
            <p className="text-sm text-gray-400">φ (1.618) Coherence | ∞ TU Authority | QSPACE Secured</p>
          </div>
          <div className="text-right">
            <div className="text-lg text-yellow-400">Role: {userRole.toUpperCase()}</div>
            <div className="text-sm text-gray-300">∞ TU Balance: {trustUnits?.balance || '∞'}</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-black/30 backdrop-blur-lg p-4">
        <div className="flex space-x-4">
          {[
            { id: 'dashboard', label: '🎛️ Control Dashboard' },
            { id: 'trust-units', label: '∞ Trust Units' },
            { id: 'public-gate', label: '🌍 Public Gate Control' },
            { id: 'heir-nodes', label: '👑 HeirNode Management' },
            { id: 'qspace', label: '⚛️ QSPACE Monitor' },
            { id: 'debt-analytics', label: '📊 Global Debt Analytics' },
            { id: 'ubi-control', label: '💰 UBI Distribution' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold'
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6">
        {activeTab === 'dashboard' && <PrivateDashboard />}
        {activeTab === 'trust-units' && <TrustUnits />}
        {activeTab === 'public-gate' && <PublicGateControl />}
        {activeTab === 'heir-nodes' && <HeirNodeManagement />}
        {activeTab === 'qspace' && <QSpaceMonitor />}
        {activeTab === 'debt-analytics' && <DebtAnalytics />}
        {activeTab === 'ubi-control' && <UBIControl />}
      </div>
    </div>
  );
}

function PrivateDashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-black/40 backdrop-blur-lg border border-yellow-400/30 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-yellow-400 mb-4">System Status</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-300">QSPACE:</span>
            <span className="text-green-400">OPERATIONAL</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">Public Gate:</span>
            <span className="text-green-400">ONLINE</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">Trust Units:</span>
            <span className="text-yellow-400">∞ ACTIVE</span>
          </div>
        </div>
      </div>

      <div className="bg-black/40 backdrop-blur-lg border border-yellow-400/30 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-yellow-400 mb-4">Global Metrics</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-300">Global Debt:</span>
            <span className="text-red-400">$324T</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">UBI Recipients:</span>
            <span className="text-green-400">1.2M</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">NFT Holders:</span>
            <span className="text-blue-400">847K</span>
          </div>
        </div>
      </div>

      <div className="bg-black/40 backdrop-blur-lg border border-yellow-400/30 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-yellow-400 mb-4">Quantum Operations</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-300">TPS:</span>
            <span className="text-cyan-400">5.2e40</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">Bandwidth:</span>
            <span className="text-cyan-400">201 Tbps</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">Pulse Rate:</span>
            <span className="text-purple-400">735 Hz</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function PublicGateControl() {
  const [publicGateEnabled, setPublicGateEnabled] = useState(true);
  
  return (
    <div className="space-y-6">
      <div className="bg-black/40 backdrop-blur-lg border border-yellow-400/30 rounded-2xl p-6">
        <h3 className="text-2xl font-bold text-yellow-400 mb-6">Public Gate Administration</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-orange-400">Access Control</h4>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Public Gate Status:</span>
              <button
                onClick={() => setPublicGateEnabled(!publicGateEnabled)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  publicGateEnabled
                    ? 'bg-green-500 text-black'
                    : 'bg-red-500 text-white'
                }`}
              >
                {publicGateEnabled ? 'ENABLED' : 'DISABLED'}
              </button>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-300">Active Users:</span>
                <span className="text-cyan-400">2,847,392</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Daily Transactions:</span>
                <span className="text-green-400">1.2M</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-orange-400">Feature Toggles</h4>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input type="checkbox" defaultChecked className="text-yellow-400" />
                <span className="text-gray-300">UBI NFT Distribution</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" defaultChecked className="text-yellow-400" />
                <span className="text-gray-300">Seven Pillars NFT Trading</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" defaultChecked className="text-yellow-400" />
                <span className="text-gray-300">SpiralFlow Interface</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" defaultChecked className="text-yellow-400" />
                <span className="text-gray-300">Economic Data APIs</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeirNodeManagement() {
  return (
    <div className="bg-black/40 backdrop-blur-lg border border-yellow-400/30 rounded-2xl p-6">
      <h3 className="text-2xl font-bold text-yellow-400 mb-6">HeirNode Governance</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-lg font-semibold text-orange-400 mb-4">Active HeirNodes</h4>
          <div className="space-y-3">
            {[
              { name: 'JahMeliyah', role: 'Riemann Trust', status: 'Active', coherence: '∞' },
              { name: 'Makeda-Kiburion', role: 'Perelman Trust', status: 'Active', coherence: '∞' },
              { name: 'Future Heir', role: 'Pending', status: 'Reserved', coherence: 'TBD' }
            ].map((heir, index) => (
              <div key={index} className="bg-gray-800/50 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-semibold text-white">{heir.name}</div>
                    <div className="text-sm text-gray-400">{heir.role}</div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-medium ${
                      heir.status === 'Active' ? 'text-green-400' : 'text-yellow-400'
                    }`}>
                      {heir.status}
                    </div>
                    <div className="text-xs text-gray-400">φ {heir.coherence}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-lg font-semibold text-orange-400 mb-4">Trust Pool Allocation</h4>
          <div className="space-y-3">
            {[
              { trust: 'Riemann Trust', allocation: '70%', heir: 'JahMeliyah' },
              { trust: 'Perelman Trust', allocation: '100%', heir: 'Makeda-Kiburion' },
              { trust: 'Reserve Trust', allocation: '20%', heir: 'Collective' },
              { trust: 'GiftDAO', allocation: '10%', heir: 'Community' }
            ].map((pool, index) => (
              <div key={index} className="bg-gray-800/50 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-semibold text-white">{pool.trust}</div>
                    <div className="text-sm text-gray-400">{pool.heir}</div>
                  </div>
                  <div className="text-yellow-400 font-bold">{pool.allocation}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function DebtAnalytics() {
  return (
    <div className="bg-black/40 backdrop-blur-lg border border-yellow-400/30 rounded-2xl p-6">
      <h3 className="text-2xl font-bold text-yellow-400 mb-6">Global Debt Matrix Analysis</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-red-900/20 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-red-400 mb-2">Total Global Debt</h4>
          <div className="text-3xl font-bold text-red-300">$324.07T</div>
          <div className="text-sm text-gray-400">+3.2% YoY Growth</div>
        </div>
        
        <div className="bg-yellow-900/20 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-yellow-400 mb-2">Debt-to-GDP Ratio</h4>
          <div className="text-3xl font-bold text-yellow-300">356%</div>
          <div className="text-sm text-gray-400">Global Average</div>
        </div>
        
        <div className="bg-green-900/20 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-green-400 mb-2">UBI Coverage</h4>
          <div className="text-3xl font-bold text-green-300">1.2M</div>
          <div className="text-sm text-gray-400">People Freed</div>
        </div>
      </div>
    </div>
  );
}

function UBIControl() {
  return (
    <div className="bg-black/40 backdrop-blur-lg border border-yellow-400/30 rounded-2xl p-6">
      <h3 className="text-2xl font-bold text-yellow-400 mb-6">Universal Basic Income Control Center</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-lg font-semibold text-orange-400 mb-4">Distribution Settings</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Monthly UBI Amount (USD)
              </label>
              <input
                type="number"
                defaultValue={416.67}
                className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-white"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Target Recipients
              </label>
              <input
                type="number"
                defaultValue={60000000}
                className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-white"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Funding Source
              </label>
              <select className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-white">
                <option>∞ Trust Units</option>
                <option>$SPIRAL Token</option>
                <option>Mixed Portfolio</option>
              </select>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="text-lg font-semibold text-orange-400 mb-4">Real-Time Metrics</h4>
          <div className="space-y-3">
            <div className="bg-gray-800/50 rounded-lg p-4">
              <div className="flex justify-between">
                <span className="text-gray-300">Active Recipients:</span>
                <span className="text-cyan-400">1,247,892</span>
              </div>
            </div>
            
            <div className="bg-gray-800/50 rounded-lg p-4">
              <div className="flex justify-between">
                <span className="text-gray-300">Monthly Distribution:</span>
                <span className="text-green-400">$520.2M</span>
              </div>
            </div>
            
            <div className="bg-gray-800/50 rounded-lg p-4">
              <div className="flex justify-between">
                <span className="text-gray-300">Pending Verifications:</span>
                <span className="text-yellow-400">23,847</span>
              </div>
            </div>
            
            <button className="w-full py-3 bg-gradient-to-r from-green-400 to-blue-500 text-black font-semibold rounded-lg hover:from-green-500 hover:to-blue-600 transition-all">
              Execute Monthly Distribution
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
