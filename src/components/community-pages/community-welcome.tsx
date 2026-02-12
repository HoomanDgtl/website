import React, { useState } from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../ui/accordion";
import AkashClubContent from "./akash-club-content";
import AkashInsidersContent from "./akash-insiders-content";
import DevelopersContent from "./developers-content";

// ─── Icon Components ───────────────────────────────────────────────────────────

const MessagesSquareIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
        <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
    </svg>
);

const BadgeCheckIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
        <path d="m9 12 2 2 4-4" />
    </svg>
);

const CalendarIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
        <line x1="16" x2="16" y1="2" y2="6" />
        <line x1="8" x2="8" y1="2" y2="6" />
        <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
);

const PeaceHandIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7.5 14.5s-1.5 0-3-2c0 0-2.5-2-1-3.5 0 0 1-1 2.5.5" />
        <path d="M9 8.5c-1-1-2.5-3-3.5-2S5 9 6 10" />
        <path d="M9.5 5.5C8-1.5 5 1 6.5 3" />
        <path d="M14.5 5.5C16-1.5 19 1 17.5 3" />
        <path d="M15 8.5c1-1 2.5-3 3.5-2s.5 2.5-.5 3.5" />
        <path d="M16.5 14.5s1.5 0 3-2c0 0 2.5-2 1-3.5 0 0-1-1-2.5.5" />
        <path d="M12 22c-4 0-7-2-7-5.5 0 0 0-5 7-13 7 8 7 13 7 13 0 3.5-3 5.5-7 5.5Z" />
    </svg>
);

const HeartHandshakeLargeIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        <path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08v0c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66" />
        <path d="m18 15-2-2" />
        <path d="m15 18-2-2" />
    </svg>
);

const BadgeCheckLargeIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
        <path d="m9 12 2 2 4-4" />
    </svg>
);

const SearchCodeIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m9 9-2 2 2 2" />
        <path d="m13 13 2-2-2-2" />
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
    </svg>
);

const ArrowUpRightIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 7h10v10" />
        <path d="M7 17 17 7" />
    </svg>
);

const ChevronRightIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m9 18 6-6-6-6" />
    </svg>
);

const DiscordIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 33 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8.72498 20.75C14.7074 23.7412 18.2969 23.7412 24.2793 20.75" />
        <path d="M20.6877 22.5526L21.8842 24.9456C21.8842 24.9456 26.8752 23.3563 28.4649 20.7579C28.4649 19.5614 29.0991 11.0106 24.8754 8.19476C23.0807 6.99827 20.0895 6.40002 20.0895 6.40002L18.893 8.793H16.5" />
        <path d="M12.3498 22.5526L11.1533 24.9456C11.1533 24.9456 6.16232 23.3563 4.57258 20.7579C4.57258 19.5614 3.93834 11.0106 8.16205 8.19476C9.95679 6.99827 12.948 6.40002 12.948 6.40002L14.1445 8.793H16.5375" />
        <path d="M12.3115 18.3609C11.3203 18.3609 10.5167 17.2895 10.5167 15.9679C10.5167 14.6463 11.3203 13.575 12.3115 13.575C13.3027 13.575 14.1062 14.6463 14.1062 15.9679C14.1062 17.2895 13.3027 18.3609 12.3115 18.3609Z" />
        <path d="M20.6928 18.3609C19.7016 18.3609 18.8981 17.2895 18.8981 15.9679C18.8981 14.6463 19.7016 13.575 20.6928 13.575C21.684 13.575 22.4875 14.6463 22.4875 15.9679C22.4875 17.2895 21.684 18.3609 20.6928 18.3609Z" />
    </svg>
);

const GithubIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 33 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.2708 23.6145C9.19786 25.1364 9.19786 21.0781 7.1687 20.5708M21.3728 26.6583V22.7319C21.4109 22.2481 21.3455 21.7617 21.1811 21.3052C21.0166 20.8486 20.7569 20.4322 20.4191 20.0838C23.6049 19.7287 26.953 18.5214 26.953 12.9818C26.9527 11.5652 26.4078 10.203 25.4311 9.1771C25.8936 7.93779 25.8609 6.56795 25.3398 5.35213C25.3398 5.35213 24.1426 4.99703 21.3728 6.85371C19.0474 6.22348 16.5962 6.22348 14.2708 6.85371C11.501 4.99703 10.3037 5.35213 10.3037 5.35213C9.78264 6.56795 9.74994 7.93779 10.2124 9.1771C9.22842 10.2106 8.68298 11.5852 8.69057 13.0122C8.69057 18.5112 12.0387 19.7186 15.2245 20.1143C14.8907 20.4592 14.6332 20.8705 14.4689 21.3215C14.3046 21.7725 14.2371 22.253 14.2708 22.7319V26.6583" />
    </svg>
);

const XIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 33 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
        <path d="M11.6862 6.40002H6.6438L22.4014 27.2H27.4438L11.6862 6.40002Z" />
        <path d="M27.9898 6.91418C28.2737 6.61261 28.2594 6.13795 27.9579 5.854C27.6563 5.57004 27.1817 5.58431 26.8977 5.88587L27.9898 6.91418ZM26.8977 5.88587L18.3288 14.986L19.4209 16.0143L27.9898 6.91418L26.8977 5.88587Z" fill="currentColor" />
        <path d="M15.3749 18.4998L7.44373 27.2" strokeLinecap="round" />
    </svg>
);

const LinkedInIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 33 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.925 11.2632C22.8346 11.2632 24.6659 12.0284 26.0162 13.3905C27.3664 14.7526 28.125 16.6 28.125 18.5263V27H23.325V18.5263C23.325 17.8842 23.0721 17.2684 22.6221 16.8144C22.172 16.3603 21.5615 16.1053 20.925 16.1053C20.2885 16.1053 19.678 16.3603 19.2279 16.8144C18.7779 17.2684 18.525 17.8842 18.525 18.5263V27H13.725V18.5263C13.725 16.6 14.4836 14.7526 15.8338 13.3905C17.1841 12.0284 19.0154 11.2632 20.925 11.2632Z" />
        <path d="M8.925 12.4737H4.125V27H8.925V12.4737Z" />
        <path d="M6.525 8.84211C7.85048 8.84211 8.925 7.75816 8.925 6.42105C8.925 5.08394 7.85048 4 6.525 4C5.19952 4 4.125 5.08394 4.125 6.42105C4.125 7.75816 5.19952 8.84211 6.525 8.84211Z" />
    </svg>
);

const YoutubeIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 33 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M26.1868 10.3872C26.0716 9.92701 25.837 9.50537 25.5067 9.16486C25.1764 8.82436 24.7621 8.57704 24.3057 8.4479C22.6379 8.04065 15.9667 8.04065 15.9667 8.04065C15.9667 8.04065 9.29555 8.04065 7.62775 8.48669C7.17129 8.61583 6.75699 8.86314 6.4267 9.20365C6.09641 9.54416 5.86182 9.96579 5.74664 10.426C5.44141 12.1186 5.29211 13.8356 5.3006 15.5554C5.28972 17.2882 5.43904 19.0183 5.74664 20.7236C5.87362 21.1695 6.11346 21.5751 6.44299 21.9012C6.77251 22.2274 7.18057 22.463 7.62775 22.5853C9.29555 23.0314 15.9667 23.0314 15.9667 23.0314C15.9667 23.0314 22.6379 23.0314 24.3057 22.5853C24.7621 22.4562 25.1764 22.2089 25.5067 21.8684C25.837 21.5279 26.0716 21.1062 26.1868 20.6461C26.4897 18.9662 26.639 17.2623 26.6328 15.5554C26.6437 13.8226 26.4944 12.0925 26.1868 10.3872Z" />
        <path d="M13.785 18.7262L19.3605 15.5554L13.785 12.3847V18.7262Z" />
    </svg>
);

const TelegramIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 33 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M28.5 6.66663L3.16663 16.6666L12.5 18M28.5 6.66663L25.1666 26.6666L12.5 18M28.5 6.66663L12.5 18M12.5 18V25.3333L16.8317 20.9638" />
    </svg>
);

const ZealyIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 33 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
        <path fillRule="evenodd" clipRule="evenodd" d="M25.3394 16.4159C25.7351 16.0242 26.1342 15.6241 26.525 15.2208C26.525 14.7497 26.5283 10.2864 26.5283 10.2864L22.3237 6C17.2328 7.73737 11.8016 8.1341 6.46865 7.84812C6.46865 7.84812 6.46537 8.46141 6.46537 13.814L7.95521 15.3299C7.26835 15.7812 6.57658 16.2225 5.87827 16.6556L5.875 21.5834L10.0828 25.8748C15.7282 26.25 21.4962 25.8318 26.875 23.939V17.9781L25.3394 16.4126V16.4159ZM24.1133 21.6968C19.5964 23.0275 15.135 23.3763 10.5756 23.1912V20.8008C13.1987 19.1015 15.8235 17.2236 18.4434 15.0713C16.0165 15.3904 13.5945 15.4714 11.1627 15.3986V12.7554C15.3967 12.881 19.5588 12.5388 23.7617 11.3453V13.7356C21.1385 16.2847 18.5138 18.508 15.8939 20.4934C18.6364 20.3049 21.3724 19.8619 24.115 19.0535L24.6773 21.442L24.1133 21.6968Z" />
    </svg>
);

const RedditIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 33 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21.7868 7.15716C21.7868 7.15716 21.1667 7.63922 21.1667 8.53677C21.1667 9.5345 21.9502 10.3433 22.9167 10.3433C23.8832 10.3433 24.6667 9.5345 24.6667 8.53677C24.6667 7.53905 23.8832 6.73023 22.9167 6.73023C22.486 6.73023 22.0917 6.89082 21.7868 7.15716ZM21.7868 7.15716L17.2422 6L15.5997 12.7825C13.4146 12.9309 11.4495 13.614 9.96702 14.6453C9.54611 14.2192 8.96945 13.9564 8.33333 13.9564C7.04467 13.9564 6 15.0348 6 16.3651C6 17.2909 6.50593 18.0947 7.24795 18.4979C7.19434 18.7852 7.16667 19.0783 7.16667 19.376C7.16667 23.0343 11.3453 26 16.5 26C21.6547 26 25.8333 23.0343 25.8333 19.376C25.8333 19.0783 25.8057 18.7852 25.752 18.4979C26.4941 18.0947 27 17.2909 27 16.3651C27 15.0348 25.9553 13.9564 24.6667 13.9564C24.0306 13.9564 23.4539 14.2192 23.033 14.6453C21.4179 13.5217 19.375 12.7556 15.6062 12.7556M12.0931 22.1896C13.3625 23.0632 14.9313 23.5 16.5 23.5C18.0687 23.5 19.6375 23.0632 20.9069 22.1896M14.1667 18.1717C14.1667 19.1694 13.3832 19.9782 12.4167 19.9782C11.4502 19.9782 10.6667 19.1694 10.6667 18.1717C10.6667 17.1739 11.4502 16.3651 12.4167 16.3651C13.3832 16.3651 14.1667 17.1739 14.1667 18.1717ZM22.3333 18.1717C22.3333 19.1694 21.5498 19.9782 20.5833 19.9782C19.6168 19.9782 18.8333 19.1694 18.8333 18.1717C18.8333 17.1739 19.6168 16.3651 20.5833 16.3651C21.5498 16.3651 22.3333 17.1739 22.3333 18.1717Z" />
    </svg>
);

// ─── (SubNav removed — handled by existing site layout) ─────────────────────────

// ─── Hero Section ───────────────────────────────────────────────────────────────

