'use client'

import { useEffect, useRef, useState } from 'react'
import createGlobe from 'cobe'

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

export const defaultProviders: Provider[] = [
  {
    id: 'foundry-staking',
    name: 'Foundry Staking',
    lat: 59.9139,
    lng: 10.7522,
    location: 'Oslo, Norway',
    locationFlag: '🇳🇴',
    uptime: '100%',
    cpu: '26/26',
    gpus: '8x NVIDIA H100',
    memory: '59GB/198GB',
    leases: 49,
    audited: true,
  },
  {
    id: 'europlots',
    name: 'Europlots',
    lat: 52.52,
    lng: 13.405,
    location: 'Berlin, Germany',
    locationFlag: '🇩🇪',
    uptime: '99.9%',
    cpu: '32/32',
    gpus: '4x NVIDIA A100',
    memory: '128GB/256GB',
    leases: 67,
    audited: true,
  },
  {
    id: 'cloudmos',
    name: 'Cloudmos',
    lat: 48.8566,
    lng: 2.3522,
    location: 'Paris, France',
    locationFlag: '🇫🇷',
    uptime: '99.8%',
    cpu: '16/16',
    gpus: '2x NVIDIA A100',
    memory: '64GB/128GB',
    leases: 23,
    audited: false,
  },
  {
    id: 'akash-node-uk',
    name: 'AkashNode UK',
    lat: 51.5074,
    lng: -0.1278,
    location: 'London, UK',
    locationFlag: '🇬🇧',
    uptime: '99.95%',
    cpu: '48/48',
    gpus: '6x NVIDIA H100',
    memory: '192GB/384GB',
    leases: 89,
    audited: true,
  },
  {
    id: 'praetor-app',
    name: 'Praetor App',
    lat: 40.7128,
    lng: -74.006,
    location: 'New York, USA',
    locationFlag: '🇺🇸',
    uptime: '99.99%',
    cpu: '64/64',
    gpus: '8x NVIDIA A100',
    memory: '256GB/512GB',
    leases: 112,
    audited: true,
  },
  {
    id: 'spheron-network',
    name: 'Spheron Network',
    lat: 19.076,
    lng: 72.8777,
    location: 'Mumbai, India',
    locationFlag: '🇮🇳',
    uptime: '99.7%',
    cpu: '24/24',
    gpus: '4x NVIDIA V100',
    memory: '96GB/192GB',
    leases: 34,
    audited: false,
  },
  {
    id: 'fleek-xyz',
    name: 'Fleek',
    lat: 37.7749,
    lng: -122.4194,
    location: 'San Francisco, USA',
    locationFlag: '🇺🇸',
    uptime: '99.95%',
    cpu: '32/32',
    gpus: '4x NVIDIA H100',
    memory: '128GB/256GB',
    leases: 56,
    audited: true,
  },
  {
    id: 'overclock-labs',
    name: 'Overclock Labs',
    lat: 34.0522,
    lng: -118.2437,
    location: 'Los Angeles, USA',
    locationFlag: '🇺🇸',
    uptime: '100%',
    cpu: '128/128',
    gpus: '16x NVIDIA H100',
    memory: '512GB/1TB',
    leases: 203,
    audited: true,
  },
  {
    id: 'bison-trails',
    name: 'Bison Trails',
    lat: 35.6762,
    lng: 139.6503,
    location: 'Tokyo, Japan',
    locationFlag: '🇯🇵',
    uptime: '99.9%',
    cpu: '16/16',
    gpus: '2x NVIDIA A100',
    memory: '64GB/128GB',
    leases: 18,
    audited: true,
  },
  {
    id: 'figment-networks',
    name: 'Figment Networks',
    lat: 43.6532,
    lng: -79.3832,
    location: 'Toronto, Canada',
    locationFlag: '🇨🇦',
    uptime: '99.8%',
    cpu: '24/24',
    gpus: '4x NVIDIA A100',
    memory: '96GB/192GB',
    leases: 41,
    audited: true,
  },
  {
    id: 'chainflow',
    name: 'Chainflow',
    lat: 1.3521,
    lng: 103.8198,
    location: 'Singapore',
    locationFlag: '🇸🇬',
    uptime: '99.95%',
    cpu: '32/32',
    gpus: '4x NVIDIA H100',
    memory: '128GB/256GB',
    leases: 72,
    audited: false,
  },
  {
    id: 'stakefish',
    name: 'Stakefish',
    lat: -33.8688,
    lng: 151.2093,
    location: 'Sydney, Australia',
    locationFlag: '🇦🇺',
    uptime: '99.9%',
    cpu: '16/16',
    gpus: '2x NVIDIA A100',
    memory: '64GB/128GB',
    leases: 15,
    audited: true,
  },
  {
    id: 'chorus-one',
    name: 'Chorus One',
    lat: 47.3769,
    lng: 8.5417,
    location: 'Zurich, Switzerland',
    locationFlag: '🇨🇭',
    uptime: '100%',
    cpu: '48/48',
    gpus: '8x NVIDIA H100',
    memory: '256GB/512GB',
    leases: 94,
    audited: true,
  },
  {
    id: 'everstake',
    name: 'Everstake',
    lat: 50.4501,
    lng: 30.5234,
    location: 'Kyiv, Ukraine',
    locationFlag: '🇺🇦',
    uptime: '99.7%',
    cpu: '16/16',
    gpus: '2x NVIDIA V100',
    memory: '64GB/128GB',
    leases: 28,
    audited: false,
  },
  {
    id: 'forbole',
    name: 'Forbole',
    lat: 22.3193,
    lng: 114.1694,
    location: 'Hong Kong',
    locationFlag: '🇭🇰',
    uptime: '99.8%',
    cpu: '24/24',
    gpus: '4x NVIDIA A100',
    memory: '96GB/192GB',
    leases: 37,
    audited: true,
  },
  {
    id: 'cosmostation',
    name: 'Cosmostation',
    lat: 37.5665,
    lng: 126.978,
    location: 'Seoul, South Korea',
    locationFlag: '🇰🇷',
    uptime: '99.95%',
    cpu: '32/32',
    gpus: '4x NVIDIA H100',
    memory: '128GB/256GB',
    leases: 63,
    audited: true,
  },
  {
    id: 'imperator-co',
    name: 'Imperator',
    lat: 55.7558,
    lng: 37.6173,
    location: 'Moscow, Russia',
    locationFlag: '🇷🇺',
    uptime: '99.5%',
    cpu: '16/16',
    gpus: '2x NVIDIA A100',
    memory: '64GB/128GB',
    leases: 12,
    audited: false,
  },
  {
    id: 'polkachu',
    name: 'Polkachu',
    lat: 30.0444,
    lng: 31.2357,
    location: 'Cairo, Egypt',
    locationFlag: '🇪🇬',
    uptime: '99.8%',
    cpu: '16/16',
    gpus: '2x NVIDIA V100',
    memory: '64GB/128GB',
    leases: 19,
    audited: false,
  },
  {
    id: 'easy-staking',
    name: 'Easy Staking',
    lat: -23.5505,
    lng: -46.6333,
    location: 'São Paulo, Brazil',
    locationFlag: '🇧🇷',
    uptime: '99.7%',
    cpu: '24/24',
    gpus: '4x NVIDIA A100',
    memory: '96GB/192GB',
    leases: 31,
    audited: false,
  },
  {
    id: 'sg-1-validator',
    name: 'SG-1 Validator',
    lat: 25.2048,
    lng: 55.2708,
    location: 'Dubai, UAE',
    locationFlag: '🇦🇪',
    uptime: '99.9%',
    cpu: '48/48',
    gpus: '8x NVIDIA H100',
    memory: '256GB/512GB',
    leases: 85,
    audited: true,
  },
]

