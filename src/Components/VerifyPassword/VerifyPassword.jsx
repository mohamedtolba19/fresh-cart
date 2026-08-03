import { useFormik } from 'formik'
import * as Yup from "yup" ;
import React, { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';

export default function VerifyPassword() {

  const [isLoading, setIsLoading] = useState(false)



  let navigete = useNavigate();

  let validationSchema = Yup.object({
  
    resetCode:Yup.string().required("resetCode is required"),
  
  })

 async function handelePassword(values){
    try {
      setIsLoading(true)
      let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode` , values)
setIsLoading(false)
if(data?.status == "Success")
{
    toast.success("password is verified");
     navigete("/resetpassword");
}
else{
    toast.error(data.message)
}
   
    } catch (error) {
      setIsLoading(false)
      toast.error(error.response.data.message)
    }
  }

  let formik = useFormik({
    initialValues:{
     
      resetCode:"",
      
     
    },validationSchema,
    onSubmit:handelePassword 
  })



  return <>
   
  <div className="row px-5 py-3 ">
    <div className="col-lg-6 o order-lg-0 order-1  register-info d-flex  flex-column justify-content-center px-2 ">
<div>
  <p className='fw-bolder fs-1'>welcome to <br/>fresh <span className='text-main'>cart</span></p>
<p className='fw-bold lead'>create your account and start  <br/>shopping the latest in fashion,  <br/> & electronics and more .</p>
</div>
<div className='row'>
  <div className="col-md-4 text-center  border-end border-1">
   <div className='bg-white text-main  fs-1'>
     <i class="fa-regular fa-circle-check"></i>
   </div>
    <h6 className='fw-bolder'>Secure & Safe</h6>
    <p className='fw-bold'>Your data is protected with top security</p>
  </div>

  <div className="col-md-4 text-center  border-end border-1">
<div className='bg-white text-main  fs-1'>
     <i class="fa-solid fa-backward"></i>
</div>
    <h6 className='fw-bolder'>Best prices</h6>
    <p className='fw-bold'>Unbeatable deals on clothes and electronics</p>
  </div>
  <div className="col-md-4 text-center ">
 <div className='bg-white text-main fs-1'>
   <i class="fa-regular fa-headphones"></i>
 </div>
    <h6 className='fw-bolder'>24/7 Support</h6>
    <p className='fw-bold'>We are here to help you any time</p>
  </div>



</div>
    </div>
    <div className='col-lg-6 o order-lg-1 order-0  '>
  <h3 className='fw-bold my-2 title position-relative'>Verify Password</h3>
  <div className="brdr"></div>
  <p className='fw-bold mt-2'>fill in your details to get started</p>
    <form onSubmit={formik.handleSubmit}>
<div className='my-2'>
        <label htmlFor="resetCode" className='fw-bolder'>Reset Code</label>
             <div className=" d-flex justify-content-between align-items-center border border-3 rounded-3 p-2">
            <i class="fa-regular fa-envelope"></i>
      <input placeholder='Enter reset code' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.resetCode} type="text" name = "resetCode" id='resetCode' className='form-control fw-bold' />
      </div>
       {formik.errors.resetCode && formik.touched.resetCode?<div className='alert '>{formik.errors.resetCode}</div>:""}
</div>

 

  
      {isLoading?<div className='text-center'>
        <button type='button' className='btn w-75 bg-main text-white'><i className='fas fa-spinner fa-spin'></i></button>
      </div>:<div className='text-center '>
        <button type='submit' className='btn bg-main text-white w-75 my-2 fw-bold  '>Submit</button></div>}
    </form>
    </div>
  
  </div>
  
  
  </>
}
