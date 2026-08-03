import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
export default function CategorySlider() {

        const [categories, setCategories] = useState([]);
  
  
  
  
    async function getCategories(){
    let {data} = await  axios.get("https://ecommerce.routemisr.com/api/v1/categories")
    setCategories(data.data)
    }
  
    useEffect(() => {
      getCategories();
    }, [])


  return<>
  <div className='my-4 p-4'>
  <h3>Shop Main Categories</h3>
  <div className='d-felx justify-content-center p-4'>
           <Swiper
    
      spaceBetween={20}
       breakpoints={{
    320: {
      slidesPerView: 1,
    },
    576: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    992: {
      slidesPerView: 5,
    },
    1200: {
      slidesPerView: 6,
    },
    1400: {
      slidesPerView: 7,
    },
  }}>
        {categories?.map((category)=>  <SwiperSlide> <Link className=' cursor-pointer' to={`/categoryProducts/${category._id}`}>
      <img src={category.image} height={200} className='w-100'/>
        </Link></SwiperSlide>)}
         
          ...
        </Swiper>
     
  </div>
  </div>

  
  </>
}
