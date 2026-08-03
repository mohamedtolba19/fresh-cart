import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { cartContext } from '../../context/cartContext';
import toast from 'react-hot-toast';

export default function ProductDetails() {
  const [productDetails, setProductDetails] = useState({})
  let {id} = useParams();
    let {addToCart , setNumOfCartItems} =  useContext(cartContext);


 async function getProductDetails(){
 
   let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
   setProductDetails(data.data);

  }
     async function addProduct(productId){

   let response =  await  addToCart(productId) ;
     
   if(response.data.status == "success"){
    setNumOfCartItems(response.data.numOfCartItems)
    toast.success(response.data.message)
   }else{
     toast.error(response.data.message)
   }
    }
    

  useEffect(() => {
  getProductDetails();
  }, [])
  
  return <>

{productDetails?<div className="row align-items-center py-5">
    <div className="col-md-3">
       <Swiper

  spaceBetween={20}
  slidesPerView={1}
    
    >
    {productDetails?.images?.map((img)=> <SwiperSlide><img src={img} className='w-100'/></SwiperSlide>)}
     
      ...
    </Swiper>
 

    </div>
    <div className="col-md-9  ">
<div className='w-100 p-4'>
  <h3>{productDetails.title}</h3>
<p className='p-2 lead'>{productDetails.description}</p>
   <div className='d-flex justify-content-between'>
          <span>{productDetails.price}EGP</span>
        <span> <i className='fas fa-star rating-color'></i>{productDetails.ratingsAverage} </span>
        </div>
          <button onClick={()=>addProduct(productDetails._id)} className='btn bg-main text-white w-100'>Add Product</button>
</div>
    </div>
  </div>:""}
  
  
  
  </>
}
