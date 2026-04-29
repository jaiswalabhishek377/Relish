import React, { useState } from 'react'
import Navbar from './components/Navbar/navbar.jsx'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/home.jsx'
import Cart from './pages/Cart/cart.jsx'
import PlaceOrder from './pages/PlaceOrder/placeorder.jsx'
import LoginPopup from './components/Loginpopup/loginpopup.jsx'
import Footer from './Footer/footer.jsx'
import Verify from './pages/Verify/Verify.jsx'
import MyOrder from './pages/MyOrders/MyOrder.jsx'
const App = () => {

  const [showLogin,setShowLogin] = useState(false);
  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin} />:<></>}
    <div className='app'>
      <Navbar setShowLogin={setShowLogin} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/order' element={<PlaceOrder />} />
        <Route path='/verify' element={<Verify />} />
        <Route path='/myorders' element={<MyOrder />} />
      </Routes>
    </div>
    <Footer />
    </>
  )
}

export default App