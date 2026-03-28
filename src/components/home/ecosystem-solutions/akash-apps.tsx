import { useEffect, useState } from "react";

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

export default function AkashApps({ desktopItems, mobileItems }: { desktopItems: Item[]; mobileItems: Item[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const [visibleCount, setVisibleCount] = useState(3);

  if (!mounted) return null;

  if (isMobile) {
    return (
      <div className="space-y-4 sm:space-y-6 mt-6 sm:mt-[40px] pb-10 sm:pb-20">
        {mobileItems.slice(0, visibleCount).map((item) => {
          const isComingSoon = item.label === "coming-soon";

          return (
            <div
              key={item.id}
              className="bg-[#181819] border border-[#2C2C2E] rounded-[16px] overflow-hidden flex flex-col"
            >
              <div className="pt-3 pb-4 sm:pb-6 px-4 space-y-1 text-white">
                <div className="flex items-center gap-2 md:gap-3">
                  <img src="/akash.svg" alt="Akash Logo" className="h-[22px] md:h-8 select-none pointer-events-none" />
                  <span className="text-[22px] sm:text-[26px] md:text-[36px] tracking-tight">
                    {item.name}
                  </span>
                  {item.label && (
                    <span className="text-[10px] sm:text-xs md:text-sm text-white/40 lowercase font-normal -translate-x-1 -translate-y-2">
                      ({item.label})
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm md:text-lg text-[#86868B] leading-relaxed font-normal -mt-1 sm:-mt-2 md:-mt-3">
                  {item.description}
                </p>

                {!isComingSoon && (
                  <div className="pt-2 md:pt-3">
                    <a
                      href={item.button.url}
                      target="_blank"
                      className="inline-flex items-center gap-2 bg-[#F5F5F7] text-[#171717] text-xs md:text-base px-3 md:px-6 py-1.5 md:py-3 rounded-full font-medium active:scale-95 transition-all"
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

              <div className="bg-[#181819] border-t border-[#2C2C2E] flex items-center justify-center relative md:px-[32px]">
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.1) 2px, transparent 0)',
                    backgroundSize: '20px 20px'
                  }}
                />

                <div className="relative w-full h-auto rounded-[12px] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-auto select-none pointer-events-none"
                  />
                </div>

                {isComingSoon && (
                  <div className="absolute top-2 sm:top-8 md:top-16 left-6 sm:left-8 md:left-16 z-20">
                    <div className="bg-white text-[#171717] text-[8.5px] sm:text-xs md:text-sm px-2.5 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-3 rounded-full font-medium">
                      Coming Soon
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {visibleCount < mobileItems.length && (
          <div className="flex justify-center">
            <button
              onClick={() => setVisibleCount((p) => p + 3)}
              className="flex items-center justify-center gap-2 px-3 py-2 bg-transparent dark:bg-white/5 hover:bg-black/5 hover:dark:bg-white/15 border border-black/10 dark:border-white/15 rounded-[40px] text-black dark:text-[#FAFAFA] text-[13px] md:text-base font-medium transition-all active:scale-95 group"
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

  const ROW_HEIGHT = 72;

  return (
    <div className="pt-8 pb-16">
      <div className="max-w-7xl flex flex-row items-start justify-between gap-12">

        {/* Left side: Akash logo + sliding name list */}
        <div className="w-[45%] flex items-start">
          {/* Akash logo — fixed, vertically centered to the first row */}
          <div className="shrink-0 flex items-center" style={{ height: `${ROW_HEIGHT}px` }}>
            <img
              src="/akash.svg"
              alt="Akash"
              className="h-[36px] w-auto object-contain invert dark:invert-0 select-none pointer-events-none"
            />
          </div>

          {/* Name list with overflow hidden — only shows active + items below */}
          <div
            className="relative ml-3 overflow-hidden"
            style={{ height: `${Math.min(desktopItems.length - activeIndex, 7) * ROW_HEIGHT}px`, transition: 'height 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)' }}
          >
            <div
              className="flex flex-col will-change-transform"
              style={{
                transform: `translateY(-${activeIndex * ROW_HEIGHT}px)`,
                transition: 'transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)',
              }}
            >
              {desktopItems.map((item, i) => {
                const isActive = i === activeIndex;

                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveIndex(i)}
                    className="flex items-center cursor-pointer text-left"
                    style={{ height: `${ROW_HEIGHT}px` }}
                  >
                    <div className="flex items-baseline gap-2">
                      <h2
                        className="text-[44px] font-normal tracking-tighter leading-none font-Satoshi text-[#171717] dark:text-white"
                        style={{
                          transition: 'opacity 0.35s ease-out',
                          opacity: isActive ? 1 : 0.3,
                        }}
                      >
                        {item.name}
                      </h2>
                      {item.label && (
                        <span
                          className="text-sm lowercase font-normal font-jetBrainsMono -translate-y-4 text-[#171717] dark:text-white"
                          style={{
                            transition: 'opacity 0.35s ease-out',
                            opacity: isActive ? 0.7 : 0.25,
                          }}
                        >
                          ({item.label})
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right side: Image card + details */}
        <div className="w-[55%] flex items-start justify-end">
          <div className="w-full max-w-[560px] flex flex-col">

            <div className="bg-[#212123] border border-[#2C2C2E] rounded-[24px] overflow-hidden aspect-[4/3] flex items-center justify-center relative">
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.2) 2px, transparent 0)',
                  backgroundSize: '20px 20px'
                }}
              />

              <div className="relative w-full h-full rounded-[12px] overflow-hidden">
                {desktopItems.map((item, i) => (
                  <img
                    key={item.id}
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none will-change-[opacity,transform]"
                    style={{
                      opacity: i === activeIndex ? 1 : 0,
                      transform: i === activeIndex ? 'scale(1)' : 'scale(1.03)',
                      transition: 'opacity 0.5s cubic-bezier(0.25, 0.1, 0.25, 1), transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)',
                    }}
                  />
                ))}
              </div>

              {desktopItems[activeIndex].label === "coming-soon" && (
                <div className="absolute top-[36px] left-[36px] z-20">
                  <div className="bg-white text-[#171717] text-xs md:text-sm px-4 py-2 rounded-full font-medium">
                    Coming Soon
                  </div>
                </div>
              )}
            </div>

            <div className="mt-5">
              <h3 className="text-xl md:text-[24px] font-semibold tracking-tight">
                {desktopItems[activeIndex].title}
              </h3>
              <p className="text-[#86868B] text-sm md:text-base leading-relaxed line-clamp-2 mt-2.5">
                {desktopItems[activeIndex].description}
              </p>

              {desktopItems[activeIndex].label !== "coming-soon" && (
                <div>
                  <a
                    href={desktopItems[activeIndex].button.url}
                    target="_blank"
                    className="inline-flex items-center justify-center mt-5 gap-2 bg-[#F5F5F7] text-[#171717] text-xs md:text-sm px-4 py-2 rounded-full font-medium hover:bg-[#e8e8e8] transition-all group scale-100 active:scale-95 cursor-pointer"
                  >
                    {desktopItems[activeIndex].button.text}
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
  );
}
