import React from 'react'
import './footer.css'
import { assets } from '../assets/assets'
const Footer = () => {
  return (
    <div id='footer'>
        <div className="footerpart">
            <div className="foot-left">
                <img src={assets.logo} alt="logo" />
                <p>Relish is a food delivery app that connects you with a wide range of restaurants and cuisines.  Download the Relish app today and experience the convenience of food delivery at your fingertips.</p>
                <div className="social">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
            </div>
            <div className="foot-center">
                <h2>COMPANY</h2>
                <div className="list">
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="">About Us</a></li>
                        <li><a href="">Delivery</a></li>
                        <li><a href="">Privacy Policy</a></li>
                    </ul>
                </div>
            </div>
            <div className="foot-right">
                <h2>GET IN TOUCH</h2>
                <p>+91 9999999999</p>
                <p>support@relish.com</p>
            </div>
            <hr />
            <div className="copyright">
                <p>Copyright © 2026 Relish. All rights reserved.</p>
            </div>
        </div>
    </div>
  )
}

export default Footer