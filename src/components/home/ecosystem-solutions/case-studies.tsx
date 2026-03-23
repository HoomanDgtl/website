import React from "react";

interface CaseStudy {
  icon: string;
  title: string;
  description: string;
  link: string;
}

interface CaseStudiesProps {
  caseStudies: CaseStudy[];
}

export default function CaseStudies({ caseStudies }: CaseStudiesProps) {
  return (
    <section className="w-full pb-20">
      <div className="">
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {caseStudies.map((study, index) => (
            <div
              key={index}
              className="rounded-[20px] bg-[#F5F5F7] dark:bg-[#181819] border border-[#E4E4E7] dark:border-white/10 p-6 flex flex-col h-full"
            >
              {/* Icon */}
              <div
                className="aspect-square w-[64px] flex items-center justify-center overflow-hidden"
                dangerouslySetInnerHTML={{ __html: study.icon }}
              />

              <div className="my-5 space-y-3 grow">
                <h3 className="text-lg font-semibold leading-snug line-clamp-2">
                  {study.title}
                </h3>

                <p className="text-sm text-[#7E868C] leading-relaxed line-clamp-3">
                  {study.description}
                </p>
              </div>

              <a
                href={study.link}
                className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 px-4 py-2 text-sm text-[#171717] dark:text-white transition-all duration-300 hover:bg-black/5 dark:hover:bg-white/5 w-fit mt-auto group"
              >
                <span className="font-medium">Read More</span>

                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path
                    d="M9 6L15 12L9 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <a
            href="/case-studies/"
            className="px-5 py-2 text-sm rounded-full border border-[#E4E4E7] dark:border-white/20 bg-[#F5F5F5] dark:bg-white/5 hover:bg-white hover:dark:bg-white/10 transition flex gap-2 items-center justify-center group"
          >
            <span className="text-[#1D1D1F] dark:text-white">View All Case Studies</span>
            <svg className="shrink-0 translate-y-px transition-transform duration-300 group-hover:-rotate-45 text-[#1D1D1F] dark:text-white" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.33398 8.00016H12.6673M12.6673 8.00016L8.00065 3.3335M12.6673 8.00016L8.00065 12.6668" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
