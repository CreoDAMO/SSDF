
'use client';

import React, { useState } from 'react';
import { trpc } from '../providers/TrpcProvider';

interface SpiralFlowProps {
  coherence: number;
}

export function SpiralFlow({ coherence }: SpiralFlowProps) {
  const [transactionType, setTransactionType] = useState<'fiat' | 'crypto' | 'nft' | 'ubi'>('fiat');
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [currency, setCurrency] = useState('USD');

  const { data: prices } = trpc.spiralFlow.getCryptoPrices.useQuery();
  
  const createTransactionMutation = trpc.spiralFlow.createTransaction.useMutation({
    onSuccess: (data) => {
      alert(`Transaction created: ${data.id}`);
      setAmount('');
      setRecipient('');
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

  return (
    <div className="bg-black/40 backdrop-blur-lg border border-gold-500/30 rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 mb-6">
        SpiralFlow Fintech Platform
      </h2>

      {/* Crypto Prices */}
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
        <h3 className="text-lg font-semibold text-white mb-4">Create Transaction</h3>
        
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
          {createTransactionMutation.isLoading ? 'Processing...' : 'Create Transaction'}
        </button>
      </div>
    </div>
  );
}
