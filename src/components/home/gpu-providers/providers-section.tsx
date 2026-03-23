'use client'

import { useState, useEffect } from 'react'
import Globe from './globe'
import ProviderCard from './provider-card'
import { type ProviderDataResponse, fetchProviderDataClient } from '@/utils/provider-data.ts'

interface GlobalGridProps {
  initialData: ProviderDataResponse
}

export default function GlobalGrid({ initialData }: GlobalGridProps) {
  const [data, setData] = useState<ProviderDataResponse>(initialData)
  const { providers, stats } = data
  const [selectedId, setSelectedId] = useState<string | null>(providers[0]?.id || null)

  // Fetch fresh data on the client (with cache + fallback)
  useEffect(() => {
    fetchProviderDataClient().then((freshData) => {
      setData(freshData)
      setSelectedId((prev) => {
        const stillValid = freshData.providers.some((p) => p.id === prev)
        return stillValid ? prev : (freshData.providers[0]?.id ?? null)
      })
    })
  }, [])

  const selectedProvider = providers.find((p) => p.id === selectedId) ?? null

  const statsDisplay = [
    { label: 'Active Leases', value: String(stats.activeLeases) },
    { label: 'Active Providers', value: String(stats.activeProviders) },
    { label: 'Memory', value: stats.memory },
    { label: 'CPUs', value: String(stats.cpu) },
    { label: 'Storage', value: stats.storage },
    { label: 'Total GPUs', value: String(stats.totalGpu) },
  ]

  return (
    <div className="flex flex-col container-nav-3 py-20 lg:py-[120px]">

      <header className="mb-[60px]">
        <h1 className="text-3xl md:text-4xl lg:text-[40px] font-medium mb-4 tracking-tight">
          Global Grid. No Off Switch.
        </h1>
        <div className="text-base leading-relaxed text-[#86868B]">
          Access a permissionless grid of providers spanning 24 countries. <br className="hidden md:block" />
          While centralized clouds have outages, the Supercloud has resilience.
        </div>
      </header>

      <section className="pb-6 border-black/10 dark:border-[#39393B] text-[#86868B] border-b grid grid-cols-2 sm:flex sm:flex-wrap sm:justify-between gap-x-4 sm:gap-x-8 gap-y-4 text-sm font-jetBrainsMono">
        {statsDisplay.map((stat) => (
          <div key={stat.label} className="flex flex-col sm:flex-row sm:items-center whitespace-nowrap">
            <span className="text-[#86868B]">{stat.label}:</span>
            <span className="sm:ml-1.5">{stat.value}</span>
          </div>
        ))}
      </section>

      <main className="relative grow py-12 lg:py-20 w-full max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-6 lg:gap-20">
          {/* Globe Container */}
          <div
            className="w-full lg:w-[65%] xl:w-[70%] aspect-video relative bg-transparent overflow-hidden"
          >
            <div className="absolute inset-0 flex items-center justify-center p-4 md:p-8">
              <div className="w-full h-full relative">
                <Globe
                  providers={providers}
                  selectedId={selectedId}
                  onSelect={(id: string) =>
                    setSelectedId((prev: string | null) => (prev === id ? null : id))
                  }
                />
              </div>
            </div>
            {/* Gradient Overlay (Dark Mode Only) */}
            <div className="absolute inset-x-0 bottom-0 h-[35%] bg-linear-to-t from-[#030303] to-transparent pointer-events-none z-10 hidden dark:block" />
          </div>

          {/* Card Container */}
          <div className="w-full lg:w-[35%] xl:w-[30%] flex justify-center lg:justify-end">
            {selectedProvider && (
              <ProviderCard
                provider={selectedProvider}
                onClose={() => setSelectedId(null)}
              />
            )}
          </div>
        </div>
      </main>

      <footer className="pt-6 border-black/10 dark:border-[#39393B] text-[#86868B] border-t flex justify-between items-center text-xs md:text-sm font-jetBrainsMono">
        <div className="flex items-center gap-2">
          Uptime:
          <span className="flex items-center gap-1 text-[#86868B]">
            <span>🟢</span>
            {stats.uptime || '99.9%'}
          </span>
        </div>
        <div>
          Avg Latency: <span className="text-[#86868B]">{stats.avgLatency || '42ms'}</span>
        </div>
      </footer>
    </div>
  )
}
