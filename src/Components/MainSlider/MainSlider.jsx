import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import slider1 from "../../assets/images/slider-image-1.jpeg";
import slider2 from "../../assets/images/slider-image-2.jpeg";
import slider3 from "../../assets/images/slider-image-3.jpeg";
import 'swiper/css';
export default function MainSlider() {
  return <>
     <div className='d-flex justify-content-center'>
            <Swiper
    
      spaceBetween={0}
      slidesPerView={1}
      autoplay={true}
        
        >
      <SwiperSlide><img src={slider1} alt="" /> </SwiperSlide>
      <SwiperSlide><img src={slider2} alt="" /> </SwiperSlide>
      <SwiperSlide><img src={slider3} alt="" /> </SwiperSlide>
         
          
        </Swiper>
     </div>
  
  </>
}
