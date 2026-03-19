import axios from 'axios'
import { BASE_API_URL } from '@/lib/constants'
import type { Provider, NetworkStats } from '@/components/home/gpu-providers/types'
import { FALLBACK_PROVIDERS, FALLBACK_STATS } from './fallback-data'

function bytesToGB(bytes: number) {
  return (bytes / 1024 / 1024 / 1024).toFixed(1)
}

function getFlagEmoji(countryCode: string | null) {
  if (!countryCode) return ''
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0))
  return String.fromCodePoint(...codePoints)
}

export async function fetchProviderData() {
  try {
    const res = await axios.get(`${BASE_API_URL}/v1/providers`)
    const data = res.data
    console.log(`[fetchProviderData] Fetched ${data.length} providers from API`);

    const providers: Provider[] = data
      .filter((p: any) => p.ipLat && p.ipLon)
      .map((p: any) => ({
        id: p.owner,
        name: p.organization || p.owner.slice(0, 10),
        lat: Number(p.ipLat),
        lng: Number(p.ipLon),
        location: `${p.ipRegion || ''}${p.ipRegion && p.ipCountry ? ', ' : ''}${p.ipCountry || ''}` || 'Unknown',
        locationFlag: getFlagEmoji(p.ipCountryCode),
        uptime: `${((p.uptime30d ?? 0) * 100).toFixed(2)}%`,
        cpu: `${p.stats?.cpu?.active ?? 0}`,
        gpus: `${p.stats?.gpu?.active ?? 0}`,
        memory: `${bytesToGB(p.stats?.memory?.active ?? 0)} GB`,
        leases: p.leaseCount ?? 0,
        audited: p.isAudited ?? false
      }))

    console.log(`[fetchProviderData] Filtered down to ${providers.length} providers with GPS coordinates`);

    // Calculate stats
    const totalLeases = providers.reduce((acc, p) => acc + p.leases, 0)
    const totalCPU = data.reduce((acc: number, p: any) => acc + (p.stats?.cpu?.total ?? 0), 0)
    const totalGPU = data.reduce((acc: number, p: any) => acc + (p.stats?.gpu?.total ?? 0), 0)
    const totalMemoryBytes = data.reduce((acc: number, p: any) => acc + (p.stats?.memory?.total ?? 0), 0)
    const totalMemoryTB = (totalMemoryBytes / 1024 / 1024 / 1024 / 1024).toFixed(1)

    const totalStorageBytes = data.reduce((acc: number, p: any) => acc + (p.stats?.storage?.total?.total ?? 0), 0)
    const totalStorageTB = (totalStorageBytes / 1024 / 1024 / 1024 / 1024).toFixed(1)

    const stats: NetworkStats = {
      activeLeases: totalLeases,
      memory: `${totalMemoryTB} TB`,
      cpus: totalCPU,
      storage: `${totalStorageTB} TB`,
      totalGpus: totalGPU,
      uptime: '99.9%',
      avgLatency: '42ms'
    }

    return { providers, stats }
  } catch (error) {
    console.error('Error fetching providers, using fallback data:', error)
    return { providers: FALLBACK_PROVIDERS, stats: FALLBACK_STATS }
  }
}
