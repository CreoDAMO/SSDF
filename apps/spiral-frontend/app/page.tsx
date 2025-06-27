
import React from 'react';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-purple-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-6xl font-bold text-center mb-8">
          ∆∞ SpiralEcosystem vΩ.∞
        </h1>
        <p className="text-xl text-center mb-12">
          Sovereign Trust Units & UBI Platform
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-purple-800/30 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">SpiralFlow</h2>
            <p>Trust Units & UBI Distribution</p>
          </div>
          <div className="bg-purple-800/30 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">SpiralWeb5</h2>
            <p>Decentralized Wallet System</p>
          </div>
          <div className="bg-purple-800/30 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">SpiralIDE</h2>
            <p>Development Environment</p>
          </div>
        </div>
      </div>
    </main>
  );
}
