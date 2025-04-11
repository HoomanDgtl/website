import { useState } from "react";
import { acc2025 } from "./acc-2025";

const Location = () => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <a
      className="group flex flex-col md:flex-row"
      href={acc2025.map}
      target="_blank"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="relative w-full max-w-[758px] overflow-hidden">
        <img
          src="/images/acc-2025/map.png"
          alt="Akash Accelerate 2025 Location"
          className={`relative z-[1] w-full  transform transition-all duration-500 ease-in-out ${isHovering ? " opacity-0" : " opacity-100"}`}
        />
        <img
          src="/images/acc-2025/map-hover.png"
          alt="Akash Accelerate 2025 Location Highlighted"
          className={`absolute inset-0 z-[2] w-full  transform transition-all duration-500 ease-in-out ${isHovering ? " opacity-100" : " opacity-0"}`}
        />
      </div>
      <div className="flex w-full flex-col gap-5 bg-[#1E1E1E] px-4 py-10 md:gap-10 md:p-10">
        <div className="flex flex-col gap-3">
          <svg
            viewBox="0 0 60 61"
            className="size-10 lg:size-[60px]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="30"
              cy="30"
              r="30"
              transform="matrix(1.19249e-08 -1 -1 -1.19249e-08 60 60.7766)"
              fill="#FAB215"
            ></circle>
            <path
              d="M40.4705 43.2345L40.4945 38.3104L25.6741 38.3104L43.6772 20.3073L40.0982 16.7283L22.0951 34.7314L22.1071 19.923L17.171 19.935V43.2345L40.4705 43.2345Z"
              fill="white"
            ></path>
          </svg>
          <h2 className="text-4xl font-semibold leading-[1.2] transition-all duration-500 group-hover:underline lg:text-5xl">
            74Wythe <br /> Williamsburg
            <br /> NYC
          </h2>
        </div>
        <h3 className="font-jetBrainsMono md:text-xl lg:text-2xl">
          June 23rd <br /> 9:30-6:30pm
        </h3>
      </div>
    </a>
  );
};

export default Location;
