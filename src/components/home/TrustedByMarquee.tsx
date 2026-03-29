import React from "react";

interface TrustedByItem {
  image: string;
  title: string;
  height?: number | string;
}

const TrustedByMarquee = ({
  trustedBySection,
}: {
  trustedBySection: TrustedByItem[];
  speed?: number;
}) => {
  // Duplicate items for seamless loop (CSS animation scrolls one set width then resets)
  const displayItems = [...trustedBySection, ...trustedBySection];

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
            </div>
          );
        })}
      </div>
      <style>{`
        .marquee-track {
          animation: marquee-scroll 30s linear infinite;
          will-change: transform;
        }
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default TrustedByMarquee;
