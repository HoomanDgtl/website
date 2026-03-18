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

interface GlobeProps {
  providers?: Provider[]
  selectedId?: string | null
  onSelect?: (id: string) => void
  isDark?: boolean
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
  isDark: isDarkProp,
}: GlobeProps) {
  const [internalSelectedId, setInternalSelectedId] = useState<string | null>(null)
  const providers = providersProp ?? []
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
  const [isDark, setIsDark] = useState(isDarkProp ?? true)

  useEffect(() => {
    if (isDarkProp !== undefined) {
      setIsDark(isDarkProp)
      return
    }
    const html = document.documentElement
    setIsDark(html.classList.contains('dark'))
    const observer = new MutationObserver(() => {
      setIsDark(html.classList.contains('dark'))
    })
    observer.observe(html, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [isDarkProp])

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
      dark: isDark ? 1 : 0,
      diffuse: isDark ? 1.2 : 2,
      mapSamples: 30000,
      mapBrightness: isDark ? 6 : 8,
      baseColor: isDark ? [0.1, 0.1, 0.1] : [0.85, 0.85, 0.85],
      markerColor: isDark ? [1, 1, 1] : [0.85, 0.13, 0.13],
      glowColor: isDark ? [0.03, 0.03, 0.03] : [0.9, 0.9, 0.9],
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
  }, [providers, isDark])

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
                    ? 'w-2 h-2 bg-[#171717] dark:bg-white glow-dot'
                    : 'w-1.5 h-1.5 bg-transparent' // Hide base HTML dot to relying on WebGL dot, removing twins
                  }`}
              />
            </button>

            {/* Floating label */}
            {(isHovered || isSelected) && (
              <div className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center pointer-events-none z-10">
                <span className="bg-white/80 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center gap-2 border border-black/10 dark:border-white/10 px-2 pr-3 py-2 rounded-xl text-[12px] text-[#171717] dark:text-white font-mono whitespace-nowrap">
                  <div className='size-2 bg-red-600 rounded-full'></div>
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
