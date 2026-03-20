import axios from 'axios'
import { BASE_API_URL } from '@/lib/constants'
import { type Provider } from '@/components/home/gpu-providers/types.ts'

function bytesToGB(bytes: number) {
  return (bytes / 1024 / 1024 / 1024).toFixed(1)
}

export async function fetchProviderData(): Promise<Provider[]> {
  try {
    const res = await axios.get(`${BASE_API_URL}/v1/providers`)
    const data = res.data
    console.log(`[fetchProviderData] Fetched ${data.length} providers from API`);

    // Filter and Sort by uptime descending
    const providers: Provider[] = data
      .filter((p: any) => p.ipLat && p.ipLon)
      .map((p: any) => ({
        id: p.owner,
        name: p.organization || p.owner.slice(0, 10),
        lat: Number(p.ipLat),
        lng: Number(p.ipLon),
        location: `${p.ipRegion || ''}${p.ipRegion && p.ipCountry ? ', ' : ''}${p.ipCountry || ''}` || 'Unknown',
        uptime: `${((p.uptime30d ?? 0) * 100).toFixed(2)}%`,
        cpu: `${p.stats?.cpu?.active ?? 0}`,
        gpus: `${p.stats?.gpu?.active ?? 0}`,
        memory: `${bytesToGB(p.stats?.memory?.active ?? 0)} GB`,
        storage: `${bytesToGB(p.stats?.storage?.total?.total ?? 0)} GB`,
        leases: p.leaseCount ?? 0,
        audited: p.isAudited ?? false,
        avgLatency: '42ms'
      }))
      .sort((a: any, b: any) => parseFloat(b.uptime) - parseFloat(a.uptime))

    console.log(`[fetchProviderData] Filtered and sorted down to ${providers.length} providers`);

    return providers
  } catch (error) {
    console.error('Error fetching providers:', error)
    return []
  }
}
