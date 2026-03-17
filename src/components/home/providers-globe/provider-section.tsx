'use client'

import { useState } from 'react'
import Globe from './globe'
import ProviderCard from './provider-card'
import type { Provider, NetworkStats } from './types'

interface GlobalGridProps {
  initialProviders: Provider[]
  initialStats: NetworkStats
}

export default function GlobalGrid({ initialProviders, initialStats }: GlobalGridProps) {
  const providers = initialProviders
  const stats = initialStats
  const [selectedId, setSelectedId] = useState<string | null>(initialProviders[0]?.id || null)

  const selectedProvider = providers.find((p) => p.id === selectedId) ?? null

  const statsDisplay = [
    { label: 'Active Leases', value: String(stats?.activeLeases || 0) },
    { label: 'Memory', value: stats?.memory || '0 TB' },
    { label: 'CPUs', value: String(stats?.cpus || 0) },
    { label: 'Storage', value: stats?.storage || '0 TB' },
    { label: 'Total GPUs', value: String(stats?.totalGpus || 0) },
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

      <section className="pb-6 border-black/10 dark:border-[#39393B] text-[#86868B] border-b flex flex-wrap items-center justify-start sm:justify-between gap-x-8 gap-y-4 text-xs md:text-sm font-jetBrainsMono">
        {statsDisplay.map((stat) => (
          <div key={stat.label} className="whitespace-nowrap">
            {stat.label}: <span className="ml-1 text-[#86868B]">{stat.value}</span>
          </div>
        ))}
      </section>

      <main className="relative grow py-12 lg:py-20 w-full max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12 lg:gap-20">
          {/* Globe Container */}
          <div
            className="w-full lg:w-[65%] xl:w-[70%] aspect-video relative bg-[#E3E3E3] dark:bg-[#0e0e0e] overflow-hidden"
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
            {stats?.uptime || '99.9%'}
          </span>
        </div>
        <div>
          Avg Latency: <span className="text-[#86868B]">{stats?.avgLatency || '42ms'}</span>
        </div>
      </footer>
    </div>
  )
}
