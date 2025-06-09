import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const NYCCarousel: React.FC = () => {
  const images = [
    {
      src: "/images/acc-2025/nyc.png",
      alt: "NYC Event Rooftop View 1",
    },
    {
      src: "/images/acc-2025/nyc2.png",
      alt: "NYC Event Rooftop View 2",
    },
  ];

  const swiperRef = React.useRef<SwiperType>();

  return (
    <div className="relative h-full w-full">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{
          clickable: true,
          el: ".swiper-pagination",
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="h-full w-full"
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full">
              <img
                src={image.src}
                alt={image.alt}
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <button
        onClick={() => swiperRef.current?.slidePrev()}
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-[#2E2E2E] bg-[#232323] p-3 shadow-lg transition-all duration-200 hover:bg-[#2E2E2E] hover:shadow-xl"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>

      <button
        onClick={() => swiperRef.current?.slideNext()}
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-[#2E2E2E] bg-[#232323] p-3 shadow-lg transition-all duration-200 hover:bg-[#2E2E2E] hover:shadow-xl"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>

      {/* Custom Pagination */}
      <div className="swiper-pagination absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 space-x-2"></div>
    </div>
  );
};

export default NYCCarousel;
