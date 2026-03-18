'use client'

import { useMemo, useRef, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useProviderList } from '@/components/ecosystem-pages/providers-page/useProviderList'
import { bytesToShrink } from '@/lib/unit-utils'
import type { ApiProviderList } from '@/types/provider'
import Globe, { type Provider } from './globe'
import ProviderCard from './provider-card'

const queryClient = new QueryClient()

function countryCodeToFlag(code: string): string {
  return [...code.toUpperCase()]
    .map((c) => String.fromCodePoint(0x1f1e6 + c.charCodeAt(0) - 65))
    .join('')
}

function formatMemory(active: number, total: number): string {
  const a = bytesToShrink(active)
  const t = bytesToShrink(total)
  return `${Math.round(a.value)}${a.unit}/${Math.round(t.value)}${t.unit}`
}

function mapApiToProvider(p: ApiProviderList): Provider | null {
  const lat = parseFloat(p.ipLat)
  const lng = parseFloat(p.ipLon)
  if (isNaN(lat) || isNaN(lng)) return null

  // The API returns stats.cpu.active/available/pending/total (not activeStats/pendingStats/availableStats)
  const raw = p as any
  const stats = raw.stats || {}
  const cpuStats = stats.cpu || { active: 0, pending: 0, available: 0, total: 0 }
  const gpuStats = stats.gpu || { active: 0, pending: 0, available: 0, total: 0 }
  const memStats = stats.memory || { active: 0, pending: 0, available: 0, total: 0 }

  const activeCpu = Math.round((cpuStats.active + cpuStats.pending) / 1000)
  const totalCpu = Math.round(cpuStats.total / 1000)

  const activeMemory = memStats.active + memStats.pending
  const totalMemory = memStats.total

  const gpuModels = (p.hardwareGpuModels || []).map((g: string) =>
    g.substring(g.lastIndexOf(' ') + 1)
  )
  const gpuLabel =
    gpuStats.active > 0
      ? `${gpuStats.active}x ${gpuModels[0] || 'GPU'}`
      : gpuModels.length > 0
        ? gpuModels.join(', ')
        : 'None'

  const location = [p.city, p.ipRegion, p.ipCountry].filter(Boolean).join(', ')
  const flag = p.ipCountryCode ? countryCodeToFlag(p.ipCountryCode) : ''

  return {
    id: p.owner,
    name: p.name || p.hostUri,
    lat,
    lng,
    location: location || 'Unknown',
    locationFlag: flag,
    uptime: `${(p.uptime7d * 100).toFixed(1)}%`,
    cpu: `${activeCpu}/${totalCpu}`,
    gpus: gpuLabel,
    memory: totalMemory > 0 ? formatMemory(activeMemory, totalMemory) : '0/0',
    leases: p.leaseCount || 0,
    audited: p.isAudited,
  }
}

function GlobalGridInner() {
  const { data: apiProviders, isLoading } = useProviderList()

  const prevRef = useRef<Provider[]>([])
  const providers = useMemo(() => {
    if (!apiProviders?.length) return prevRef.current
    const mapped = apiProviders
      .filter((p) => p.isOnline)
      .map(mapApiToProvider)
      .filter((p): p is Provider => p !== null)
    // Stable reference: only update if provider IDs changed
    const ids = mapped.map((p) => p.id).join(',')
    const prevIds = prevRef.current.map((p) => p.id).join(',')
    if (ids === prevIds && prevRef.current.length > 0) return prevRef.current
    prevRef.current = mapped
    return mapped
  }, [apiProviders])

  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [cardOpen, setCardOpen] = useState(false)

  const selectedProvider = providers.find((p) => p.id === selectedId) ?? providers[0]

  const handleSelect = (id: string) => {
    setSelectedId(id)
    setCardOpen(true)
  }

  if (isLoading || !providers.length) {
    return (
      <div className="flex min-h-[400px] items-center justify-center py-10 text-[#8A8F98]">
        Loading providers...
      </div>
    )
  }

  return (
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
  )
}

export default function GlobalGridClient() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalGridInner />
    </QueryClientProvider>
  )
}
