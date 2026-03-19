import {
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";

import AkashApps from "./akash-apps";
import Deployments from "./deployments";

type TabKey = "apps" | "deployments";

type Item = {
  id: number;
  name: string;
  label?: string;
  image: string;
  title: string;
  description: string;
  button: {
    text: string;
    url: string;
  };
};

const tabs = [
  { key: "apps", label: "Akash Apps", sub: "Browse ecosystem" },
  { key: "deployments", label: "Deployed on Akash", sub: "Live apps" },
];

export default function EcosystemTabs({items, deployedProjects,}: {items: Item[]; deployedProjects: any[];}) {
  const [activeTab, setActiveTab] = useState<TabKey>("apps");

  const activeIndex = tabs.findIndex((t) => t.key === activeTab);

  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const [pillStyle, setPillStyle] = useState({
    width: 0,
    transform: "translateX(0px)",
  });

  const updatePill = useCallback(() => {
    const el = buttonRefs.current[activeIndex];
    const container = containerRef.current;
    
    if (el && container) {
      const elRect = el.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      
      setPillStyle({
        width: elRect.width,
        transform: `translateX(${elRect.left - containerRect.left}px)`,
      });
    }
  }, [activeIndex]);

  useEffect(() => {
    // Small delay to ensure flex layout has applied correctly
    const timer = requestAnimationFrame(updatePill);
    return () => cancelAnimationFrame(timer);
  }, [updatePill]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ro = new ResizeObserver(() => updatePill());
    ro.observe(container);

    return () => ro.disconnect();
  }, [updatePill]);

  return (
    <div>
        {/* HEADER */}
        <div className="flex flex-col md:flex-row items-start justify-between mb-10 gap-6">
          <div>
            <h2 className="text-[28px] md:text-4xl lg:text-[40px] font-semibold">
              Ecosystem Solutions
            </h2>
            <p className="text-[15px] md:text-base text-[#86868B] mt-2 max-w-md">
              Interact with the next generation of sovereign applications,
              running entirely on the open grid.
            </p>
            
            <button className="flex md:hidden mt-8 items-center justify-center gap-2 text-sm px-4 py-2 bg-white dark:bg-white/5 border border-[#E5E5E5] dark:border-white/15 active:scale-95 transition-all rounded-full w-fit">
              Explore Ecosystem 
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.3335 8.00016H12.6668M12.6668 8.00016L8.00016 3.3335M12.6668 8.00016L8.00016 12.6668" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          <button className="hidden md:flex cursor-pointer items-center justify-center gap-2 text-sm px-4 py-2 bg-white dark:bg-white/5 border border-[#E5E5E5] dark:border-white/15 hover:bg-black/5 hover:dark:bg-white/10 transition-all duration-300 rounded-full">
            Explore Ecosystem 
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.3335 8.00016H12.6668M12.6668 8.00016L8.00016 3.3335M12.6668 8.00016L8.00016 12.6668" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* TAB SWITCHER */}
        <div className="mb-12">
            <div className="w-full sm:w-auto">
                <div className="flex sm:inline-flex rounded-full bg-[#f5f5f7] p-1 w-full sm:w-auto">
                <div ref={containerRef} className="relative flex w-full sm:w-auto gap-2.5">
                    
                    <div
                    className="absolute top-0 h-full rounded-full bg-white transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
                    style={{
                        width: pillStyle.width,
                        transform: pillStyle.transform,
                    }}
                    />

                    {tabs.map((tab, i) => {
                    const isActive = activeTab === tab.key;

                    return (
                        <button
                        key={tab.key}
                        ref={(el) => {
                          buttonRefs.current[i] = el;
                        }}
                        onClick={() => setActiveTab(tab.key as TabKey)}
                        className={`
                            relative z-10 
                            ${tab.key === 'apps' ? 'flex-45' : 'flex-65'} sm:flex-none
                            text-center
                            px-5 py-3 sm:py-2
                            text-base sm:text-[17px]
                            font-medium
                            rounded-full 
                            leading-none
                            cursor-pointer
                            transition-colors duration-200
                            ${isActive ? "text-[#1D1D1F]" : "text-[#86868B]"}
                        `}
                        >
                        {tab.label}
                        </button>
                    );
                    })}
                </div>
                </div>
            </div>
        </div>

      {activeTab === "apps" ? (
        <AkashApps items={items} />
      ) : (
        <Deployments projects={deployedProjects} />
      )}
    </div>
  );
}