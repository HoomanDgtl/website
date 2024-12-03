import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

const images = [
  "/images/slides/slide1.png",
  "/images/slides/slide2.png",
  "/images/slides/slide3.png",
  "/images/slides/slide4.png",
  "/images/slides/slide5.png",
  "/images/slides/slide6.png",
  "/images/slides/slide7.png",
  "/images/slides/slide8.png",
];

const Carousel = () => {
  return (
    <div className="swiper-linear relative mt-[-24px] w-full overflow-hidden bg-background md:mt-[-50px]">
      <div className="absolute inset-0 z-[2] hidden bg-gradient-to-r  from-background from-0%  to-transparent to-15% md:block "></div>
      <div className="absolute inset-0 z-[2] hidden bg-gradient-to-l  from-background from-0%  to-transparent to-15% md:block "></div>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView="auto"
        loop={true}
        centeredSlides={true}
        speed={4000}
        freeMode={true}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        breakpoints={{
          640: {
            spaceBetween: 30,
          },

          1024: {
            spaceBetween: 40,
          },
        }}
        className="w-full"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index} className="w-full md:!w-auto">
            <div className="mx-3  md:mx-5 lg:mx-[28px]">
              <img
                src={src}
                alt={`Image ${index + 1}`}
                height={380}
                width={260}
                className="aspect-video h-full w-full rounded-md object-contain  md:aspect-auto md:object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
