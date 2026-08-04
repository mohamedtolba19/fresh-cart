import { useFormik } from 'formik'
import * as Yup from "yup" ;
import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';

export default function Register() {


  const [isLoading, setIsLoading] = useState(false)



  let navigete = useNavigate();

  let validationSchema = Yup.object({
    name:Yup.string().required("name is required").min(3 , "min length is 3 ").max(10 , "max length is 10"),
    email:Yup.string().email("please enter valid email").required("email is required"),
    password:Yup.string().required("password is required").matches(/^[A-Z][a-z0-9]{5,10}$/ , "password must start with uppercase letter "),
    rePassword:Yup.string().required("rePassword is required").oneOf([Yup.ref("password")] , "passwords dosn,t match"),
    phone:Yup.string().required("phone is required").matches(/^01[0125][0-9]{8}$/ , "please enter EGY number")
  })

 async function handelRegister(values){
    try {
      setIsLoading(true)
      let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup` , values)
setIsLoading(false)
      navigete("/login");
    } catch (error) {
      setIsLoading(false)
      toast.error(error.response.data.message)
    }
  }

  let formik = useFormik({
    initialValues:{
      name:"" ,
      email:"",
      password:"",
      rePassword:"",
      phone:""
    },validationSchema,
    onSubmit:handelRegister 
  })



  return <>

  <div className="row  px-2 ">
    <div className="col-lg-6 o order-lg-0 order-1   register-info d-flex  flex-column justify-content-center px-2 ">
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
  <h3 className='fw-bold my-2 title position-relative'>Create Your Acccount</h3>
  <div className="brdr"></div>
  <p className='fw-bold mt-2'>fill in your details to get started</p>
    <form onSubmit={formik.handleSubmit}>

<div className='my-2'>
        <label htmlFor="name" className='fw-bolder'>Full Name</label>
      <div className=" d-flex justify-content-between align-items-center border border-3 rounded-3 p-2">
     <i class="fa-regular fa-user"></i>
        <input placeholder='Enter your full name' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} type="text" name = "name" id='name' className='form-control fw-bold' />
      </div>
      {formik.errors.name && formik.touched.name?<div className='alert'>{formik.errors.name}</div>:""}
</div>

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
      <input placeholder='Create a strong password' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} type="password" name = "password" id='password' className='form-control fw-bold' />
      </div>
       {formik.errors.password && formik.touched.password?<div className='alert'>{formik.errors.password}</div>:""}
  </div>

     <div className='my-2'>
       <label htmlFor="name" className='fw-bolder'>Confirm Password  </label>
    <div className=" d-flex justify-content-between align-items-center border border-3 rounded-3 p-2">
      <i class="fa-solid fa-lock"></i>
      <input placeholder='Confirm your password' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.rePassword} type="password" name = "rePassword" id='rePassword' className='form-control fw-bold' />
      </div>
       {formik.errors.rePassword && formik.touched.rePassword?<div className='alert'>{formik.errors.rePassword}</div>:""}
     </div>
<div className='my-2'>
  
      <label htmlFor="name" className='fw-bolder'>Phone</label>
        <div className=" d-flex justify-content-between align-items-center border border-3 rounded-3 p-2">
          <i class="fa-solid fa-phone"></i>
      <input placeholder='Enter your phone number' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} type="tel" name = "phone" id='phone' className='form-control fw-bold' />
      </div>
       {formik.errors.phone && formik.touched.phone?<div className='alert '>{formik.errors.phone}</div>:""}
</div>

      {isLoading?<div className='text-center'>
        <button type='button' className='btn w-75 bg-main text-white'><i className='fas fa-spinner fa-spin'></i></button>
      </div>:<div className='text-center '>
        <button type='submit' className='btn bg-main text-white w-75 my-2 fw-bold  '>Create Account</button></div>}
    </form>
    </div>
  
  </div>
  
  
  </>
}
