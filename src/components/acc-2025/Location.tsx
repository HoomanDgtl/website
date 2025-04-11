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
      <div className="relative w-full flex-1 overflow-hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.804551508223!2d-73.9578208!3d40.7223189!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25981a9364305%3A0x183e815910875204!2s74Wythe!5e0!3m2!1sen!2sin!4v1744373270939!5m2!1sen!2sin"
          width="100%"
          height="550"
          loading="lazy"
        ></iframe>
      </div>
      <div className="flex  w-full flex-1 flex-col gap-5 bg-[#1E1E1E] px-4 py-10 md:gap-10 md:p-10">
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
