'use client'

import { useEffect, useRef, useState } from 'react'
import createGlobe from 'cobe'

type Provider = {
  id: string
  lat: number
  lng: number
  name: string
}

interface GlobeProps {
  providers: Provider[]
  selectedId: string | null
  onSelect: (id: string) => void
}

function projectPoint(lat:number,lng:number,phi:number,theta:number){
  const latRad = (lat * Math.PI) / 180
  const lngRad = (lng * Math.PI) / 180

  const px = Math.cos(latRad) * Math.cos(lngRad)
  const py = Math.sin(latRad)
  const pz = -Math.cos(latRad) * Math.sin(lngRad)

  const x1 = px * Math.cos(phi) + pz * Math.sin(phi)
  const z1 = -px * Math.sin(phi) + pz * Math.cos(phi)

  const y2 = py * Math.cos(theta) - z1 * Math.sin(theta)
  const z2 = py * Math.sin(theta) + z1 * Math.cos(theta)

  return {
    x: 0.5 + x1 * 0.4,
    y: 0.5 - y2 * 0.4,
    visible: z2 > 0,
  }
}

export default function Globe({ providers, selectedId, onSelect }: GlobeProps){

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const pinRefs = useRef<Map<string, HTMLDivElement | null>>(new Map())

  const phiRef = useRef(-1.76)
  const thetaRef = useRef(0.26)

  const targetPhi = useRef(-1.76)
  const targetTheta = useRef(0.26)

  const dragging = useRef(false)
  const lastPos = useRef({ x: 0, y: 0 })

  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const selectedIdRef = useRef(selectedId)

  useEffect(() => {
    selectedIdRef.current = selectedId
  }, [selectedId])

  /* ✅ focus camera on selected provider */
  useEffect(() => {
    if (!selectedId) return
    const p = providers.find(p => p.id === selectedId)
    if (!p) return

    targetPhi.current = -((p.lng + 90) * Math.PI) / 180
    targetTheta.current = (p.lat * Math.PI) / 180 * 0.25
  }, [selectedId, providers])

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    const size = container.clientWidth

    const markers = providers.map(p => ({
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
      baseColor: [0.1,0.1,0.1],
      markerColor: [1,1,1],
      glowColor: [0.03,0.03,0.03],

      markers,

      onRender:(state)=>{

        /* hide WebGL dot when selected */
        markers.forEach(m => {
          m.size = m.id === selectedIdRef.current ? 0 : 0.03
        })
        state.markers = markers

        /* smooth camera */
        if(!dragging.current){
          const ease = 0.15
          phiRef.current += (targetPhi.current - phiRef.current) * ease
          thetaRef.current += (targetTheta.current - thetaRef.current) * ease
        }

        thetaRef.current = Math.max(
          -Math.PI/3,
          Math.min(Math.PI/3, thetaRef.current)
        )

        state.phi = phiRef.current
        state.theta = thetaRef.current

        /* position DOM pins */
        providers.forEach(p=>{
          const pos = projectPoint(p.lat,p.lng,phiRef.current,thetaRef.current)
          const el = pinRefs.current.get(p.id)

          if(el){
            el.style.left = `${pos.x*100}%`
            el.style.top = `${pos.y*100}%`
            el.style.opacity = pos.visible ? '1':'0'
            el.style.pointerEvents = pos.visible ? 'auto':'none'
          }
        })
      }
    })

    /* drag */
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

    return ()=>{
      globe.destroy()
      container.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }

  },[providers])

  return(
    <div ref={containerRef} className="relative aspect-square w-full cursor-grab select-none">

      <canvas ref={canvasRef} className="w-full h-full opacity-80"/>

      {providers.map(p=>{
        const isSelected = p.id === selectedId
        const isHovered = p.id === hoveredId

        return(
          <div
            key={p.id}
            ref={el=>pinRefs.current.set(p.id,el)}
            data-pin
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left:0, top:0, opacity:0 }}
          >
            <button
              onClick={(e)=>{
                e.stopPropagation()
                onSelect(p.id)
              }}
              onMouseEnter={()=>setHoveredId(p.id)}
              onMouseLeave={()=>setHoveredId(null)}
              className="w-5 h-5 flex items-center justify-center"
            >
              <span className={`rounded-full ${
                isSelected
                  ? "w-2.5 h-2.5 bg-[#FF2903]"
                  : isHovered
                    ? "w-2 h-2 bg-white"
                    : "w-1.5 h-1.5 bg-transparent"
              }`} />
            </button>

            {(isHovered || isSelected) && (
              <div className="absolute left-6 top-1/2 -translate-y-1/2 bg-[#212124] px-3 py-2 rounded-xl text-xs text-white whitespace-nowrap flex items-center gap-2 pointer-events-none">
                <span className="w-3 h-3 rounded-full bg-[#FF2903]" />
                {p.name}
              </div>
            )}
          </div>
        )
      })}

    </div>
  )
}