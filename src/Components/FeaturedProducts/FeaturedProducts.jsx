import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { data, Link } from 'react-router-dom';
import { cartContext } from '../../context/cartContext';
import toast from 'react-hot-toast';
import { wishlistContext } from '../../context/wishlistContext';

export default function FeaturedProducts() {

      const [products, setProducts] = useState([]);
     let exist = false ;


    let {addToCart , setNumOfCartItems} =  useContext(cartContext);
    let {addToWishlist , setNumOfWishlistItems , removeFromWishlist ,wishlistProducts , getWishlsit} = useContext(wishlistContext);

    async function addProduct(productId){

   let response =  await  addToCart(productId) ;
     
   if(response.data.status == "success"){
    setNumOfCartItems(response.data.numOfCartItems)
    toast.success(response.data.message)
   }else{
     toast.error(response.data.message)
   }
    }
    async function addWishlist(productId){

   let response =  await  addToWishlist(productId) ;
     
   if(response.data.status == "success"){
    getWishlsit();
console.log(response.data.data)
    setNumOfWishlistItems(response.data.data.length)
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

  async function getProducts(){
  let {data} = await  axios.get("https://ecommerce.routemisr.com/api/v1/products")
  console.log(data.data)
  setProducts(data.data)
  }

  useEffect(() => {
    getProducts();
  }, [])
  
  return <>
  <div className="row gy-4 justify-content-center">
    {products?.map((product)=>
    <div key={product._id} className='col-lg-3 col-md-4 col-xl-2  '>
       <div className="product p-3">

        {wishlistProducts?.some((wishlist)=> wishlist._id == product._id )?  <div className='wishlist position-relative cursor-pointer'>
          
 <i onClick={()=>removeWishlist(product._id)} class="fa-solid fa-minus"></i>

 <span className='text-main wishlist-badge badge  position-absolute top-25 start-25'>remove from wishlist</span>
        </div>:   <div className='wishlist position-relative cursor-pointer'>
          
 <i onClick={()=>addWishlist(product._id)} class="fa-solid fa-plus"></i>

 <span className='text-main wishlist-badge badge  position-absolute top-25 start-25'>add to wishlist</span>
        </div>}
     
      
         
  <Link to={`/productdetails/${product._id}`}>

        <img src={product.imageCover} className='img-fluid' alt="" />
      <span className='text-main'>{product.category.name}</span>
        <h6>{product.title.split(" ").slice(0,2).join(" ")}</h6>
        <div className='d-flex justify-content-between'>
          <span>{product.price}EGP</span>
        <span> <i className='fas fa-star rating-color'></i>{product.ratingsAverage} </span>
        </div>
         
      
  </Link>
  <button onClick={()=>addProduct(product._id)} className='btn bg-main text-white w-100'>Add Product</button>
    </div>
    </div>)}
  </div>
  
  
  
  </>
}
