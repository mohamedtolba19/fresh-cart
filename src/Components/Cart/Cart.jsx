import React, { useContext, useEffect, useState } from 'react'
import { cartContext } from '../../context/cartContext'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Cart() {


  const [cartDetails, setCartDetails ] = useState({})

 let {getUserCart , removeFromCart , updateCartCount ,setNumOfCartItems} = useContext(cartContext);


 async function getCart(){

 let response = await getUserCart();
 if(response.data.status == "success"){
  console.log(response.data.data)
  setCartDetails(response.data.data);
  console.log(response.data.data);
 }

 }
 async function removeCart(productId){

 let response = await removeFromCart(productId);
 if(response.data.status == "success"){
  setNumOfCartItems(response.data.numOfCartItems)
  setCartDetails(response.data.data);
  toast.success("product removed successfully")
 }

 }

  async function updateCart(productId , count){

 let response = await updateCartCount(productId , count);
 if(response.data.status == "success"){
  setCartDetails(response.data.data);
  toast.success("product updated successfully")
 }

 }

 useEffect(() => {
  getCart();
 }, [])
 
  return <>
    
            
         <div className='d-flex border-bottom'>
          <div className='d-flex justify-content-center align-items-center me-3'>
            <i class="fa-solid fa-cart-shopping text-main fs-2"></i>
          </div>
          <div>
            <h2 className='fw-bolder'>Your Shopping Cart</h2>
            <p className='fw-bold'>Review your items and proceed to checkout</p>
          </div>

         </div>
  {cartDetails?.products?.length>0?<div className=' m-2 p-1 '>
    <h3 className='fw-bolder'>Shop Cart </h3>
    <h3 className='fw-bold'>Total Cart Price : <span className='text-main'>{cartDetails.totalCartPrice} EGP</span></h3>
   {cartDetails?.products?.map((product)=><div key={product.product._id} className='row border-bottom my-2 py-3 gy-2 '>
    <div className="col-md-1">
<img src={product.product.imageCover} className='w-100' alt="" />
    </div>
    <div className="col-md-11 row gy-2 justify-content-between">
<div className='col-6'>
  <h6>{product.product.title.split(" ").slice(0,2).join(" ")}</h6>
<h6 className='text-main'>{product.price} EGP</h6>
<button onClick={()=>removeCart(product.product._id)} className='btn m-0 p-0'> <i className='fas fa-regular fa-trash text-main'></i>Remove</button>
</div>
<div className='col-6 '>
<div className='d-flex justify-content-center'>
    <button onClick={()=>updateCart(product.product._id , product.count+1)} className='btn border-main btn-sm'>+</button>
  <span>{product.count}</span>
  <button onClick={()=>updateCart(product.product._id , product.count-1)} className='btn border-main btn-sm'>-</button>
</div>
</div>
    </div>
  
   </div>)}
    <Link to = "/checkout">
     <button className='btn bg-main text-white'>visa</button>
    </Link>
    <Link to = "/cashorder">
     <button className='btn bg-main text-white mx-2'>cash order</button>
    </Link>
  </div>:<div className='d-flex justify-content-center align-items-center'>
    <h2>Your Cart is empty</h2>
    </div>}

  
  
  </>
}
