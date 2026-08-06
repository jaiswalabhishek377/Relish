import React, {  useContext } from 'react'
import {assets} from '../../assets/assets'
import './navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/storecontext'

const Navbar = ({ setShowLogin, searchQuery, setSearchQuery }) => {

    const [menu,setMenu] = React.useState("home");
    const [showSearch, setShowSearch] = React.useState(false);
    const {getTotalCartAmount,token,setToken} = useContext(StoreContext);

    const navigate = useNavigate();

    const handleLogout = () =>{
        localStorage.removeItem("token");
        setToken("");
        navigate("/");
        window.location.reload();
    }

  return (
    <div className='navbar'>
        <Link to={'/'}><img src={assets.logo} alt="Relish Logo" className='logo' /></Link>
        <ul className='navbar-menu'>
            <Link to={'/'} onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>home</Link>
            <a href='#explore-menu' onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}>menu</a>
            <a href='#about-us' onClick={()=>setMenu("about-us")} className={menu==="about-us"?"active":""}>about us</a>
            <a href='#why-us' onClick={()=>setMenu("why-us")} className={menu==="why-us"?"active":""}>why relish</a>
            <a href='#app-download' onClick={()=>setMenu("mobile-app")} className={menu==="mobile-app"?"active":""}>mobile app</a>
            <a href='#footer' onClick={()=>setMenu("contact us")} className={menu==="contact us"?"active":""}>contact us</a>
        </ul>
        <div className='navbar-right'>
            <div className="navbar-search-wrapper">
              {showSearch && (
                <input 
                  type="text" 
                  placeholder="Search delicacies..." 
                  value={searchQuery || ''} 
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="navbar-search-input"
                  autoFocus
                />
              )}
              <img 
                src={assets.search_icon} 
                alt="search" 
                onClick={() => setShowSearch(!showSearch)} 
                className="search-icon-btn" 
                title="Search Food"
              />
            </div>
            <div className="navbar-search-icon">
                <Link to={'/cart'}><img src={assets.basket_icon} alt="cart" /></Link>
                 <div className={getTotalCartAmount()>0 ? "dot" : ""}></div>
            </div>
            {!token ? <button onClick={() => setShowLogin(true)}>sign in</button> 
            : <div className='navbar-profile'>
                <img src={assets.profile_icon} alt="" />
                <ul className="nav-profile-dropdown">
                    <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                    <hr />
                    <li onClick={handleLogout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
                </ul>
                </div>}
        </div>
    </div>
  )
} 

export default Navbar