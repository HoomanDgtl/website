import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../ui/accordion";

import {
  DiscordIcon,
  GithubIcon,
  InstagramIcon,
  LinkedInIcon,
  TelegramIcon,
  TwitterIcon,
  YoutubeIcon,
  RedditIcon,
} from "../header/icons";

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

// ─── Quote Section ──────────────────────────────────────────────────────────────

function QuoteSection() {
    return (
        <section className="border-y border-[#e4e4e7] dark:border-defaultBorder bg-[#fafafa] dark:bg-background2 px-4 py-20 md:px-10 md:py-[120px]">
            <div className="mx-auto flex max-w-6xl flex-col items-center gap-8">
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
    { name: "X", icon: TwitterIcon, href: "https://x.com/akashnet" },
    { name: "LinkedIn", icon: LinkedInIcon, href: "https://www.linkedin.com/company/akash-network/" },
    { name: "Youtube", icon: YoutubeIcon, href: "https://www.youtube.com/c/AkashNetwork" },
    { name: "Telegram", icon: TelegramIcon, href: "https://t.me/AkashNW" },
    // { name: "Zealy", icon: ZealyIcon, href: "https://zealy.io/c/akashnetwork" },
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

export default function AkashInsidersContent() {
    return (
        <>
        <section className="px-4 py-10 md:px-10 md:py-10 lg:px-[240px] lg:py-10">
            <div className="mx-auto flex max-w-[1240px] flex-col gap-12 lg:flex-row lg:gap-20">
                {/* Left: Content */}
                <div className="flex flex-col gap-12 lg:w-1/2">
                    {/* Intro */}
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-3">
                            <p className="text-base text-[#71717a] dark:text-para">Step Into Leadership</p>
                            <h2 className="text-2xl font-semibold text-[#09090b] dark:text-foreground md:text-[32px] md:leading-10">
                                Step Into a Leadership Role as an Akash Insider
                            </h2>
                        </div>
                        <p className="text-base leading-6 font-semibold text-[#0a0a0a] dark:text-foreground">
                            Join a vetted group of community vanguards who solve real-world problems and drive the growth of the Supercloud.
                        </p>
                        <p className="text-base leading-6 text-[#71717a] dark:text-para">
                            This is a high-impact, reward-heavy path for those ready to commit to the mission of the open-source Supercloud.
                        </p>
                    </div>

                    {/* The Three Paths of Contribution */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-xl font-semibold text-[#0a0a0a]">
                            The Three Paths of Contribution
                        </h3>
                        <div className="flex flex-col gap-10 rounded-md border border-[#e5e5e5] dark:border-defaultBorder p-6">
                            {[
                                {
                                    emoji: "👨‍💻",
                                    title: "Path 1: Technical Vanguard",
                                    desc: "Solve UX issues, improve documentation, and close GitHub tickets to support core protocol development.",
                                },
                                {
                                    emoji: "📐",
                                    title: "Path 2: Content Architect",
                                    desc: "Produce high-fidelity video tutorials, guides, and explainers that simplify the Supercloud for the world.",
                                },
                                {
                                    emoji: "📣",
                                    title: "Path 3: Community Advocate",
                                    desc: "Lead social campaigns, host workshops, and manage community challenges to bring new builders into the ecosystem.",
                                },
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-4">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-[#e4e4e7] dark:border-defaultBorder">
                                        <span className="text-2xl">{item.emoji}</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <h4 className="text-lg font-semibold text-[#11181c] dark:text-foreground md:text-xl">
                                            {item.title}
                                        </h4>
                                        <p className="text-sm text-[#71717a] dark:text-para md:text-base">
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Exclusive Insider Perks */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-xl font-semibold text-[#0a0a0a]">
                            Exclusive Insider Perks
                        </h3>
                        <div className="flex flex-col gap-10 rounded-md border border-[#e5e5e5] dark:border-defaultBorder p-6">
                            {[
                                {
                                    emoji: "🎯",
                                    title: "The Private Bounty Board",
                                    desc: "Gain exclusive access to a monthly list of paid opportunities across multiple skill sets rewarded in $AKT.",
                                },
                                {
                                    emoji: "🃏",
                                    title: "Insider Poker Nights",
                                    desc: "Network with core team members and fellow Insiders in monthly poker tournaments with $AKT prizes.",
                                },
                                {
                                    emoji: "✨",
                                    title: "The VIP Multiplier",
                                    desc: "Receive automatic free entry into all monthly community raffles and gain early access to network features.",
                                },
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-4">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-[#e4e4e7] dark:border-defaultBorder">
                                        <span className="text-2xl">{item.emoji}</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <h4 className="text-lg font-semibold text-[#11181c] dark:text-foreground md:text-xl">
                                            {item.title}
                                        </h4>
                                        <p className="text-sm text-[#71717a] dark:text-para md:text-base">
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right: Image + Button */}
                <div className="flex flex-col items-center lg:w-1/2">
                    <div className="sticky top-24 flex flex-col items-center">
                        <div className="flex aspect-[578/596] w-full items-center justify-center overflow-hidden rounded-[20px] border border-[#e4e4e7] bg-gray-100 dark:bg-background2 dark:border-defaultBorder">
                            <img src="/images/welcome/insiders.png" alt="Akash Insiders Hero" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex justify-center py-5">
                            <a
                                href="https://akashnet.typeform.com/to/PXpRWgfD?typeform-source=akash.network"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-lg bg-[#f5f5f5] dark:bg-background2 px-8 py-2.5 text-sm font-medium text-[#171717] dark:text-foreground transition-colors hover:bg-[#ebebeb]"
                            >
                                Apply to Insiders
                                <ArrowUpRightIcon className="h-4 w-4" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <QuoteSection />
        <SocialChannelsSection /> 
        </>
    );
}
