'use client';

import React, { useState } from 'react';
import { trpc } from '../providers/TrpcProvider';

interface SpiralFlowProps {
  coherence: number;
}

export function SpiralFlow({ coherence }: SpiralFlowProps) {
  const [activeTab, setActiveTab] = useState<'wallet' | 'nft' | 'ubi' | 'compliance'>('wallet');
  const [transactionType, setTransactionType] = useState<'fiat' | 'crypto' | 'nft' | 'ubi'>('fiat');
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [nftMetadata, setNftMetadata] = useState({ name: '', description: '', type: 'UBI' });

  const { data: prices } = trpc.spiralFlow.getCryptoPrices.useQuery();
  const { data: userData } = trpc.spiralFlow.getDashboard.useQuery();

  const createTransactionMutation = trpc.spiralFlow.createTransaction.useMutation({
    onSuccess: (data) => {
      alert(`Transaction created: ${data.id}`);
      setAmount('');
      setRecipient('');
    },
  });

  const mintNFTMutation = trpc.spiralFlow.mintNFT?.useMutation({
    onSuccess: (data) => {
      alert(`NFT minted: ${data.tokenId}`);
      setNftMetadata({ name: '', description: '', type: 'UBI' });
    },
  });

  const handleTransaction = () => {
    if (!amount || !recipient) return;

    createTransactionMutation.mutate({
      type: transactionType,
      amount: parseFloat(amount),
      recipient,
      currency,
    });
  };

  const handleMintNFT = () => {
    if (!nftMetadata.name || !nftMetadata.description) return;

    mintNFTMutation?.mutate({
      metadata: nftMetadata,
      recipient: recipient || 'self',
    });
  };

  return (
    <div className="bg-black/40 backdrop-blur-lg border border-gold-500/30 rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 mb-6">
        SpiralFlow Fintech NFT Platform
      </h2>

      {/* Navigation Tabs */}
      <div className="flex space-x-4 mb-6">
        {['wallet', 'nft', 'ubi', 'compliance'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === tab
                ? 'bg-gradient-to-r from-green-400 to-blue-500 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Wallet Tab */}
      {activeTab === 'wallet' && (
        <>
          {/* Crypto Prices Dashboard */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3">
              <div className="text-xs text-orange-400 uppercase">Bitcoin</div>
              <div className="text-lg font-bold text-orange-300">${prices?.BTC?.toLocaleString()}</div>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
              <div className="text-xs text-blue-400 uppercase">Ethereum</div>
              <div className="text-lg font-bold text-blue-300">${prices?.ETH?.toLocaleString()}</div>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
              <div className="text-xs text-green-400 uppercase">USDC</div>
              <div className="text-lg font-bold text-green-300">${prices?.USDC}</div>
            </div>
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
              <div className="text-xs text-yellow-400 uppercase">Trust Units</div>
              <div className="text-lg font-bold text-yellow-300">φ {prices?.TU?.toFixed(6)}</div>
            </div>
          </div>

          {/* Transaction Form */}
          <div className="bg-gray-800/30 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Send/Receive Funds</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Transaction Type</label>
                <select
                  value={transactionType}
                  onChange={(e) => setTransactionType(e.target.value as any)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
                >
                  <option value="fiat">Fiat Transfer</option>
                  <option value="crypto">Crypto Transfer</option>
                  <option value="nft">NFT Transaction</option>
                  <option value="ubi">UBI Distribution</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Currency</label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
                >
                  <option value="USD">USD</option>
                  <option value="BTC">Bitcoin</option>
                  <option value="ETH">Ethereum</option>
                  <option value="USDC">USDC</option>
                  <option value="TU">Trust Units</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Amount</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Recipient</label>
                <input
                  type="text"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
                  placeholder="Address or email"
                />
              </div>
            </div>

            <button
              onClick={handleTransaction}
              disabled={!amount || !recipient || createTransactionMutation.isLoading}
              className="w-full py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold rounded-lg hover:from-green-500 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {createTransactionMutation.isLoading ? 'Processing...' : 'Send Transaction'}
            </button>
          </div>
        </>
      )}

      {/* NFT Tab */}
      {activeTab === 'nft' && (
        <div className="bg-gray-800/30 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">NFT Marketplace</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Mint NFT */}
            <div className="border border-gray-600 rounded-lg p-4">
              <h4 className="text-md font-medium text-white mb-3">Mint NFT</h4>

              <div className="space-y-3">
                <select
                  value={nftMetadata.type}
                  onChange={(e) => setNftMetadata(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
                >
                  <option value="UBI">UBI NFT</option>
                  <option value="SevenPillars">Seven Pillars NFT</option>
                  <option value="Fintech">Fintech NFT</option>
                </select>

                <input
                  type="text"
                  value={nftMetadata.name}
                  onChange={(e) => setNftMetadata(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
                  placeholder="NFT Name"
                />

                <textarea
                  value={nftMetadata.description}
                  onChange={(e) => setNftMetadata(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
                  placeholder="NFT Description"
                  rows={3}
                />

                <button
                  onClick={handleMintNFT}
                  disabled={!nftMetadata.name || !nftMetadata.description || mintNFTMutation?.isLoading}
                  className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
                >
                  {mintNFTMutation?.isLoading ? 'Minting...' : 'Mint NFT'}
                </button>
              </div>
            </div>

            {/* NFT Portfolio */}
            <div className="border border-gray-600 rounded-lg p-4">
              <h4 className="text-md font-medium text-white mb-3">Your NFTs</h4>
              <div className="text-gray-400 text-sm">
                Active NFTs: {userData?.activeNFTs || 0}
              </div>
              <div className="text-gray-400 text-sm">
                Trust Units: {userData?.trustUnits?.toLocaleString() || 0}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* UBI Tab */}
      {activeTab === 'ubi' && (
        <div className="bg-gray-800/30 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Universal Basic Income</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <div className="text-sm text-green-400">UBI Eligible</div>
              <div className="text-xl font-bold text-green-300">
                {userData?.ubiEligible ? 'Yes' : 'No'}
              </div>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <div className="text-sm text-blue-400">Monthly UBI Amount</div>
              <div className="text-xl font-bold text-blue-300">$416.67</div>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">UBI Distribution</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Monthly UBI:</span>
              <span className="text-green-400">$416.67</span>
            </div>
            <div className="flex justify-between">
              <span>Next Payment:</span>
              <span className="text-blue-400">7 days</span>
            </div>
            <button className="w-full bg-green-600 hover:bg-green-700 px-4 py-2 rounded">
              Claim UBI NFT
            </button>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Fintech NFT Platform</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Seven Pillars NFTs:</span>
              <span className="text-purple-400">7/7</span>
            </div>
            <div className="flex justify-between">
              <span>Portfolio Value:</span>
              <span className="text-gold-400">∞ 1,000,000 TU</span>
            </div>
            <div className="flex justify-between">
              <span>Debt Nullified:</span>
              <span className="text-red-400">$324T</span>
            </div>
            <button className="w-full bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded">
              Trade NFTs
            </button>
            <button className="w-full bg-gold-600 hover:bg-gold-700 px-4 py-2 rounded">
              Generate Fractal Art
            </button>
          </div>
        </div>
        </div>
      )}

      {/* Compliance Tab */}
      {activeTab === 'compliance' && (
        <div className="bg-gray-800/30 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Regulatory Compliance</h3>

          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded">
              <span className="text-white">KYC Verification</span>
              <span className="text-green-400">✓ Verified</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded">
              <span className="text-white">AML Screening</span>
              <span className="text-green-400">✓ Passed</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded">
              <span className="text-white">OFAC Check</span>
              <span className="text-green-400">✓ Clear</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded">
              <span className="text-white">Audit Logs</span>
              <span className="text-blue-400">📋 View</span>
            </div>
          </div>
        </div>
      )}

      {/* System Status */}
      <div className="mt-6 text-xs text-gray-500">
        Pulse: {userData?.pulseFrequency} | Coherence: {coherence.toFixed(3)} | 
        QSpace: {userData?.qspaceSync ? '🟢 Synced' : '🔴 Offline'}
      </div>
    </div>
  );
}