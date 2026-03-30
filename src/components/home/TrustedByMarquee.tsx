import React, { useEffect, useRef } from "react";

interface TrustedByItem {
  image?: string;
  svg?: string;
  title: string;
  height?: number | string;
}

const processSvg = (svgString: string) => {
  return svgString.replace(/height="100%"/g, "").replace(/width="100%"/g, "");
};

// Consistent speed in pixels per second across all screen sizes
const PIXELS_PER_SECOND = 350;

const TrustedByMarquee = ({
  trustedBySection,
}: {
  trustedBySection: TrustedByItem[];
}) => {
  const trackRef = useRef<HTMLDivElement>(null);

  // Triple items for seamless loop
  const displayItems = [...trustedBySection, ...trustedBySection, ...trustedBySection];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const setDuration = () => {
      // One-third of the track = one set of logos
      const oneSetWidth = track.scrollWidth / 3;
      const duration = oneSetWidth / PIXELS_PER_SECOND;
      track.style.animationDuration = `${duration}s`;
    };

    setDuration();

    window.addEventListener("resize", setDuration);
    return () => window.removeEventListener("resize", setDuration);
  }, [trustedBySection.length]);

  return (
    <div
      className="marquee-container w-full overflow-hidden"
      role="marquee"
      aria-label="Trusted By Logos Carousel"
    >
      <div ref={trackRef} className="marquee-track flex items-center gap-24">
        {displayItems.map((item, index) => {
          const height = item.height
            ? typeof item.height === "number"
              ? `${item.height}px`
              : item.height
            : "34px";
          // First set of logos is above the fold — load eagerly
          const isFirstSet = index < trustedBySection.length;
          return (
            <div
              key={`${item.title}-${index}`}
              className="flex shrink-0 items-center justify-center"
            >
              {item.svg ? (
                <div
                  dangerouslySetInnerHTML={{ __html: processSvg(item.svg) }}
                  className="flex items-center justify-center [&>svg]:block [&>svg]:w-auto [&>svg]:h-[var(--logo-h)]"
                  style={{ height, "--logo-h": height } as React.CSSProperties}
                />
              ) : (
                <img
                  src={item.image}
                  alt={item.title}
                  width="120"
                  height="34"
                  loading={isFirstSet ? "eager" : "lazy"}
                  decoding="async"
                  className="w-auto object-contain dark:invert"
                  style={{ height }}
                />
              )}
            </div>
          );
        })}
      </div>
      <style>{`
        .marquee-track {
          animation: marquee-scroll 1s linear infinite;
          will-change: transform;
        }
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
    </div>
  );
};

export default TrustedByMarquee;
