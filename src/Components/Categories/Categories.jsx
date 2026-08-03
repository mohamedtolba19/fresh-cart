import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { data, Link } from 'react-router-dom';


export default function Categories() {

      const [categories, setCategories] = useState([]);




  async function getCategories(){
  let {data} = await  axios.get("https://ecommerce.routemisr.com/api/v1/categories")
  setCategories(data.data)
  }

  useEffect(() => {
    getCategories();
  }, [])
  
  return <>

  <div className="row gy-4 justify-content-center">
    {categories?.map((category)=>
    <div key={category._id} className='col-lg-3 col-md-4 col-xl-2'>
       <div className="category p-3">
  <Link to={`/categoryproducts/${category._id}`}>
        <img src={category.image} style={{height:200}} className='w-100' alt="" />
      <span className='text-main'>{category.name}</span> 
  </Link>

    </div>
    </div>)}
  </div>
  
  
  
  </>
}
