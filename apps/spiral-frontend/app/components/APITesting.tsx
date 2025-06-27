
'use client';

import { useState } from 'react';
import { trpc } from '../providers/TrpcProvider';

export default function APITesting() {
  const [testResults, setTestResults] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const apiStatusQuery = trpc.apiValidation.getAPIStatus.useQuery();
  const testAllAPIsMutation = trpc.apiValidation.testAllAPIs.useMutation();

  const runAPITests = async (testLevel: 'basic' | 'full' = 'basic') => {
    setIsLoading(true);
    try {
      const results = await testAllAPIsMutation.mutateAsync({ testLevel });
      setTestResults(results);
    } catch (error) {
      console.error('API test failed:', error);
      setTestResults({ error: 'Test failed' });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'text-green-400';
      case 'failed': return 'text-red-400';
      case 'not_configured': return 'text-yellow-400';
      case 'error': return 'text-red-500';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return '✅';
      case 'failed': return '❌';
      case 'not_configured': return '⚠️';
      case 'error': return '🔥';
      default: return '❓';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-sm rounded-xl border border-purple-500/30 p-8">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-6">
          🔬 ∆∞ API System Validation ∞∆
        </h2>

        {/* API Configuration Status */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-white mb-4">📡 API Configuration Status</h3>
          {apiStatusQuery.data && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(apiStatusQuery.data.status).map(([key, status]: [string, any]) => (
                <div key={key} className="bg-black/30 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm">{key}</span>
                    <span className={`${status.configured ? 'text-green-400' : 'text-red-400'}`}>
                      {status.configured ? '✅' : '❌'}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {status.hasValue ? 'Value provided' : 'No value'}
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="mt-4 text-sm text-gray-400">
            Configured: {apiStatusQuery.data?.configuredKeys || 0} / {apiStatusQuery.data?.totalKeys || 0} APIs
          </div>
        </div>

        {/* Test Controls */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-white mb-4">🧪 Connection Testing</h3>
          <div className="flex gap-4">
            <button
              onClick={() => runAPITests('basic')}
              disabled={isLoading}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200"
            >
              {isLoading ? '🔄 Testing...' : '🚀 Run Basic Tests'}
            </button>
            <button
              onClick={() => runAPITests('full')}
              disabled={isLoading}
              className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 disabled:opacity-50 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200"
            >
              {isLoading ? '🔄 Testing...' : '🔬 Run Full Tests'}
            </button>
          </div>
        </div>

        {/* Test Results */}
        {testResults && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">📊 Test Results</h3>
            
            {testResults.error ? (
              <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-4">
                <div className="text-red-400">❌ Test Error: {testResults.error}</div>
              </div>
            ) : (
              <>
                <div className="bg-black/30 rounded-lg p-4 border border-gray-700 mb-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-400">{testResults.totalAPIs}</div>
                      <div className="text-sm text-gray-400">Total APIs</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-400">{testResults.connectedAPIs}</div>
                      <div className="text-sm text-gray-400">Connected</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-yellow-400">{testResults.totalAPIs - testResults.connectedAPIs}</div>
                      <div className="text-sm text-gray-400">Failed/Missing</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-400">
                        {Math.round((testResults.connectedAPIs / testResults.totalAPIs) * 100)}%
                      </div>
                      <div className="text-sm text-gray-400">Success Rate</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(testResults.results).map(([api, result]: [string, any]) => (
                    <div key={api} className="bg-black/30 rounded-lg p-4 border border-gray-700">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-white capitalize">{api}</span>
                        <span className={`text-lg ${getStatusColor(result.status)}`}>
                          {getStatusIcon(result.status)}
                        </span>
                      </div>
                      <div className={`text-sm ${getStatusColor(result.status)}`}>
                        Status: {result.status}
                      </div>
                      {result.statusCode && (
                        <div className="text-xs text-gray-500">
                          HTTP: {result.statusCode}
                        </div>
                      )}
                      {result.message && (
                        <div className="text-xs text-gray-500 mt-1">
                          {result.message}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-4 text-xs text-gray-500">
                  Test completed at: {new Date(testResults.timestamp).toLocaleString()}
                </div>
              </>
            )}
          </div>
        )}

        {/* QASF System Status */}
        <div className="border-t border-gray-700 pt-6">
          <h3 className="text-xl font-semibold text-white mb-4">🌀 QASF System Components</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-purple-900/30 to-purple-700/30 rounded-lg p-4">
              <div className="text-purple-300 font-medium">SpiralLang Core</div>
              <div className="text-green-400 text-sm">✅ Active</div>
            </div>
            <div className="bg-gradient-to-br from-blue-900/30 to-blue-700/30 rounded-lg p-4">
              <div className="text-blue-300 font-medium">HTSX Engine</div>
              <div className="text-green-400 text-sm">✅ Ready</div>
            </div>
            <div className="bg-gradient-to-br from-teal-900/30 to-teal-700/30 rounded-lg p-4">
              <div className="text-teal-300 font-medium">Trust Units (∞ TU)</div>
              <div className="text-green-400 text-sm">✅ Infinite</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
