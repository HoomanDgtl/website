'use client'

import { useState } from 'react'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import Globe from './globe'
import ProviderCard from './provider-card'
import { fetchProviderData } from '@/components/home/gpu-providers/api'
import type { NetworkStats } from '@/components/home/gpu-providers/types'

const queryClient = new QueryClient()

function StatsBar({ stats, position }: { stats: NetworkStats | null; position: 'top' | 'bottom' }) {
  const borderClass = position === 'top'
    ? 'border-b border-[#8A8F98]/25 pb-6 dark:border-[#8A8F9D]/25'
    : 'border-t border-[#8A8F98]/25 pt-6 dark:border-[#8A8F9D]/25'

  if (position === 'top') {
    return (
      <div className={`flex w-full justify-between font-jetBrainsMono text-[#8A8F98] dark:text-[#8A8F9D]/70 ${borderClass}`}>
        <span className="origin-left scale-90">Active Leases: {stats?.activeLeases ?? '—'}</span>
        <span className="origin-left scale-90">Memory: {stats?.memory ?? '—'}</span>
        <span className="origin-left scale-90">CPUs: {stats?.cpus ?? '—'}</span>
        <span className="origin-left scale-90">Storage: {stats?.storage ?? '—'}</span>
        <span className="origin-right scale-90">Total GPUs: {stats?.totalGpus ?? '—'}</span>
      </div>
    )
  }

  return (
    <div className={`flex w-full justify-between font-jetBrainsMono text-[#8A8F98] dark:text-[#8A8F9D]/70 ${borderClass}`}>
      <span className="origin-left scale-90">Uptime: {stats ? `🟢 ${stats.uptime}` : '—'}</span>
      <span className="origin-right scale-90">Avg Latency: {stats?.avgLatency ?? '—'}</span>
    </div>
  )
}

function GlobalGridInner() {
  const { data } = useQuery({
    queryKey: ['providerData'],
    queryFn: fetchProviderData,
    staleTime: 5 * 60 * 1000,
  })

  const providers = data?.providers ?? []
  const stats = data?.stats ?? null

  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [cardOpen, setCardOpen] = useState(false)

  const selectedProvider = selectedId
    ? providers.find((p) => p.id === selectedId) ?? null
    : null

  const handleSelect = (id: string) => {
    setSelectedId(id)
    setCardOpen(true)
  }

  return (
    <>
      <StatsBar stats={stats} position="top" />

      <div className="flex flex-col items-stretch 2xl:mx-32 px-4 py-10 md:flex-row md:justify-center gap-5 md:px-0 md:py-[80px] ">
        <div className={`w-full bg-[#F5F5F5] dark:bg-[#0E0E0E] overflow-hidden transition-all duration-300 relative min-h-[400px] ${cardOpen ? 'w-2/5' : 'w-3/5 '}`}>
          <div className="absolute top-0 left-0 w-full">
            <Globe providers={providers} selectedId={selectedId} onSelect={handleSelect} />
          </div>
        </div>
        {cardOpen && selectedProvider && (
          <div className="w-full md:max-w-[400px]">
            <ProviderCard provider={selectedProvider} onClose={() => setCardOpen(false)} />
          </div>
        )}
      </div>

      <StatsBar stats={stats} position="bottom" />
    </>
  )
}

export default function GlobalGridClient() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalGridInner />
    </QueryClientProvider>
  )
}
