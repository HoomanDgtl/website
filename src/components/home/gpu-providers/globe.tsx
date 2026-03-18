'use client'

import { useEffect, useRef, useState } from 'react'
import createGlobe from 'cobe'
import type { Provider } from './types'

interface GlobeProps {
  providers: Provider[]
  selectedId: string | null
  onSelect: (id: string) => void
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
    // radius of globe mapped to coordinates is mathematically exactly 0.4
    x: 0.5 + x1 * 0.4,
    y: 0.5 - y2 * 0.4, // Invert Y here mapping back to screen space 
    visible: z2 > 0,
  }
}

export default function Globe({ providers, selectedId, onSelect }: GlobeProps) {
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
    const radius = size * 0.4 // Mathematically exact sphere radius for cobe

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
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.5, 0.5, 0.5],
      markerColor: [1, 1, 1],
      glowColor: [0, 0, 0],
      markers: initialMarkers,
      onRender: (state) => {
        // Update webgl marker sizes: hide if selected to allow HTML red dot to cleanly float over the geography without showing a white dot beneath it
        initialMarkers.forEach((m) => {
          m.size = m.id === selectedIdRef.current ? 0 : 0.03
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

      {providers.map((pin) => {
        const isSelected = pin.id === selectedId
        const isHovered = pin.id === hoveredId
        const showLabel = isSelected || isHovered
        
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
              onMouseEnter={() => setHoveredId(pin.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="relative flex items-center justify-center w-6 h-6 cursor-pointer group"
            >
              {showLabel && (
                <div className="absolute left-[80%] top-1/2 -translate-y-1/2 z-20 pointer-events-none origin-left transition-all duration-200 scale-100 opacity-100">
                  <div className="bg-[#212124] px-4 py-2 rounded-xl flex items-center gap-2 whitespace-nowrap">
                    <span className="w-3 h-3 rounded-full bg-[#FF2903] shrink-0" />
                    <span className="text-[13px] text-white font-medium tracking-wide">
                      {pin.name}
                    </span>
                  </div>
                </div>
              )}

              <span
                className={`block rounded-full transition-all duration-300 ${isSelected
                  ? 'w-3 h-3 bg-[#FF2903]'
                  : isHovered
                    ? 'w-3 h-3 bg-white'
                    : 'w-1.5 h-1.5 bg-transparent'
                  }`}
              />
            </button>
          </div>
        )
      })}
    </div>
  )
}
