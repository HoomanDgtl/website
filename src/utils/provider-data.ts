import axios from 'axios'
import { BASE_API_URL } from '../lib/constants'
import { type Provider } from '@/components/home/gpu-providers/types.ts'

export interface ProviderDataResponse {
  stats: {
    activeLeases: number;
    activeProviders: number;
    memory: string;
    cpu: number;
    storage: string;
    totalGpu: number;
    avgLatency: string;
    uptime: string;
  };
  providers: Provider[];
}

function bytesToGB(bytes: number) {
  return (bytes / 1024 / 1024 / 1024).toFixed(1)
}

function formatWithUnit(bytes: number) {
  const tb = bytes / (1024 ** 4);
  if (tb >= 1) return `${tb.toFixed(1)} TB`;
  const gb = bytes / (1024 ** 3);
  return `${gb.toFixed(1)} GB`;
}

export async function fetchProviderData(): Promise<ProviderDataResponse> {
  try {
    const res = await axios.get(`${BASE_API_URL}/v1/providers`)
    
    // Handle various response patterns (array or object wrapper)
    const data = Array.isArray(res.data) ? res.data : res.data?.data || res.data?.providers || [];
    
    // 1. Calculate Network-wide Stats (All Providers)
    let totalStatsRaw = {
      activeLeases: 0,
      activeProviders: 0,
      memory: 0,
      cpu: 0,
      storage: 0,
      totalGpu: 0
    };

    data.forEach((p: any) => {
      if (p.isOnline) totalStatsRaw.activeProviders++;
      totalStatsRaw.activeLeases += p.leaseCount ?? 0;
      totalStatsRaw.memory += p.stats?.memory?.active ?? 0;
      totalStatsRaw.cpu += p.stats?.cpu?.active ?? 0;
      totalStatsRaw.storage += p.stats?.storage?.total?.active ?? 0;
      totalStatsRaw.totalGpu += (p.stats?.gpu?.total ?? 0);
    });

    // 2. Filter, Map and Sort for the Grid/Globe Display (Only a few)
    const providers: Provider[] = data
      .filter((p: any) => 
        p.ipLat && p.ipLon && // Must have coordinates
        (p.isOnline !== undefined ? p.isOnline : true) // Filter for online status
      )
      .map((p: any) => ({
        id: p.owner,
        name: p.organization || p.owner.slice(0, 10),
        lat: Number(p.ipLat),
        lng: Number(p.ipLon),
        location: `${p.ipRegion || ''}${p.ipRegion && p.ipCountry ? ', ' : ''}${p.ipCountry || ''}` || 'Unknown',
        uptime: `${((p.uptime30d ?? 0) * 100).toFixed(2)}%`,
        cpu: `${p.stats?.cpu?.active ?? 0}/${p.stats?.cpu?.total ?? 0}`,
        gpus: p.stats?.gpu?.total > 0 ? `${p.stats.gpu.total}x ${p.gpuModels?.[0] || 'GPU'}` : '0',
        memory: `${bytesToGB(p.stats?.memory?.active ?? 0)}GB/${bytesToGB(p.stats?.memory?.total ?? 0)}GB`,
        storage: `${bytesToGB(p.stats?.storage?.total?.total ?? 0)} GB`,
        leases: p.leaseCount ?? 0,
        audited: p.isAudited ?? false,
        avgLatency: '42ms'
      }))
      .sort((a: any, b: any) => parseFloat(b.uptime) - parseFloat(a.uptime))
      .slice(0, 150); // Keep only the top 150 for performance and map clarity

    return {
      stats: {
        activeLeases: totalStatsRaw.activeLeases,
        activeProviders: totalStatsRaw.activeProviders,
        memory: formatWithUnit(totalStatsRaw.memory),
        cpu: Math.round(totalStatsRaw.cpu),
        storage: formatWithUnit(totalStatsRaw.storage),
        totalGpu: totalStatsRaw.totalGpu,
        avgLatency: '42ms',
        uptime: '99.9%'
      },
      providers
    };
  } catch (error) {
    console.error('Error fetching providers:', error)
    return {
      stats: {
        activeLeases: 0,
        activeProviders: 0,
        memory: '0 GB',
        cpu: 0,
        storage: '0 GB',
        totalGpu: 0,
        avgLatency: '42ms',
        uptime: '99.9%'
      },
      providers: []
    };
  }
}
