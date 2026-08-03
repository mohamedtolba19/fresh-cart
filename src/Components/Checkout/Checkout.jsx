import { useFormik } from 'formik'
import React, { useContext, useEffect } from 'react'
import { cartContext } from '../../context/cartContext'
import toast from 'react-hot-toast';

export default function Checkout() {

let {cartId , payOnline ,setNumOfCartItems ,getCart} = useContext(cartContext);

   async function handleCheckout(values){
     let response =  await payOnline(cartId , values)
     if(response.data.status == "success"){
      setNumOfCartItems(0)
      toast.success("your order is submitted succesfully")
        window.location.href = response.data.session.url ;
     }

    }
useEffect(() => {
  getCart()

  
}, [cartId])

    let formik = useFormik({
        initialValues:{
        details: "",
        phone: "",
        city: ""
        },onSubmit:handleCheckout
    })
  return <>
  <div className="w-75 py-3 mx-auto">
    <h2 className='p-3'>Checkout</h2>
    <form onSubmit={formik.handleSubmit}>
        <div className='my-2'>
        <label htmlFor="name" className='fw-bolder'>Details</label>
            <div className=" d-flex justify-content-between align-items-center border border-3 rounded-3 p-2">
              <i class="fa-solid fa-lock"></i>
         <input  placeholder='Enter your address' type="text" className='form-control border' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.details} name="details" id='details' />
      </div>
 
  </div>
        <div className='my-2'>
        <label htmlFor="name" className='fw-bolder'>City</label>
            <div className=" d-flex justify-content-between align-items-center border border-3 rounded-3 p-2">
              <i class="fa-solid fa-lock"></i>
         <input placeholder='Enter your city' type="text" className='form-control' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.city} name='city' id='city' />
      </div>
  
  </div>

      <div className='my-2'>
        <label htmlFor="name" className='fw-bolder'>Phone</label>
            <div className=" d-flex justify-content-between align-items-center border border-3 rounded-3 p-2">
              <i class="fa-solid fa-lock"></i>
          <input  placeholder='Enter your phone' type="text" className='form-control' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} name = "phone" id='phone' />
      </div>

  </div>
 
      <button className='btn bg-main text-white w-100'>Submit</button>
    </form>
  </div>
  
  
  
  </>
}
