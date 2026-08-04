import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { data, Link } from 'react-router-dom';
import { cartContext } from '../../context/cartContext';
import toast from 'react-hot-toast';
import { wishlistContext } from '../../context/wishlistContext';
import { Helmet } from 'react-helmet';

export default function Wishlist() {

      const [products, setProducts] = useState([]);
     let exist = false ;


    let {addToCart , setNumOfCartItems} =  useContext(cartContext);
    let {  setNumOfWishlistItems , removeFromWishlist ,wishlistProducts , getWishlsit} = useContext(wishlistContext);

    async function addProduct(productId){

   let response =  await  addToCart(productId) ;
     
   if(response.data.status == "success"){
    setNumOfCartItems(response.data.numOfCartItems)
    toast.success(response.data.message)
   }else{
     toast.error(response.data.message)
   }
    }
  
    async function removeWishlist(productId){

   let response =  await  removeFromWishlist(productId) ;
     
   if(response.data.status == "success"){
      getWishlsit();
    setNumOfWishlistItems(response.data.data.length)
    toast.success(response.data.message)
   }else{
     toast.error(response.data.message)
   }
    }

 


  
  return <>
   <Helmet>
                
                <title>Wishlist</title>
               
            </Helmet>
<div>
  <h2>Your WishList</h2>
  {wishlistProducts.length>0?wishlistProducts.map((product)=><div className='row p-4 border-bottom'>
<div className="col-md-1">
  <img src={product.imageCover} className='w-100' alt="" />
</div>
<div className="col-md-11 row gy-2 justify-content-between">
  <div className='col-md-9'>
    <h3>{product.title.split(" ").slice(0,2).join(" ")}</h3>
    <h4>{product.brand.name}</h4>
    <span>Price {product.price} EGP</span>
  
  </div>
  <div className='text-center col-md-3'>
      <button onClick={()=>addProduct(product._id)} className='btn  bg-main text-white w-100'>Add Product</button>
        <button onClick={()=>removeWishlist(product._id)} className=' btn w-25 btn-outline-danger  my-2  w-100'>Remove </button>
  </div>
</div>
  </div>):<div className='d-flex justify-content-center align-items-center'>
    <h2>Wishlist is empty</h2>
    </div>}
</div>
  
  
  
  </>
}
