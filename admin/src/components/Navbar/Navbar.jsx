
import React from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets.js'
function Navbar() {
  return (
    <div className='navbar'>
        <img className='logo' src={assets.logo} alt="Logo" />
        <img className='user-icon' src={assets.profile_image} alt="User Icon" />
    </div>
  )
}

export default Navbar