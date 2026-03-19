import { useEffect, useState } from 'react'
import type { Provider } from './types'

interface ProviderCardProps {
  provider: Provider
  onClose: () => void
}

export default function ProviderCard({ provider, onClose }: ProviderCardProps) {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'))
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'))
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  const fields = [
    { label: 'Location', value: provider.location },
    { label: 'Uptime', value: provider.uptime },
    { label: 'CPU', value: provider.cpu },
    { label: 'GPUs', value: provider.gpus },
    { label: 'Memory', value: provider.memory },
    { label: 'Leases', value: String(provider.leases) },
  ]

  return (
    <div className="relative">
      <button
        onClick={onClose}
        className="absolute -top-10 right-0 z-20 w-8 h-8 flex items-center justify-center rounded-full border border-black/10 dark:border-white/10 text-black dark:text-white hover:bg-black/5 hover:dark:bg-white/5 transition-colors duration-300 cursor-pointer"
        aria-label="Close"
      >
        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </svg>
      </button>

      <div className={`${isDark ? 'bg-[#212123]' : 'bg-[#E3E3E3]'} rounded-[20px] px-6 py-6 min-w-[340px] relative z-10 shadow-sm transition-colors duration-300`}>
        <div className="flex justify-between items-center mb-1">
          <span className="text-[#86868B] text-sm">Provider:</span>
          {provider.audited && (
            <span className="bg-[#A6FA99] text-[#0C3205] text-sm px-2.5 py-1.5 rounded-full flex items-center gap-1.5 font-medium">
              Audited
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.5 6L5.5 7L7.5 5M6 11C8.76142 11 11 8.76142 11 6C11 3.23858 8.76142 1 6 1C3.23858 1 1 3.23858 1 6C1 8.76142 3.23858 11 6 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          )}
        </div>
        <h2 className="text-[19px] text-[#171717] dark:text-white font-semibold mb-6 truncate" title={provider.name}>
          {provider.name}
        </h2>

        <div className="space-y-3">
          {fields.map((field) => (
            <div key={field.label} className="flex items-center gap-4">
              <span className="min-w-[84px] shrink-0 text-[#171717] dark:text-white text-[15px] font-medium">
                {field.label}
              </span>
              <div className={`flex-grow ${isDark ? 'bg-white/5 border-white/10' : 'bg-[#F1F1F1] border-transparent'} border rounded-[10px] px-4 py-2 flex items-center h-10 text-[#666666] dark:text-[#A3A3A3] text-sm`}>
                <span className="truncate">{field.value}</span>
              </div>
            </div>
          ))}
        </div>

        <a
          href={`https://console.akash.network/providers/${provider.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-full mt-7 px-4 py-3 rounded-full text-[15px] font-medium transition-all flex items-center justify-center gap-2 cursor-pointer ${
            isDark 
              ? 'border border-[#4B4B4D] text-white hover:bg-white/5' 
              : 'bg-[#F1F1F1] text-[#171717] hover:bg-[#e8e8e8]'
          }`}
        >
          View on Console
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
    </div>
  )
}
 


