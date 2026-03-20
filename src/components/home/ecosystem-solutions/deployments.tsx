

export default function Deployments({ projects }: { projects: any[] }) {
  const visibleProjects = projects.slice(0, 6);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleProjects.map((project, i) => (
          <Card key={i} project={project} />
        ))}
      </div>

      <div className="flex justify-center mt-10 pb-20">
        <a
          href="/ecosystem/deployed-on-akash/"
          className="px-5 py-2 text-sm rounded-full border border-[#E4E4E7] dark:border-white/20 bg-[#F5F5F5] dark:bg-white/5 hover:bg-[#eeeeee] hover:dark:bg-white/10 transition flex gap-2 items-center justify-center group"
        >
          <span>View More Projects</span>
          <svg className="shrink-0 translate-y-px transition-transform duration-300 group-hover:-rotate-45" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.33398 8.00016H12.6673M12.6673 8.00016L8.00065 3.3335M12.6673 8.00016L8.00065 12.6668" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
    </div>
  );
}

/* ---------- CARD ---------- */

function Card({ project }: { project: any }) {
  const cardContent = (
    <div className="rounded-[20px] border border-[#E4E4E7] dark:border-[#2C2C2E] bg-[#F5F5F7] dark:bg-[#181819] p-4 h-full transition-all duration-300 hover:shadow-md dark:hover:bg-[#1c1c1d]">

      <div className="rounded-[14px] overflow-hidden mb-4 bg-white dark:bg-black">
        <img
          src={project.data.projectImage.src}
          alt={project.data.projectTitle}
          className="w-full h-auto object-cover"
        />
      </div>

      <h3 className="text-base md:text-lg font-semibold mt-6">
        {project.data.projectTitle}
      </h3>

      <p className="text-xs md:text-sm text-[#7E868C] mt-4 line-clamp-2">
        {project.data.description}
      </p>

      {/* {project.data.websiteLink && (
        <a
          href={project.data.websiteLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex gap-2 items-center justify-center text-xs px-3 py-2 font-medium rounded-full text-[#171717] bg-white hover:brightness-110 transition-all duration-300 cursor-pointer"
        >
          View More 
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.66602 4.6665H11.3327M11.3327 4.6665V11.3332M11.3327 4.6665L4.66602 11.3332" stroke="currentColor" stroke-width="1.33" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>

        </a>
      )} */}
    </div>
  );

  if (project.data.websiteLink) {
    return (
      <a 
        href={project.data.websiteLink} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="block h-full group"
      >
        {cardContent}
      </a>
    );
  }

  return cardContent;
}