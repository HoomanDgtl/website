import { useEffect, useRef, useState } from "react";

type Item = {
  id: number;
  name: string;
  label?: string;
  image: string;
  mobileImage?: string;
  title: string;
  description: string;
  button: {
    text: string;
    url: string;
  };
};

export default function AkashApps({ items }: { items: Item[] }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      if (rect.top <= 0 && rect.bottom >= viewportHeight) {
        const totalHeight = rect.height - viewportHeight;
        const scrolled = Math.abs(rect.top);
        const progress = scrolled / totalHeight;

        const newIndex = Math.min(
          Math.floor(progress * items.length),
          items.length - 1
        );
        setActiveIndex(newIndex);
      } else if (rect.top > 0) {
        setActiveIndex(0);
      } else if (rect.bottom < viewportHeight) {
        setActiveIndex(items.length - 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [items.length]);

  const isMobile = windowWidth < 1200;
  const [visibleCount, setVisibleCount] = useState(3);

  if (isMobile) {
    return (
      <div className="space-y-6 pb-20 mt-[40px]">
        {items.slice(0, visibleCount).map((item) => {
          const isConsoleLogo = item.name === "console" && !item.label;
          const isComingSoon = item.label === "coming-soon";

          return (
            <div
              key={item.id}
              className="bg-[#181819] border border-white/5 rounded-[16px] overflow-hidden flex flex-col"
            >
              <div className="py-5 px-4 space-y-3 text-white">
                <div className="flex items-center gap-2 md:gap-3">
                  <img src="/akash.svg" alt="Akash Logo" className="h-[22px] md:h-8 select-none pointer-events-none" />
                  <span className="text-[26px] md:text-[36px] tracking-tight">
                    {item.name}
                  </span>
                </div>

                <p className="text-sm md:text-lg text-[#86868B] leading-relaxed font-normal -mt-2 md:-mt-3">
                  {item.description}
                </p>

                {!isComingSoon && (
                  <div className="pt-1 md:pt-3">
                    <a
                      href={item.button.url}
                      className="inline-flex items-center gap-2 bg-white text-[#171717] text-xs md:text-base px-3 md:px-6 py-1.5 md:py-3 rounded-full font-medium active:scale-95 transition-all shadow-sm"
                    >
                      {item.button.text}
                      <svg
                        className="w-[14px] h-[14px] md:w-5 md:h-5"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4.66663 4.66699H11.3333M11.3333 4.66699V11.3337M11.3333 4.66699L4.66663 11.3337"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                  </div>
                )}
              </div>

              <div className="bg-[#212123] border-t border-white/5 flex items-center justify-center relative md:px-[32px]">
                <div 
                  className="absolute inset-0 pointer-events-none" 
                  style={{ 
                    backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.2) 2px, transparent 0)', 
                    backgroundSize: '20px 20px' 
                  }} 
                />

                <div className="relative w-full h-auto rounded-[12px] overflow-hidden">
                  <img
                    src={item.mobileImage}
                    alt={item.title}
                    className="w-full h-auto select-none pointer-events-none"
                  />
                </div>

                {isComingSoon && (
                  <div className="absolute top-[32px] md:top-[64px] left-[32px] md:left-[64px] z-20">
                    <div className="bg-white text-[#171717] text-xs md:text-sm px-4 md:px-6 py-2 md:py-3 rounded-full font-medium shadow-lg">
                      Coming Soon
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {visibleCount < items.length && (
          <div className="flex justify-center">
            <button
              onClick={() => setVisibleCount((p) => p + 3)}
              className="flex items-center justify-center gap-2 px-3 py-2 bg-black/4.5 dark:bg-white/4.5 border border-black/10 dark:border-white/15 rounded-[40px] text-black dark:text-[#FAFAFA] text-[13px] md:text-base font-medium transition-all active:scale-95 shadow-sm group"
            >
              <span>Show More</span>
              <svg 
                className="w-4 h-4 md:w-5 md:h-5 shrink-0 translate-y-px"
                viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: `${items.length * 80}vh` }}
    >
      <div className="sticky top-24 min-h-[600px] h-screen max-h-[900px] flex items-center overflow-hidden">
        <div className="w-full flex flex-col md:flex-row items-start h-full justify-between">
          
          <div className="w-full md:w-1/2 flex items-start gap-[10px]">
            <div className="w-[180px] h-16 md:h-[88px] flex items-center shrink-0">
              <img 
                src="/akash.svg" 
                alt="Akash" 
                className="h-[40px] w-auto object-contain invert dark:invert-0 select-none pointer-events-none"
              />
            </div>

            <div className="relative overflow-visible">
              <div 
                className="flex flex-col transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
                style={{
                  transform: `translateY(-${activeIndex * (isMobile ? 64 : 88)}px)`
                }}
              >
                {items.map((item, i) => {
                  const isActive = i === activeIndex;

                  return (
                    <div
                      key={item.id}
                      className={`flex items-center h-16 md:h-[88px] transition-colors duration-500 ${
                        isActive ? "text-[#171717] dark:text-white" : "text-[#171717]/40 dark:text-white/40"
                      }`}
                    >
                      <div className="flex items-baseline gap-3">
                        <h2 className="text-[32px] md:text-[48px] font-normal tracking-tighter leading-none font-satoshi">
                          {item.name}
                        </h2>
                        {item.label && (
                          <span className="text-sm md:text-base text-[#171717]/40 dark:text-white/40 lowercase font-normal font-jetBrainsMono -translate-y-5">
                             ({item.label})
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 flex items-start justify-end h-full mt-6">
            <div className="w-full max-w-[560px] flex flex-col">

              <div className="bg-[#212123] border border-[#2C2C2E] rounded-[24px] overflow-hidden aspect-[4/3] flex items-center justify-center relative shadow-2xl">
                <div 
                  className="absolute inset-0 pointer-events-none" 
                  style={{ 
                    backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.2) 2px, transparent 0)', 
                    backgroundSize: '20px 20px' 
                  }} 
                />

                <div className="relative w-full h-full rounded-[12px] overflow-hidden">
                  {items.map((item, i) => (
                    <img
                      key={item.id}
                      src={item.image}
                      alt={item.title}
                      className={`absolute inset-0 w-full h-full object-cover select-none pointer-events-none transition-opacity duration-700 ${
                        i === activeIndex ? "opacity-100 scale-100" : "opacity-0 scale-110"
                      }`}
                    />
                  ))}
                </div>

                {items[activeIndex].label === "coming-soon" && (
                  <div className="absolute top-[36px] left-[36px] z-20">
                    <div className="bg-white text-[#171717] text-xs md:text-sm px-4 py-2 rounded-full font-medium">
                      Coming Soon
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-5 space-y-5">
                <h3 className="text-xl md:text-[24px] font-semibold transition-all duration-500 tracking-tight">
                  {items[activeIndex].title}
                </h3>
                <p className="text-[#86868B] -mt-4 text-sm md:text-base leading-relaxed transition-all duration-500 line-clamp-2">
                  {items[activeIndex].description}
                </p>
                
                {items[activeIndex].label !== "coming-soon" && (
                  <div>
                    <a
                      href={items[activeIndex].button.url}
                      className="inline-flex items-center justify-center gap-2 bg-[#212123] dark:bg-white dark:text-[#171717] text-white text-xs md:text-sm px-4 py-2 rounded-full font-medium hover:bg-[#F5F5F7] transition-all group scale-100 active:scale-95 cursor-pointer"
                    >
                      {items[activeIndex].button.text}
                      <svg 
                        className="group-hover:rotate-45 transition-transform duration-300 translate-y-px"
                        width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M4.66663 4.66699H11.3333M11.3333 4.66699V11.3337M11.3333 4.66699L4.66663 11.3337" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
