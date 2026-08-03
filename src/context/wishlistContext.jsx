import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let wishlistContext = createContext() ;


export function WishListProvider(props){

    const [wishlistId, setWishlistId] = useState(null);
    const [numOfWishlistItems, setNumOfWishlistItems] = useState(null);
    const [wishlistProducts, setWishlistProducts] = useState(null);


   async  function getWishlsit(){
       let response = await getUserWishlist()
       if(response.data.status == "success"){
       
        
        setNumOfWishlistItems(response.data.count)
        setWishlistProducts(response.data.data)

       
       }
    }

useEffect(() => {
  getWishlsit();
}, [])


let headers = {
    token : localStorage.getItem("userToken")
}
    function addToWishlist(productId){

      return  axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist` , {
            productId:productId
        },{
            headers:headers
        }).then((response)=>response).
        catch((error)=>error)


    }
      function removeFromWishlist(productId){

      return  axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}` , {
            headers:headers
        }).then((response)=>response).
        catch((error)=>error)


    }

  
    function getUserWishlist(){

      return  axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
            headers:headers
        } 
        ).then((response)=>response).
        catch((error)=>error)


    }

   
  

    return <wishlistContext.Provider value ={{addToWishlist , numOfWishlistItems , setNumOfWishlistItems ,removeFromWishlist , wishlistProducts ,getWishlsit}}>
{props.children}
    </wishlistContext.Provider>
}