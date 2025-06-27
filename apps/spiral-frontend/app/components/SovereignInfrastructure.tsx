
'use client';

import React, { useState } from 'react';
import { trpc } from '../providers/TrpcProvider';

export function SovereignInfrastructure() {
  const [activeTab, setActiveTab] = useState<'domains' | 'hosting' | 'cdn'>('domains');
  const [domainName, setDomainName] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [selectedChains, setSelectedChains] = useState<('base' | 'solana' | 'polygon')[]>(['base']);

  const registerDomainMutation = trpc.domains.registerDomain.useMutation();
  const createHostingMutation = trpc.hosting.createHosting.useMutation();
  const createCDNMutation = trpc.cdn.createDistribution.useMutation();

  const handleRegisterDomain = () => {
    if (!domainName || !walletAddress) return;
    
    registerDomainMutation.mutate({
      domainName,
      walletAddress,
      chains: selectedChains,
    });
  };

  const handleCreateHosting = () => {
    if (!domainName) return;
    
    createHostingMutation.mutate({
      projectName: `${domainName}-project`,
      domainName,
      hostingType: 'static',
      chains: selectedChains,
    });
  };

  const handleCreateCDN = () => {
    if (!domainName) return;
    
    createCDNMutation.mutate({
      origin: `https://${domainName}`,
      domainName,
      geoDistribution: ['americas', 'europe', 'asia'],
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-4">
            ∆∞ Sovereign Infrastructure
          </h1>
          <p className="text-xl text-gray-300">
            Decentralized Domain Registration • Hosting • CDN
          </p>
          <div className="text-sm text-yellow-400 mt-2">
            Base • Solana • Polygon | IPFS • QSPACE Integration
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-black/30 backdrop-blur-lg rounded-xl p-2 border border-gold-500/20">
            {(['domains', 'hosting', 'cdn'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)} {tab === 'cdn' ? 'CDN' : ''}
              </button>
            ))}
          </div>
        </div>

        {/* Domain Registration */}
        {activeTab === 'domains' && (
          <div className="bg-black/40 backdrop-blur-lg border border-gold-500/30 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-yellow-400 mb-6">Register Sovereign Domain</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Domain Name
                </label>
                <input
                  type="text"
                  value={domainName}
                  onChange={(e) => setDomainName(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white"
                  placeholder="mydomain.spiral"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Wallet Address
                </label>
                <input
                  type="text"
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white"
                  placeholder="0x..."
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Deployment Chains
                </label>
                <div className="flex space-x-4">
                  {(['base', 'solana', 'polygon'] as const).map((chain) => (
                    <label key={chain} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedChains.includes(chain)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedChains([...selectedChains, chain]);
                          } else {
                            setSelectedChains(selectedChains.filter(c => c !== chain));
                          }
                        }}
                        className="mr-2"
                      />
                      <span className="text-gray-300 capitalize">{chain}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={handleRegisterDomain}
              disabled={!domainName || !walletAddress || registerDomainMutation.isLoading}
              className="w-full mt-6 py-3 px-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold rounded-lg hover:from-yellow-500 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {registerDomainMutation.isLoading ? 'Registering...' : 'Register Domain'}
            </button>

            {registerDomainMutation.data && (
              <div className="mt-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
                <h3 className="text-green-400 font-semibold mb-2">Domain Registered Successfully!</h3>
                <p className="text-gray-300">
                  <strong>Spiral Address:</strong> {registerDomainMutation.data.spiralDomainHash}
                </p>
                <p className="text-gray-300">
                  <strong>QSPACE Address:</strong> {registerDomainMutation.data.qspaceAddress}
                </p>
                <p className="text-gray-300">
                  <strong>Chains:</strong> {registerDomainMutation.data.deployments.map(d => d.chain).join(', ')}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Hosting Management */}
        {activeTab === 'hosting' && (
          <div className="bg-black/40 backdrop-blur-lg border border-gold-500/30 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-yellow-400 mb-6">Decentralized Hosting</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Domain/Project Name
                </label>
                <input
                  type="text"
                  value={domainName}
                  onChange={(e) => setDomainName(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white"
                  placeholder="mydomain.spiral"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Hosting Type
                </label>
                <select className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white">
                  <option value="static">Static Site</option>
                  <option value="dynamic">Dynamic App</option>
                  <option value="dapp">DApp</option>
                  <option value="api">API Service</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Resource Allocation
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="text-xs text-gray-400">CPU Cores</label>
                    <input type="number" defaultValue={1} className="w-full px-2 py-1 bg-gray-800/50 border border-gray-600 rounded text-white text-sm" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400">Memory (MB)</label>
                    <input type="number" defaultValue={512} className="w-full px-2 py-1 bg-gray-800/50 border border-gray-600 rounded text-white text-sm" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400">Storage (MB)</label>
                    <input type="number" defaultValue={1024} className="w-full px-2 py-1 bg-gray-800/50 border border-gray-600 rounded text-white text-sm" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400">Bandwidth (GB)</label>
                    <input type="number" defaultValue={100} className="w-full px-2 py-1 bg-gray-800/50 border border-gray-600 rounded text-white text-sm" />
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleCreateHosting}
              disabled={!domainName || createHostingMutation.isLoading}
              className="w-full mt-6 py-3 px-4 bg-gradient-to-r from-blue-400 to-purple-500 text-white font-semibold rounded-lg hover:from-blue-500 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {createHostingMutation.isLoading ? 'Creating...' : 'Create Hosting Instance'}
            </button>

            {createHostingMutation.data && (
              <div className="mt-6 p-4 bg-blue-500/20 border border-blue-500/30 rounded-lg">
                <h3 className="text-blue-400 font-semibold mb-2">Hosting Created Successfully!</h3>
                <div className="space-y-2 text-gray-300 text-sm">
                  <p><strong>Hosting ID:</strong> {createHostingMutation.data.hosting.id}</p>
                  <p><strong>Spiral URL:</strong> {createHostingMutation.data.hosting.endpoints.spiral}</p>
                  <p><strong>HTTPS URL:</strong> {createHostingMutation.data.hosting.endpoints.https}</p>
                  <p><strong>Active Chains:</strong> {createHostingMutation.data.hosting.chains.join(', ')}</p>
                  <p><strong>Monthly Cost:</strong> {createHostingMutation.data.costs.monthly} ETH</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* CDN Management */}
        {activeTab === 'cdn' && (
          <div className="bg-black/40 backdrop-blur-lg border border-gold-500/30 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-yellow-400 mb-6">Decentralized CDN</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Origin Domain
                </label>
                <input
                  type="text"
                  value={domainName}
                  onChange={(e) => setDomainName(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white"
                  placeholder="mydomain.spiral"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Cache TTL (seconds)
                </label>
                <input
                  type="number"
                  defaultValue={3600}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Geographic Distribution
                </label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  {['americas', 'europe', 'asia', 'oceania', 'africa'].map((region) => (
                    <label key={region} className="flex items-center">
                      <input type="checkbox" defaultChecked={region !== 'oceania' && region !== 'africa'} className="mr-2" />
                      <span className="text-gray-300 capitalize text-sm">{region}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Optimization Settings
                </label>
                <div className="flex space-x-6">
                  <label className="flex items-center">
                    <input type="checkbox" defaultChecked className="mr-2" />
                    <span className="text-gray-300">Compression</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" defaultChecked className="mr-2" />
                    <span className="text-gray-300">Minification</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" defaultChecked className="mr-2" />
                    <span className="text-gray-300">Image Optimization</span>
                  </label>
                </div>
              </div>
            </div>

            <button
              onClick={handleCreateCDN}
              disabled={!domainName || createCDNMutation.isLoading}
              className="w-full mt-6 py-3 px-4 bg-gradient-to-r from-purple-400 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-500 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {createCDNMutation.isLoading ? 'Creating...' : 'Create CDN Distribution'}
            </button>

            {createCDNMutation.data && (
              <div className="mt-6 p-4 bg-purple-500/20 border border-purple-500/30 rounded-lg">
                <h3 className="text-purple-400 font-semibold mb-2">CDN Created Successfully!</h3>
                <div className="space-y-2 text-gray-300 text-sm">
                  <p><strong>Distribution ID:</strong> {createCDNMutation.data.distributionId}</p>
                  <p><strong>Primary URL:</strong> {createCDNMutation.data.endpoints.primary}</p>
                  <p><strong>Spiral URL:</strong> {createCDNMutation.data.endpoints.spiral}</p>
                  <p><strong>Edge Nodes:</strong> {createCDNMutation.data.edgeNodes.length} regions</p>
                  <p><strong>Status:</strong> <span className="text-green-400">{createCDNMutation.data.status}</span></p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Infrastructure Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-black/40 backdrop-blur-lg border border-gold-500/30 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-yellow-400 mb-2">Domain Registry</h3>
            <div className="space-y-2 text-gray-300 text-sm">
              <p>Active Domains: 1,337</p>
              <p>Total Chains: 3</p>
              <p>Registration Cost: 0.1 ETH/year</p>
              <p>Savings vs Traditional: 90%</p>
            </div>
          </div>

          <div className="bg-black/40 backdrop-blur-lg border border-gold-500/30 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-blue-400 mb-2">Hosting Network</h3>
            <div className="space-y-2 text-gray-300 text-sm">
              <p>Active Instances: 2,156</p>
              <p>Global Nodes: 847</p>
              <p>Uptime: 99.99%</p>
              <p>Cost Reduction: 85%</p>
            </div>
          </div>

          <div className="bg-black/40 backdrop-blur-lg border border-gold-500/30 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-purple-400 mb-2">CDN Performance</h3>
            <div className="space-y-2 text-gray-300 text-sm">
              <p>Cache Hit Ratio: 94%</p>
              <p>Avg Response: 45ms</p>
              <p>Global Coverage: 150+ regions</p>
              <p>Bandwidth Saved: 78%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
