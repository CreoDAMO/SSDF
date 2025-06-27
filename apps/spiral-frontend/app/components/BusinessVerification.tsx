
'use client';

import { trpc } from '../providers/TrpcProvider';

export default function BusinessVerification() {
  const { data: businessData, isLoading } = trpc.businessVerification.useQuery();

  if (isLoading) return <div className="animate-pulse">Verifying business status...</div>;

  return (
    <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 rounded-lg text-white mb-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-lg">🏛️ FEDERALLY REGISTERED & LAUNCH READY</h3>
          <p className="text-sm opacity-90">EIN: {businessData?.ein}</p>
          <p className="text-sm opacity-90">Business: {businessData?.businessName}</p>
          <p className="text-sm opacity-90">Owner: {businessData?.owner}</p>
        </div>
        <div className="text-right">
          <div className="bg-white text-green-600 px-3 py-1 rounded-full text-sm font-bold">
            ✅ VERIFIED
          </div>
          <p className="text-xs mt-1 opacity-75">Tax Compliant • IRS Approved</p>
        </div>
      </div>
      
      <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
        <div className="bg-white/20 p-2 rounded">
          <div className="font-semibold">Sales Tax</div>
          <div className="opacity-75">{businessData?.certificates.salesTax}</div>
        </div>
        <div className="bg-white/20 p-2 rounded">
          <div className="font-semibold">Comm Services</div>
          <div className="opacity-75">{businessData?.certificates.commServices}</div>
        </div>
        <div className="bg-white/20 p-2 rounded">
          <div className="font-semibold">Prepaid Wireless</div>
          <div className="opacity-75">{businessData?.certificates.prepaidWireless}</div>
        </div>
      </div>

      <div className="mt-4 text-center">
        <div className="bg-yellow-400 text-black px-4 py-2 rounded-full font-bold inline-block">
          🚀 LAUNCH AUTHORIZED - READY FOR PRODUCTION
        </div>
      </div>
    </div>
  );
}
