import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let cartContext = createContext() ;


export function CartContextProvider(props){

    const [cartId, setCartId] = useState(null);
    const [numOfCartItems, setNumOfCartItems] = useState(null);


   async  function getCart(){
       let response = await getUserCart()
       if(response.data.status == "success"){
        
        setCartId(response.data.cartId)
        setNumOfCartItems(response.data.numOfCartItems)

       
       }
    }

useEffect(() => {
  getCart();
}, [])


let headers = {
    token : localStorage.getItem("userToken")
}
    function addToCart(productId){

      return  axios.post(`https://ecommerce.routemisr.com/api/v1/cart` , {
            productId:productId
        },{
            headers:headers
        }).then((response)=>response).
        catch((error)=>error)


    }
      function removeFromCart(productId){

      return  axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` , {
            headers:headers
        }).then((response)=>response).
        catch((error)=>error)


    }

     function updateCartCount(productId , count){

      return  axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` ,{
        count:count
      }, {
            headers:headers
        }).then((response)=>response).
        catch((error)=>error)


    }
    function getUserCart(){

      return  axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{
            headers:headers
        } 
        ).then((response)=>response).
        catch((error)=>error)


    }

       function payOnline(cartId , shippingAddress){

      return  axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173` , {
            shippingAddress:shippingAddress
        },{
            headers:headers
        }).then((response)=>response).
        catch((error)=>error)


    }
       function payCash(cartId , shippingAddress){

      return  axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}` , {
            shippingAddress:shippingAddress
        },{
            headers:headers
        }).then((response)=>response).
        catch((error)=>error)


    }
  

    return <cartContext.Provider value ={{payOnline ,setNumOfCartItems,numOfCartItems , cartId ,addToCart , getUserCart, getCart, removeFromCart , updateCartCount , payCash}}>
{props.children}
    </cartContext.Provider>
}