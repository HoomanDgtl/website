import { acc2025 } from "@/components/acc-2025/acc-2025";
import { ArrowUpCircle } from "lucide-react";
import { useEffect, useState } from "react";

const Recap = () => {
  const [isOpen, setIsOpen] = useState(true);
  const videoId = acc2025.youtube.split("v=")[1];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      <a
        href={acc2025.youtube}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => setIsOpen(true)}
        className="flex w-full items-center justify-center bg-[#272626] py-3.5 font-jetBrainsMono text-lg text-white transition-all hover:bg-[#8A8A8A]"
      >
        <ArrowUpCircle className="mr-2 size-5 rotate-45 md:size-6" />
        Watch the 2024 Recap
      </a>

      <div
        className={`fixed inset-0 z-50 bg-black/50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsOpen(false)}
      />

      <div
        className={`fixed left-1/2 top-1/2 z-50 w-[90%] max-w-4xl -translate-x-1/2 -translate-y-1/2 transform transition-all duration-300 ${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <div className="relative aspect-video w-full overflow-hidden rounded-xl">
          {/* <button
            onClick={() => setIsOpen(false)}
            className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
          >
            <X className="size-5" />
          </button> */}
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>
      </div>
    </>
  );
};

export default Recap;
