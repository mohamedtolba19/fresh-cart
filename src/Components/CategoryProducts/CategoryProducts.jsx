import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { cartContext } from '../../context/cartContext';
import axios from 'axios';

export default function CategoryProducts() {

    let {id} = useParams();
    const [products, setProducts] = useState([]);

    let {addToCart , setNumOfCartItems} =  useContext(cartContext);

 async function addProduct(productId){

   let response =  await  addToCart(productId) ;
     
   if(response.data.status == "success"){
    setNumOfCartItems(response.data.numOfCartItems)
    toast.success(response.data.message)
   }else{
     toast.error(response.data.message)
   }
    }

  async function getProducts(id){
    console.log(id)
  let {data} = await  axios.get("https://ecommerce.routemisr.com/api/v1/products")
  let categoryProducts = data.data.filter((product)=>product.category._id == id)
  setProducts(categoryProducts)

  }
  useEffect(() => {
    getProducts(id);
  }, [])
  
  return <>
  
    <div className="row gy-4 justify-content-center">
    {products.length>0?products.map((product)=>
    <div key={product._id} className='col-md-2'>
       <div className="product p-3">
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
    </div>):<div className='d-flex justify-content-center align-items-center'>
     <h2>sorry there is no products for this category</h2>
        </div>}
  </div>
  </>
}
