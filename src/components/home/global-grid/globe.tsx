import { useEffect, useRef } from "react";
import createGlobe from "cobe";

const MARKERS: [number, number][] = [
  [37.7749, -122.4194], // San Francisco
  [40.7128, -74.006], // New York
  [51.5074, -0.1278], // London
  [48.8566, 2.3522], // Paris
  [35.6762, 139.6503], // Tokyo
  [1.3521, 103.8198], // Singapore
  [-33.8688, 151.2093], // Sydney
  [55.7558, 37.6173], // Moscow
  [19.076, 72.8777], // Mumbai
  [-23.5505, -46.6333], // São Paulo
  [28.6139, 77.209], // Delhi
  [52.52, 13.405], // Berlin
  [25.2048, 55.2708], // Dubai
  [37.5665, 126.978], // Seoul
  [39.9042, 116.4074], // Beijing
  [-1.2921, 36.8219], // Nairobi
  [43.6532, -79.3832], // Toronto
  [47.6062, -122.3321], // Seattle
];

export default function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const phi = useRef(0);

  useEffect(() => {
    let width = 0;

    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
      }
    };
    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(canvasRef.current!, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.2,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [1, 1, 1],
      glowColor: [0.15, 0.15, 0.15],
      markers: MARKERS.map(([lat, lng]) => ({ location: [lat, lng], size: 0.03 })),
      onRender: (state) => {
        if (!pointerInteracting.current) {
        }
        state.phi = phi.current + pointerInteractionMovement.current;
        state.width = width * 2;
        state.height = width * 2;
      },
    });

    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <canvas
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX - pointerInteractionMovement.current;
          canvasRef.current!.style.cursor = "grabbing";
        }}
        onPointerUp={() => {
          pointerInteracting.current = null;
          canvasRef.current!.style.cursor = "grab";
        }}
        onPointerOut={() => {
          pointerInteracting.current = null;
          canvasRef.current!.style.cursor = "grab";
        }}
        onPointerMove={(e) => {
          if (pointerInteracting.current !== null) {
            const delta = e.clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta / 200;
          }
        }}
        style={{
          width: "100%",
          cursor: "grab",
          aspectRatio: "1",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />
    </div>
  );
}