export const networkStats = {
  activeLeases: 4203,
  memory: '100TB',
  cpus: 1000,
  storage: '1PB',
  totalGpus: 505,
  uptime: '99.99%',
  avgLatency: '42ms',
}
interface GlobeProps {
  providers?: Provider[]
  selectedId?: string | null
  onSelect?: (id: string) => void
}

function projectPoint(
  lat: number,
  lng: number,
  phi: number,
  theta: number
): { x: number; y: number; visible: boolean } {
  const latRad = (lat * Math.PI) / 180
  const lngRad = (lng * Math.PI) / 180

  // cobe's internal 3D spherical mapping
  const px = Math.cos(latRad) * Math.cos(lngRad)
  const py = Math.sin(latRad)
  const pz = -Math.cos(latRad) * Math.sin(lngRad)

  // Rotate by phi around Y
  const cosPhi = Math.cos(phi)
  const sinPhi = Math.sin(phi)
  const x1 = px * cosPhi + pz * sinPhi
  const z1 = -px * sinPhi + pz * cosPhi

  // Rotate by theta around X
  const cosT = Math.cos(theta)
  const sinT = Math.sin(theta)
  const y2 = py * cosT - z1 * sinT
  const z2 = py * sinT + z1 * cosT

  return {
    // Return normalized [0, 1] percentages instead of rigid physical pixels:
    x: 0.5 + x1 * 0.4,
    y: 0.5 - y2 * 0.4, // Invert Y here mapping back to screen space 
    visible: z2 > 0,
  }
}

