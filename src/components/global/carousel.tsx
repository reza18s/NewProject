// ImageCarousel.tsx
import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Autoplay, Navigation, Pagination } from "swiper/modules";

interface ImageCarouselProps {
  images: string[];
}

const ImageCarousel: FC<ImageCarouselProps> = ({ images }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={10}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 2500, disableOnInteraction: false }}
      loop
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <img
            className="h-40 w-full object-cover md:h-60"
            src={image}
            alt={`Slide ${index + 1}`}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageCarousel;