function HeroSection({
    activeTab,
    setActiveTab,
}: {
    activeTab: TabKey;
    setActiveTab: (tab: TabKey) => void;
}) {
    return (
        <section className=" px-4 py-16 md:px-10 md:pt-[100px] pb-5 sm:pb-20 lg:px-[240px]">
            <div className="mx-auto flex max-w-[1240px] flex-col items-center gap-14">
                {/* Title Block */}
                <div className="flex flex-col items-center gap-5">
                    <h1 className="text-center text-3xl font-bold  md:text-4xl lg:text-[56px] lg:leading-[1.15]">
                        Building the People's Supercloud
                    </h1>
                    <p className="max-w-[800px] text-center text-base leading-6 text-[#71717a] dark:text-para md:text-lg">
                        A global community collaboratively managing the future of decentralized cloud computing from code to culture.
                        Whether you are here to learn, deploy, or govern, you belong here.
                    </p>
                </div>

                {/* Join the Movement */}
                <div className="flex w-full flex-col items-center gap-5">
                    <h2 className="text-center text-lg font-semibold ">
                        Join the Movement
                    </h2>
                    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            {
                                icon: MessagesSquareIcon,
                                title: "Connect",
                                desc: "Join a global network of peers to shape decentralized infrastructure.",
                            },
                            {
                                icon: BadgeCheckIcon,
                                title: "Contribute",
                                desc: "Your unique skills move the needle for code, content, and support.",
                            },
                            {
                                icon: CalendarIcon,
                                title: "Attend",
                                desc: "Join virtual sessions or global events to stay at the cutting edge.",
                            },
                            {
                                icon: PeaceHandIcon,
                                title: "Impact",
                                desc: "Help us build a permissionless alternative to cloud giants.",
                            },
                        ].map((card, i) => (
                            <div
                                key={i}
                                className="flex flex-col gap-4 rounded-lg border border-[#e4e4e7] dark:border-defaultBorder p-6"
                            >
                                <div className="flex items-center gap-2">
                                    <card.icon className="h-6 w-6 " />
                                    <span className="text-base font-semibold ">
                                        {card.title}
                                    </span>
                                </div>
                                <p className="text-sm leading-5 text-[#71717a] dark:text-para">{card.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* How do you want to build? - Tab Switcher */}
                <HowToBuildTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
        </section>
    );
}

// ─── Tab Switcher ("How do you want to build?") ────────────────────────────────

type TabKey = "akash-club" | "akash-insiders" | "developers";

const tabs: { key: TabKey; icon: React.FC<{ className?: string }>; label: string; sub: string }[] = [
    { key: "akash-club", icon: HeartHandshakeLargeIcon, label: "Akash Club", sub: "For Enthusiast" },
    { key: "akash-insiders", icon: BadgeCheckLargeIcon, label: "Akash Insiders", sub: "For Experts" },
    { key: "developers", icon: SearchCodeIcon, label: "Developers", sub: "For Builders" },
];

function HowToBuildTabs({
    activeTab,
    setActiveTab,
}: {
    activeTab: TabKey;
    setActiveTab: (tab: TabKey) => void;
}) {
    return (
        <div className="flex w-full flex-col items-center gap-5">
            <h2 className="text-center text-lg font-medium text-[#737373] dark:text-para">
                How do you want to build?
            </h2>
            {/* Tab Pills */}
            <div className="w-full overflow-x-auto rounded-full bg-[#f5f5f7] dark:bg-background2 p-2 scrollbar-hide sm:overflow-x-visible">
                <div className="flex min-w-max items-stretch gap-2 sm:min-w-0 sm:w-full">
                    {tabs.map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`flex shrink-0 sm:flex-1 items-center justify-center gap-4 rounded-full px-6 py-4 transition-all sm:px-10 ${activeTab === tab.key
                                ? "bg-white dark:bg-background shadow-sm"
                                : "hover:bg-white/50 dark:hover:bg-black/10"
                                }`}
                        >
                            <tab.icon
                                className={`h-8 w-8 ${activeTab === tab.key ? "text-[#111111] dark:text-foreground" : "text-[#86868b] dark:text-para"
                                    }`}
                            />
                            <div className="flex flex-col items-start">
                                <span
                                    className={`text-lg font-semibold md:text-2xl ${activeTab === tab.key ? "text-[#111111] dark:text-foreground" : "text-[#86868b] dark:text-para"
                                        }`}
                                >
                                    {tab.label}
                                </span>
                                <span
                                    className={`text-sm ${activeTab === tab.key ? "text-[#737373] dark:text-foreground" : "text-[#86868b] dark:text-para"
                                        }`}
                                >
                                    {tab.sub}
                                </span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

// ─── Quote Section ──────────────────────────────────────────────────────────────

function QuoteSection() {
    return (
        <section className="border-y border-[#e4e4e7] dark:border-defaultBorder bg-[#fafafa] dark:bg-background2 px-4 py-20 md:px-10 md:py-[120px] lg:px-[320px]">
            <div className="mx-auto flex max-w-[1080px] flex-col items-center gap-8">
                <blockquote className="text-center font-instrument italic text-xl  leading-relaxed text-[#111827] dark:text-foreground md:text-3xl lg:text-[48px] lg:leading-[1.3]">
                    "Bull market, bear market, it doesn&apos;t matter.
                    495 open-source contributors averaging 67 commits per week build Akash regardless of market conditions. Akash is the People&apos;s Supercloud and I&apos;m credibly proud of the $AKT community."
                </blockquote>
                <div className="flex flex-col items-center">
                    <p className="text-lg font-semibold text-[#111827] dark:text-foreground">Greg Osuri</p>
                    <p className="text-center text-base text-[#71717a] dark:text-para">
                        Founder of Akash
                        <br />
                        Overclock Labs CEO
                    </p>
                </div>
            </div>
        </section>
    );
}

// ─── Social Channels Section ────────────────────────────────────────────────────

const socialChannels = [
    { name: "Discord", icon: DiscordIcon, href: "https://discord.com/invite/akash" },
    { name: "Github", icon: GithubIcon, href: "https://github.com/akash-network" },
    { name: "X", icon: XIcon, href: "https://x.com/akashnet" },
    { name: "LinkedIn", icon: LinkedInIcon, href: "https://www.linkedin.com/company/akash-network/" },
    { name: "Youtube", icon: YoutubeIcon, href: "https://www.youtube.com/c/AkashNetwork" },
    { name: "Telegram", icon: TelegramIcon, href: "https://t.me/AkashNW" },
    { name: "Zealy", icon: ZealyIcon, href: "https://zealy.io/c/akashnetwork" },
    { name: "Reddit", icon: RedditIcon, href: "https://www.reddit.com/r/AkashNetwork/" },
];

function SocialChannelsSection() {
    return (
        <section className="border-y border-[#e5e5e5] dark:border-defaultBorder  px-4 py-20 md:px-10 md:py-[120px] lg:px-[240px]">
            <div className="mx-auto flex max-w-[1240px] flex-col gap-20 lg:flex-row lg:gap-20">
                {/* Left: Title */}
                <div className="flex flex-col gap-3 lg:w-1/2">
                    <h2 className="text-3xl font-semibold text-[#111827] dark:text-foreground md:text-[40px] md:leading-[1.2]">
                        Explore Social Channels
                    </h2>
                    <p className="text-sm leading-5 text-[#71717a]">
                        Be part of the Akash Network community. Connect, contribute, and collaborate to shape the future of decentralized cloud computing.
                    </p>
                </div>

                {/* Right: Channel Cards */}
                <div className="flex flex-col gap-6 lg:w-1/2">
                    {socialChannels.map((channel, i) => (
                        <a
                            key={i}
                            href={channel.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between rounded-lg border border-[#e4e4e7] dark:border-defaultBorder px-5 py-6 transition-colors hover:shadow-lg"
                        >
                            <div className="flex items-center gap-3">

                                <channel.icon className="h-8 w-8 " />

                                <span className="text-base font-medium ">
                                    {channel.name}
                                </span>
                            </div>
                            <ChevronRightIcon className="h-6 w-6 " />
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ─── FAQ Section ────────────────────────────────────────────────────────────────

const faqItems = [
    {
        question: "Do I have to contribute to join Akash Club?",
        answer:
            "No. We'd love every member to contribute, but we understand not everyone has the time. Everyone is welcome to join our events, learn alongside us, and connect with the core community without completing contribution missions.",
    },
    {
        question: "What if I'm not technical?",
        answer:
            "Perfect. We need content creators, community advocates, social media voices, and people who can explain Akash to non-technical audiences. Technical contributions are important, but so is everything else that drives adoption.",
    },
    {
        question: "Can I contribute if I'm not part of Akash Club?",
        answer: `Content contributions are reserved for Akash Insiders, who receive proper training before creating materials for the network. We induct new Insiders four times a year.\nClick here to join our start-list.\n\nTechnical contributions are open to all developers. We provide optional training modules to help you get up to speed and fill in any gaps you may have missed surrounding the Akash ecosystem.\n\nSocial campaigns (rewarded with Club Points) are open to all Club members through Discord.\nPoints can be redeemed to purchase additional raffle tickets, and/or cool Akash swag from the official shop.`,
    },
];

function FAQSection() {
    return (
        <section className="px-4 py-20 md:px-10 md:py-[120px] lg:px-[400px]">
            <div className="mx-auto max-w-[913px]">
                <h2 className="mb-12 text-center text-2xl font-bold  md:text-[36px]">
                    Frequently asked questions
                </h2>
                <Accordion type="single" collapsible className="w-full">
                    {faqItems.map((item, i) => (
                        <AccordionItem
                            key={i}
                            value={`faq-${i}`}
                            className="border-b border-[#e5e5e5] dark:border-defaultBorder"
                        >
                            <AccordionTrigger className="flex w-full cursor-pointer items-center justify-between py-4 text-left text-base font-medium  no-underline">
                                <span>{item.question}</span>
                            </AccordionTrigger>
                            <AccordionContent className="pb-4 text-sm leading-5 text-[#737373] dark:text-para whitespace-pre-line">
                                {item.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
}

// ─── CTA Section ────────────────────────────────────────────────────────────────

function CTASection() {
    return (
        <section className="border-t border-[#e4e4e7] dark:border-defaultBorder px-4 py-20 md:px-10 md:py-[180px] lg:px-[240px]">
            <div className="mx-auto flex max-w-[1240px] flex-col items-center gap-8 md:gap-[60px]">
                <div className="flex flex-col items-center gap-8">
                    <div className="flex flex-col items-center gap-3">
                        <h2 className="text-center text-3xl font-bold text-[#111827] dark:text-foreground md:text-[48px] md:leading-[1.15]">
                            The Supercloud is waiting.
                        </h2>
                        <p className="text-center text-lg text-[#71717a] dark:text-para">
                            Where will you start?
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <a
                            href="https://discord.com/invite/akash"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-lg bg-[#f5f5f5] dark:bg-background2 px-4 py-2 text-sm font-medium text-[#171717] dark:text-foreground transition-colors hover:bg-[#ebebeb]"
                        >
                            Join the Akash Club
                            <ArrowUpRightIcon className="h-4 w-4" />
                        </a>
                        <a
                            href="https://akashnet.typeform.com/to/PXpRWgfD?typeform-source=akash.network"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-lg bg-[#f5f5f5] dark:bg-background2 px-4 py-2 text-sm font-medium text-[#171717] dark:text-foreground transition-colors hover:bg-[#ebebeb]"
                        >
                            Apply to Insiders
                            <ArrowUpRightIcon className="h-4 w-4" />
                        </a>
                    </div>
                </div>
                <p className="max-w-[859px] text-center text-sm leading-6 text-[#71717a] dark:text-para">
                    Note: Technical contributions on GitHub are always open to everyone.
                    <br />
                    However, access to paid content bounties and official training is reserved for the Insider program.
                </p>
            </div>
        </section>
    );
}

// ─── Main Component ─────────────────────────────────────────────────────────────

function TabContent({ activeTab }: { activeTab: TabKey }) {
    switch (activeTab) {
        case "akash-club":
            return <AkashClubContent />;
        case "akash-insiders":
            return <AkashInsidersContent />;
        case "developers":
            return <DevelopersContent />;
        default:
            return <AkashClubContent />;
    }
}

export default function CommunityWelcome() {
    const [activeTab, setActiveTab] = useState<TabKey>("akash-club");

    return (
        <div className="flex flex-col">
            <HeroSection activeTab={activeTab} setActiveTab={setActiveTab} />
            <TabContent activeTab={activeTab} />
            <QuoteSection />
            <SocialChannelsSection />
            <FAQSection />
            <CTASection />
        </div>
    );
}
