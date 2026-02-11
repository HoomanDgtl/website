import React from "react";

// ─── Icon Components ───────────────────────────────────────────────────────────

const ArrowUpRightIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 7h10v10" />
        <path d="M7 17 17 7" />
    </svg>
);

const ZapIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
    </svg>
);

const RocketIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
);

const DollarSignIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" x2="12" y1="2" y2="22" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
);

// ─── Feature data ──────────────────────────────────────────────────────────────

const leftFeatures = [
    {
        emoji: "🦾",
        title: "High-Performance GPUs",
        desc: "Access premier NVIDIA chips for AI training, rendering, and data processing at a fraction of the cost of legacy providers.",
    },
    {
        emoji: "⚡️",
        title: "Deploy in Seconds",
        desc: "Use the Akash Console or Command Line Interface to launch apps globally in a few clicks.",
    },
    {
        emoji: "🌎",
        title: "Provider Ecosystem",
        desc: "Choose from a diverse network of infrastructure providers to find the exact hardware specs your application requires.",
    },
];

const consoleFeatures = [
    {
        icon: ZapIcon,
        title: "Generous Free Trial",
        desc: "$100 of cloud compute credits so you can test real workloads.",
    },
    {
        icon: RocketIcon,
        title: "Optimized for AI/ML",
        desc: "Container native with a library of templates for leading open source AI models and applications.",
    },
    {
        icon: DollarSignIcon,
        title: "Cost Savings",
        desc: "The most competitive prices for GPUs on-demands, anywhere on the internet.",
    },
];

// ─── Main Component ────────────────────────────────────────────────────────────

export default function DevelopersContent() {
    return (
        <section className="px-4 py-10 md:px-10 md:py-10 lg:px-[320px] lg:py-10">
            <div className="mx-auto flex max-w-[1080px] flex-col items-center gap-6">
                {/* Header */}
                <div className="flex flex-col items-center gap-4">
                    <h2 className="text-center text-2xl font-bold text-[#09090b] md:text-[32px] md:leading-10">
                        Power Your Applications with Decentralized Compute
                    </h2>
                    <p className="max-w-[1080px] text-center text-base leading-6 text-[#71717a]">
                        Akash Network provides high-performance GPU and CPU power for the next generation of decentralized applications.
                        Stop overpaying for centralized cloud monopolies and start building on the permissionless Supercloud.
                    </p>
                </div>

                {/* Buttons */}
                <div className="flex flex-wrap items-center justify-center gap-4 py-6">
                    <a
                        href="#"
                        className="inline-flex items-center gap-2 rounded-lg bg-[#171717] px-8 py-2.5 text-sm font-medium text-[#fafafa] transition-colors hover:bg-[#333]"
                    >
                        Deploy Now on Console
                        <ArrowUpRightIcon className="h-4 w-4" />
                    </a>
                    <a
                        href="#"
                        className="inline-flex items-center gap-2 rounded-lg bg-[#f5f5f5] px-8 py-2.5 text-sm font-medium text-[#171717] transition-colors hover:bg-[#ebebeb]"
                    >
                        View Documentation
                        <ArrowUpRightIcon className="h-4 w-4" />
                    </a>
                </div>

                {/* Two-column layout */}
                <div className="flex w-full flex-col gap-6 lg:flex-row">
                    {/* Left: Feature list */}
                    <div className="flex flex-col gap-10 rounded-md border border-[#e5e5e5] p-6 lg:w-1/2">
                        {leftFeatures.map((item, i) => (
                            <div key={i} className="flex items-start gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-[#e4e4e7]">
                                    <span className="text-2xl">{item.emoji}</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <h4 className="text-lg font-semibold text-[#11181c] md:text-xl">
                                        {item.title}
                                    </h4>
                                    <p className="text-sm text-[#71717a] md:text-base">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right: Dark Console card */}
                    <div className="flex flex-col gap-8 rounded-md bg-[#232323] p-8 lg:w-1/2 lg:px-[72px] lg:py-8">
                        {/* Console Logo / Title */}
                        <div className="flex flex-col gap-2">
                            {/* ADD IMAGE HERE: Replace with Akash Console logo SVG */}
                            <p className="text-sm text-gray-500">[ Add image here — Akash Console logo ]</p>
                            <p className="text-lg text-white">
                                The fastest way to deploy apps on Akash
                            </p>
                        </div>

                        {/* Console features */}
                        <div className="flex flex-col gap-6">
                            {consoleFeatures.map((item, i) => (
                                <div key={i} className="flex items-start gap-5">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#e5e5e5]">
                                        <item.icon className="h-5 w-5 text-white" />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <h4 className="text-base font-semibold text-[#fafafa]">
                                            {item.title}
                                        </h4>
                                        <p className="text-base text-[#f5f5f5]">
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
