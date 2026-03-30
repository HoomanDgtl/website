import React from "react";

interface TrustedByItem {
  image?: string;
  svg?: string;
  title: string;
  height?: number | string;
}

const processSvg = (svgString: string) => {
  return svgString.replace(/height="100%"/g, "").replace(/width="100%"/g, "");
};

const TrustedByMarquee = ({
  trustedBySection,
}: {
  trustedBySection: TrustedByItem[];
  speed?: number;
}) => {
  // Triple items for seamless loop (CSS animation scrolls one set width then resets)
  const displayItems = [...trustedBySection, ...trustedBySection, ...trustedBySection];

  return (
    <div
      className="marquee-container w-full overflow-hidden"
      role="marquee"
      aria-label="Trusted By Logos Carousel"
    >
      <div className="marquee-track flex items-center gap-24">
        {displayItems.map((item, index) => {
          const height = item.height
            ? typeof item.height === "number"
              ? `${item.height}px`
              : item.height
            : "34px";
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
                  loading="lazy"
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
          animation: marquee-scroll 20s linear infinite;
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
