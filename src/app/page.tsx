"use client";

import "swiper/css";
import "swiper/css/pagination";

import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import Image from "next/image";
import gam1 from "./assets/gambar.jpg";
import gam8 from "./assets/gambarkedelapan.jpg";
import gam2 from "./assets/gambarkedua.jpg";
import gam4 from "./assets/gambarkeempat.jpg";
import gam6 from "./assets/gambarkeenam.jpg";
import gam5 from "./assets/gambarkelima.jpg";
import gam3 from "./assets/gambarketiga.jpg";
import gam7 from "./assets/gambarketujuh.jpg";
import Body from './components/(main-page)/body';
import Footer from './components/(main-page)/footer';

export default function Home() {
  
  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold text-center">
         Selamat Datang di Website
         <span className=""> UPT SMP Negeri 10 TAPUNG</span>
      </h1>

      <Swiper
        className="w-full"
        modules={[Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
      >
        <SwiperSlide>
          <div className="w-full h-[900px]">
            <Image src={gam1} alt="Gambar 1" layout="fill" objectFit="cover" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-[900px]">
            <Image src={gam2} alt="Gambar 2" layout="fill" objectFit="cover" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-[900px]">
            <Image src={gam3} alt="Gambar 3" layout="fill" objectFit="cover" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-[900px]">
            <Image src={gam4} alt="Gambar 4" layout="fill" objectFit="cover" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-[900px]">
            <Image src={gam5} alt="Gambar 5" layout="fill" objectFit="cover" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-[900px]">
            <Image src={gam6} alt="Gambar 6" layout="fill" objectFit="cover" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-[900px]">
            <Image src={gam7} alt="Gambar 7" layout="fill" objectFit="cover" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-[900px]">
            <Image src={gam8} alt="Gambar 8" layout="fill" objectFit="cover" />
          </div>
        </SwiperSlide>
      </Swiper>
    <Body />
      <Footer />
    </div>
  );
}
