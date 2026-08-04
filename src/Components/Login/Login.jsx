import { useFormik } from 'formik'
import * as Yup from "yup" ;
import React, { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';

export default function Login({saveUserData}) {

  const [isLoading, setIsLoading] = useState(false)



  let navigete = useNavigate();

  let validationSchema = Yup.object({
  
    email:Yup.string().email("please enter valid email").required("email is required"),
    password:Yup.string().required("password is required").matches(/^[A-Z][a-z0-9]{5,10}$/ , "password must start with uppercase letter ")
  
  })

 async function handelLogin(values){
    try {
      setIsLoading(true)
      let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin` , values)
      localStorage.setItem("userToken" , data.token)
      saveUserData();
setIsLoading(false)
      navigete("/");
    } catch (error) {
      setIsLoading(false)
      toast.error(error.response.data.message)
    }
  }

  let formik = useFormik({
    initialValues:{
     
      email:"",
      password:"",
     
    },validationSchema,
    onSubmit:handelLogin 
  })



  return <>

  <div className="row px-2 ">
    <div className="col-lg-6 text-center  col-12 o order-lg-0 order-1 register-info d-flex  flex-column justify-content-center px-2 ">
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
    <div className='col-lg-6 col-12 order-lg-1 order-0  '>
  <h3 className='fw-bold my-2 title position-relative'>Log in NOW</h3>
  <div className="brdr"></div>
  <p className='fw-bold mt-2'>fill in your details to get started</p>
    <form onSubmit={formik.handleSubmit}>



<div className='my-2'>
        <label htmlFor="email" className='fw-bolder'>Email Address </label>
             <div className=" d-flex justify-content-between align-items-center border border-3 rounded-3 p-2">
            <i class="fa-regular fa-envelope"></i>
      <input placeholder='Enter your email address' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} type="text" name = "email" id='email' className='form-control fw-bold' />
      </div>
       {formik.errors.email && formik.touched.email?<div className='alert '>{formik.errors.email}</div>:""}
</div>

  <div className='my-2'>
        <label htmlFor="name" className='fw-bolder'>Password</label>
            <div className=" d-flex justify-content-between align-items-center border border-3 rounded-3 p-2">
              <i class="fa-solid fa-lock"></i>
      <input placeholder='Enter Your Password ' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} type="password" name = "password" id='password' className='form-control fw-bold' />
      </div>
       {formik.errors.password && formik.touched.password?<div className='alert'>{formik.errors.password}</div>:""}
  </div>
<div>
  <button className='btn my-2 '><Link className='forget-btn fw-bold' to={"/forgetpassword"}>Forget Password ?</Link></button>
</div>
  
      {isLoading?<div className='text-center'>
        <button type='button' className='btn w-75 bg-main text-white'><i className='fas fa-spinner fa-spin'></i></button>
      </div>:<div className='text-center '>
        <button type='submit' className='btn bg-main text-white w-75 my-2 fw-bold  '>Log in</button></div>}
    </form>
    </div>
  
  </div>
  
  
  </>
}
