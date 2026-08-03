import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { data, Link } from 'react-router-dom';


export default function Brands() {

      const [brands, setBrands] = useState([]);




  async function getBrands(){
  let {data} = await  axios.get("https://ecommerce.routemisr.com/api/v1/brands")
  setBrands(data.data)
  }

  useEffect(() => {
    getBrands();
  }, [])
  
  return <>

  <div className="row gy-4 justify-content-center">
    {brands?.map((brand)=>
    <div key={brand._id} className='col-lg-3 col-md-4 col-xl-2'>
       <div className="brand p-3">
  <Link to={`/brandproducts/${brand._id}`}>
        <img src={brand.image} style={{height:200}} className='w-100' alt="" />
      <span className='text-main'>{brand.name}</span> 
  </Link>

    </div>
    </div>)}
  </div>
  
  
  
  </>
}
