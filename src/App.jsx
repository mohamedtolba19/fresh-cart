import { useEffect, useEffectEvent, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Layout from './Components/Layout/Layout'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Products from './Components/Products/Products'
import Cart from './Components/Cart/Cart'
import Categories from './Components/Categories/Categories'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Notfound from './Components/Notfound/Notfound'
import Home from './Components/Home/Home'
import Brands from './Components/Brands/Brands'
import { jwtDecode } from 'jwt-decode'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import { CartContextProvider } from './context/cartContext'
import { Toaster } from 'react-hot-toast'
import Checkout from './Components/Checkout/Checkout'
import CategoryProducts from './Components/CategoryProducts/CategoryProducts'
import BrandProducts from './Components/BrandProducts/BrandProducts'
import ForgetPassword from './Components/ForgetPassword/ForgetPassword'
import VerifyPassword from './Components/VerifyPassword/VerifyPassword'
import ResetPassword from './Components/ResetPassword/ResetPassword'
import { WishListProvider } from './context/wishlistContext'
import Wishlist from './Components/Wishlist/Wishlist'
import CashOrder from './Components/CashOrder/CashOrder'
import Orders from './Components/Orders/Orders'




function App() {

  const [userData, setUserData] = useState(null)

  function saveUserData(){

    if(localStorage.getItem("userToken"))
 {
  console.log("run")
    let encodedToken = localStorage.getItem("userToken");
    let decodedToken = jwtDecode(encodedToken);

    setUserData(decodedToken);
 }
  }
  function logOut(){
    setUserData(null);
    localStorage.removeItem("userToken");
  }

  useEffect(() => {
   saveUserData();
  }, [])
  
let router = createBrowserRouter([
  {path:"" , element: <Layout userData = {userData} logOut = {logOut}/> , children:[
    {index:true , element : <ProtectedRoute><Home/></ProtectedRoute>},
    {path:"/products" , element:<ProtectedRoute><Products/></ProtectedRoute>},
    {path:"/categories" , element:<ProtectedRoute><Categories/></ProtectedRoute>},
    {path:"/brands" , element:<ProtectedRoute><Brands/></ProtectedRoute>},
    {path:"/cart" , element:<ProtectedRoute><Cart/></ProtectedRoute>},
    {path:"/wishlist" , element:<ProtectedRoute><Wishlist/></ProtectedRoute>},
    {path:"/checkout" , element:<ProtectedRoute><Checkout/></ProtectedRoute>},
    {path:"/cashorder" , element:<ProtectedRoute><CashOrder/></ProtectedRoute>},
    {path:"/allorders" , element:<ProtectedRoute><Orders saveUserData = {saveUserData} userData = {userData}/></ProtectedRoute>},
    {path:"/productdetails/:id" , element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
    {path:"/categoryproducts/:id" , element:<ProtectedRoute><CategoryProducts/></ProtectedRoute>},
    {path:"/brandproducts/:id" , element:<ProtectedRoute><BrandProducts/></ProtectedRoute>},
    {path:"/login" , element:<Login saveUserData = {saveUserData}/>},
    {path:"/register" , element:<Register/>},
    {path:"/forgetpassword" , element:<ForgetPassword/>},
    {path:"/verifypassword" , element:<VerifyPassword/>},
    {path:"/resetpassword" , element:<ResetPassword/>},
    {path:"*" , element:<Notfound/>},

  ]}
])
  return <>
  <CartContextProvider>
    <WishListProvider>
        <Toaster/>
 <RouterProvider router={router}></RouterProvider>
 </WishListProvider>
  </CartContextProvider>
 
 
  </>
    
}

export default App