export default function Globe({
  providers: providersProp,
  selectedId: selectedIdProp,
  onSelect: onSelectProp,
}: GlobeProps) {
  const [internalSelectedId, setInternalSelectedId] = useState<string | null>(null)
  const providers = providersProp ?? defaultProviders
  const selectedId = selectedIdProp !== undefined ? selectedIdProp : internalSelectedId
  const onSelect = onSelectProp ?? setInternalSelectedId
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const pinRefs = useRef<Map<string, HTMLDivElement | null>>(new Map())
  const phiRef = useRef(-1.76)
  const thetaRef = useRef(0.26)
  const targetPhi = useRef(-1.76)
  const targetTheta = useRef(0.26)
  const dragging = useRef(false)
  const lastPos = useRef({ x: 0, y: 0 })
  const sizeRef = useRef(600)
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const selectedIdRef = useRef(selectedId)
  useEffect(() => {
    selectedIdRef.current = selectedId
  }, [selectedId])

  const hoveredIdRef = useRef<string | null>(null)

  // When selectedId changes, set target rotation to face that provider
  useEffect(() => {
    if (!selectedId) return
    const provider = providers.find((p) => p.id === selectedId)
    if (!provider) return
    targetPhi.current = -((provider.lng + 90) * Math.PI) / 180
    targetTheta.current = (provider.lat * Math.PI) / 180 * 0.25
  }, [selectedId, providers])

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    const size = container.clientWidth
    sizeRef.current = size

    const initialMarkers = providers.map((p) => ({
      id: p.id,
      location: [p.lat, p.lng] as [number, number],
      size: 0.03,
    }))

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: size * 2,
      height: size * 2,
      phi: phiRef.current,
      theta: thetaRef.current,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 30000,
      mapBrightness: 6,
      baseColor: [0.1, 0.1, 0.1],
      markerColor: [1, 1, 1],
      glowColor: [0.03, 0.03, 0.03],
      markers: initialMarkers,
      onRender: (state) => {
        // Hide WebGL dot for selected and hovered — HTML dots handle those states
        initialMarkers.forEach((m) => {
          m.size = m.id === selectedIdRef.current || m.id === hoveredIdRef.current ? 0 : 0.03
        })
        state.markers = initialMarkers

        // Smoothly interpolate toward target (selected provider location)
        if (!dragging.current) {
          const ease = 0.15
          phiRef.current += (targetPhi.current - phiRef.current) * ease
          thetaRef.current += (targetTheta.current - thetaRef.current) * ease
        }

        thetaRef.current = Math.max(
          -Math.PI / 3,
          Math.min(Math.PI / 3, thetaRef.current)
        )

        state.phi = phiRef.current
        state.theta = thetaRef.current

        providers.forEach((pin) => {
          const pos = projectPoint(
            pin.lat,
            pin.lng,
            phiRef.current,
            thetaRef.current
          )
          const el = pinRefs.current.get(pin.id)
          if (el) {
            el.style.left = `${pos.x * 100}%`
            el.style.top = `${pos.y * 100}%`
            el.style.opacity = pos.visible ? '1' : '0'
            el.style.pointerEvents = pos.visible ? 'auto' : 'none'
          }
        })
      },
    })

    const onDown = (e: PointerEvent) => {
      if ((e.target as HTMLElement).closest('[data-pin]')) return
      dragging.current = true
      lastPos.current = { x: e.clientX, y: e.clientY }
      container.style.cursor = 'grabbing'
    }
    const onMove = (e: PointerEvent) => {
      if (!dragging.current) return
      const dx = e.clientX - lastPos.current.x
      const dy = e.clientY - lastPos.current.y
      phiRef.current += dx * 0.005
      thetaRef.current += dy * 0.005
      // Sync targets so globe stays where user dragged
      targetPhi.current = phiRef.current
      targetTheta.current = thetaRef.current
      lastPos.current = { x: e.clientX, y: e.clientY }
    }
    const onUp = () => {
      dragging.current = false
      container.style.cursor = 'grab'
    }

    container.addEventListener('pointerdown', onDown)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)

    return () => {
      globe.destroy()
      container.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [providers])

  return (
    <div
      ref={containerRef}
      className="relative aspect-square w-full cursor-grab select-none"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-80"
        style={{ contain: 'layout paint size' }}
      />

      {/* Interactive pin overlay */}
      {providers.map((pin) => {
        const isSelected = pin.id === selectedId
        const isHovered = pin.id === hoveredId
        return (
          <div
            key={pin.id}
            ref={(el) => {
              pinRefs.current.set(pin.id, el)
            }}
            data-pin
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: 0, top: 0, opacity: 0, willChange: 'left, top, opacity' }}
          >
            <button
              onClick={(e) => {
                e.stopPropagation()
                onSelect(pin.id)
              }}
              onMouseEnter={() => { hoveredIdRef.current = pin.id; setHoveredId(pin.id) }}
              onMouseLeave={() => { hoveredIdRef.current = null; setHoveredId(null) }}
              className="relative flex items-center justify-center w-5 h-5 cursor-pointer"
            >
              <span
                className={`block rounded-full transition-all duration-150 ${isSelected
                  ? 'w-2.5 h-2.5 bg-red-500 red-glow-dot'
                  : isHovered
                    ? 'w-2 h-2 bg-white glow-dot'
                    : 'w-1.5 h-1.5 bg-transparent' // Hide base HTML dot to relying on WebGL dot, removing twins
                  }`}
              />
            </button>

            {/* Floating label */}
            {(isHovered || isSelected) && (
              <div className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center pointer-events-none z-10">
                <span className="bg-black/80 backdrop-blur-sm border border-white/10 px-2 py-1 rounded text-[10px] text-white font-mono whitespace-nowrap">
                  {pin.name}
                </span>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
