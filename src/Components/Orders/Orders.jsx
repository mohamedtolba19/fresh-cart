import axios from 'axios'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Helmet } from 'react-helmet'

export default function Orders(data) {
 
  let {userData , saveUserData} = data ;

const [orders, setOrders] = useState([])
   async function getOrders(){
   
    console.log({"user " : userData})
        let response = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userData.id}`)
    
        setOrders(response.data);
    }
useEffect(() => {
    if (userData?.id) {
        getOrders();
    }
}, [userData]);
    
  return (
    <div>
       <Helmet>
                
                <title>Orders</title>
               
            </Helmet>
     <h2 className='fw-bolder'>My Orders</h2>
     {orders.length>0?orders.map((order , index)=><div key={order._id} className='brdr-bottom-main py-3'>
      <div className="d-flex justify-content-between  my-3 py-3 ">
        <div>
          <h3 className='fw-bolder'>Order#{index+1} {order._id}</h3>
          <span className='fw-bold '>Payment :{order.paymentMethodType}</span>
        </div>
        <div>
          {order.isPaid?<span className='bg-main text-white rounded-2 px-4 py-2 fw-bold'>Paid</span>:<span className='bg-main text-white rounded-2 px-4 py-2 fw-bold'>Unpaid</span>}
        </div>
      </div>
<div>
  <h2 className='fw-bolder'>Products</h2>
  {order.cartItems?.map((item)=><div key={item._id} className='row border-bottom justify-content-center align-items-center'>
    <div className="col-md-1">
     
      <img src={item.product.imageCover} className='w-100' alt="" />
    </div>
    <div className="col-md-11 d-flex justify-content-between">
      <div>
        <h4>{item.product.title}</h4>
        <h5>Brand : {item.product.brand.name}</h5>
        <span>Price : {item.price} EGP</span>
      </div>
      <div>
        <span>Count : {item.count}</span>
      </div>
    </div>



  </div>)}
</div>


     </div>):<div className='d-flex justify-content-center align-items-center'>
      <h2>You Have No Orders</h2>
      </div>}
    </div>
  )
}
