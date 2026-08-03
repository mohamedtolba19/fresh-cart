import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import logo from "../../assets/images/freshcart-logo.svg"
import { cartContext } from '../../context/cartContext'
import { wishlistContext } from '../../context/wishlistContext';
export default function Navbar({userData , logOut}) {

 let {numOfCartItems} = useContext(cartContext);

 let {numOfWishlistItems} = useContext(wishlistContext);
  return <>
  <div className="navbar-container">
    <nav className="navbar navbar-expand-lg shadow">
  <div className="container-fluid ">
    <img src={logo} alt="" />
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
   {userData?<ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-3">
        <li className="nav-item">
          <Link className="nav-link " aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="products">Products</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="categories">Categories</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="brands">Brands</Link>
        </li>
     
     
      
     
      </ul>:""}
    
     <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      <li className="nav-item  d-flex align-items-center">
          <i className='fab fa-facebook mx-2'></i>
          <i className='fab fa-twitter mx-2'></i>
          <i className='fab fa-tiktok mx-2'></i>
          <i className='fab fa-youtube mx-2'></i>
          <i className='fab fa-linkedin mx-2'></i>
        </li>
     {userData?
     <>
      <li className="nav-item">
          <Link onClick={()=>{logOut()}} className="nav-link" to={"/login"} >Sign Out </Link>
        </li>
           <li className="nav-item position-relative">
          <Link className="nav-link" to="cart">
          <i className='fas fa-shopping-cart'></i>
          <span className=' badge text-white bg-main position-absolute top-0 end-0'>{numOfCartItems}</span>
          </Link>
        </li>
           <li className="nav-item position-relative">
          <Link className="nav-link" to="wishlist">
          WishList
          <span className=' badge text-white bg-main position-absolute top-0 end-0'>{numOfWishlistItems}</span>
          </Link>
        </li>
     
           <li className="nav-item position-relative">
          <Link className="nav-link" to="allorders">
          Orders
        
          </Link>
        </li>
     
     </>
        :<>
        <li className="nav-item">
          <Link className="nav-link" to="login">Log In</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="register">Sign Up</Link>
        </li>
     </>}
      
       
     
      
     
      </ul>
    </div>
  </div>
</nav>
  </div>
  
  </>
}
