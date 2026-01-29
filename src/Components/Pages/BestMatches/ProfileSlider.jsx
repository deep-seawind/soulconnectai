import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoChevronBack, IoShareSocial, IoLocationSharp } from "react-icons/io5";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";

const ProfileSlider = ({ data, onBack }) => {
  const [swiperInstance, setSwiperInstance] = useState(null);

  return (
    <div className="relative w-full lg:w-1/2 h-[70vh] lg:h-screen lg:sticky lg:top-0 overflow-hidden group">
      {/* Swiper */}

      <Swiper
        modules={[Pagination, Autoplay]}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{ clickable: true }}
        onSwiper={setSwiperInstance}
        className="w-full h-full"
      >
        {data.images.map((img, idx) => (
          <SwiperSlide key={idx}>
            <img
              src={img}
              alt={`${data.name}-${idx}`}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Previous Button */}
      <button
        onClick={() => swiperInstance?.slidePrev()}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20
                   flex h-14 w-14 items-center justify-center
                   rounded-full bg-color 
                   shadow-xl transition-all duration-300
                    hover:scale-110
                   opacity-0 group-hover:opacity-100"
      >
        <FiChevronLeft size={22} />
      </button>

      {/* Next Button */}
      <button
        onClick={() => swiperInstance?.slideNext()}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20
                   flex h-14 w-14 items-center justify-center
                   rounded-full bg-color 
                   shadow-xl transition-all duration-300
                    hover:scale-110
                   opacity-0 group-hover:opacity-100"
      >
        <FiChevronRight size={22} />
      </button>

      {/* Back Button */}
      <Link to="/best-matches">
        <button
          onClick={onBack}
          className="absolute top-8 left-8 z-30 p-4
                     bg-white/20 backdrop-blur-xl
                     border border-white/30
                     rounded-2xl text-white shadow-2xl
                     hover:scale-105 transition-transform"
        >
          <IoChevronBack size={24} />
        </button>
      </Link>

      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent lg:hidden" />

      {/* Share */}
      <div className="absolute top-8 right-8 z-30">
        <button
          className="p-4 bg-white/10 backdrop-blur-xl
                     border border-white/20
                     rounded-2xl text-white shadow-2xl
                     hover:bg-white/20 transition-all"
        >
          <IoShareSocial size={20} />
        </button>
      </div>

      {/* Mobile Name */}
      <div className="absolute bottom-10 left-10 lg:hidden text-white z-30">
        <h1 className="text-5xl font-black tracking-tighter">
          {data.name}, {data.age}
        </h1>
        <div className="flex items-center gap-2 mt-2 opacity-80">
          <IoLocationSharp />
          <span className="font-bold uppercase text-xs tracking-widest">
            {data.location}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileSlider;
