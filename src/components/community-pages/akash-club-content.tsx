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

                                <channel.icon className="h-8 w-8" />

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

export default function AkashClubContent() {
    return (
        <>
        <section className="px-4 py-10 md:px-10 md:py-10 lg:px-[240px] lg:py-10">
            <div className="mx-auto flex max-w-[1240px] flex-col gap-12 lg:flex-row lg:gap-20">
                {/* Left: Image + Button */}
                <div className="flex flex-col items-center lg:w-1/2">
                    <div className="sticky top-24">
                        <div className="flex aspect-[580/596] w-full items-center justify-center overflow-hidden rounded-[20px] border border-[#e4e4e7] dark:border-defaultBorder bg-gray-100">
                            <img src="/images/welcome/club.png" alt="Akash Club Hero" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex justify-center py-5">
                            <a
                                href="https://discord.com/invite/akash"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-lg bg-[#f5f5f5] dark:bg-background2 px-8 py-2.5 text-sm font-medium text-[#171717] dark:text-foreground transition-colors hover:bg-[#ebebeb]"
                            >
                                Join the Club &amp; Start Building
                                <ArrowUpRightIcon className="h-4 w-4" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Right: Content */}
                <div className="flex flex-col gap-12 lg:w-1/2">
                    {/* Intro */}
                    <div className="flex flex-col gap-4">
                        <p className="text-base text-para">The Official Community Hub</p>
                        <h2 className="text-2xl font-semibold  md:text-[32px] md:leading-10">
                            Shape the Supercloud with Akash Club
                        </h2>
                        <p className="text-base leading-6 text-para font-normal">
                            Akash Club is the official community hub where builders and $AKT enthusiasts collaborate to drive the network forward. Gain insider access to core development, earn rewards for participation, and build with conviction alongside the architects of the Supercloud.
                        </p>
                    </div>

                    {/* Learn Section */}
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col">
                            <h3 className="text-xl font-semibold text-[#11181c]">
                                Learn: Weekly Sessions &amp; Trivia
                            </h3>
                            <p className="mt-1 text-base text-[#687076] dark:text-para">
                                Move beyond price speculation and master the fundamentals of decentralized infrastructure.
                            </p>
                        </div>
                        <div className="flex flex-col gap-8 rounded-md border border-[#e5e5e5] dark:border-defaultBorder p-6">
                            {[
                                {
                                    emoji: "🗓️",
                                    title: "Deep Dives into Akash Progress:",
                                    desc: "Join deep dives into the technical roadmap and future protocol upgrades.",
                                },
                                {
                                    emoji: "🏅",
                                    title: "AMAs with Core Team Members:",
                                    desc: "Test your ecosystem knowledge in live challenges to win $AKT rewards.",
                                },
                                {
                                    emoji: "💭",
                                    title: "Workshops using Akash:",
                                    desc: "Move from passive learning to active contribution by collaborating on real network projects.",
                                },
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-4">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-[#e4e4e7]  dark:border-defaultBorder">
                                        <span className="text-2xl">{item.emoji}</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <h4 className="text-lg font-semibold text-[#11181c]  dark:text-foreground md:text-xl">
                                            {item.title}
                                        </h4>
                                        <p className="text-sm text-para md:text-base">
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Earn Section */}
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col">
                            <h3 className="text-xl font-semibold text-[#11181c]">
                                Earn: The Community Reward Stack
                            </h3>
                            <p className="mt-1 text-base text-[#687076] dark:text-para">
                                Hear directly from the people building the protocol.
                            </p>
                        </div>
                        <div className="flex flex-col gap-8 rounded-md border border-[#e5e5e5] dark:border-defaultBorder p-6">
                            {[
                                {
                                    emoji: "🌠",
                                    title: "Akash Club NFT:",
                                    desc: "Mint a unique annual collectible that serves as a permanent record of your journey and contributions to the roadmap.",
                                },
                                {
                                    emoji: "🎟️",
                                    title: "Monthly $AKT Raffle:",
                                    desc: "Our raffle is merit-based. You earn entries by attending events and actively participating, never by purchasing.",
                                },
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-4">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-[#e4e4e7] dark:border-defaultBorder">
                                        <span className="text-2xl">{item.emoji}</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <h4 className="text-lg font-semibold text-[#11181c]  dark:text-foreground md:text-xl">
                                            {item.title}
                                        </h4>
                                        <p className="text-sm text-para md:text-base">
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Club Game Nights */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-xl font-semibold text-[#11181c] dark:text-foreground">
                            Club Game Nights &amp; Trivia
                        </h3>
                        <div className="rounded-md border border-[#e5e5e5] dark:border-defaultBorder p-8">
                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-[#e4e4e7] dark:border-defaultBorder">
                                    <span className="text-2xl">🎮</span>
                                </div>
                                <div className="flex flex-col">
                                    <h4 className="text-lg font-semibold text-[#11181c] dark:text-foreground md:text-xl">
                                        Network with our Community
                                    </h4>
                                    <p className="mt-1 text-sm text-[#687076] dark:text-para md:text-base">
                                        Visit our Akash Passage world hosted on Akash GPUs to meet others passionate about Akash.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <QuoteSection />
        <SocialChannelsSection />            
        <FAQSection />
        </>
    );
}
