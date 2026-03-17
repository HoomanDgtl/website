export interface Provider {
  id: string
  name: string
  lat: number
  lng: number
  location: string
  locationFlag: string
  uptime: string
  cpu: string
  gpus: string
  memory: string
  leases: number
  audited: boolean
}

export interface NetworkStats {
  activeLeases: number
  memory: string
  cpus: number
  storage: string
  totalGpus: number
  uptime: string
  avgLatency: string
}
