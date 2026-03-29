import React, { useEffect, useRef } from "react";

const useAutoScroll = (speed: number = 50) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = React.useState(false);

  useEffect(() => {
    if (!containerRef.current || !trackRef.current) return;

    const track = trackRef.current;
    let animationFrameId: number;
    let position = 0;

    const animate = () => {
      position -= speed / 80;
      if (position <= -track.scrollWidth / 3) {
        position = 0;
      }
      track.style.transform = `translateX(${position}px)`;
      animationFrameId = requestAnimationFrame(animate);
    };

    setIsLoaded(true);
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [speed]);

  return { containerRef, trackRef, isLoaded };
};

interface TrustedByItem {
  image: string;
  title: string;
  height?: number | string;
}

const TrustedByMarquee = ({
  trustedBySection,
  speed = 50,
}: {
  trustedBySection: TrustedByItem[];
  speed?: number;
}) => {
  const { containerRef, trackRef, isLoaded } = useAutoScroll(speed);

  const displayItems = [
    ...trustedBySection,
    ...trustedBySection,
    ...trustedBySection,
  ];

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden"
      role="marquee"
      aria-label="Trusted By Logos Carousel"
    >
      <div ref={trackRef} className="flex items-center gap-24">
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
                style={{ height, opacity: isLoaded ? 1 : 0 }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrustedByMarquee;
