import { Zap } from 'lucide-react'

export function UpgradeGate() {
  return (
    <div className='flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-gray-50 px-8 py-14'>
      <p className='mb-4 text-[13px] text-gray-400'>
        Get full access to this guide by upgrading to Pro
      </p>
      <button
        onClick={() => alert('Upgrade coming soon!')}
        className='flex items-center gap-2 rounded-full bg-gray-900 px-6 py-2.5 text-[13px] font-medium text-white transition-colors hover:bg-gray-700'
      >
        <Zap size={13} />
        Upgrade to Pro
      </button>
    </div>
  )
}
