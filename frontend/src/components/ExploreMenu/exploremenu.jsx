import React from 'react'
import { menu_list } from '../../assets/assets'
import './exploremenu.css'

const Exploremenu = ({category,setCategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
        <h2>Explore our menu</h2>
        <p className='exploremenu-text'>Choose from a diverse menu featuring a delectable array of disshes. Our chefs have carefully crafted each dish to ensure a delightful culinary experience.</p>
    <div className="explore-menu-list">
        {menu_list.map((item,index)=>(
            <div onClick={() => setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} className="explore-menu-item" key={index}>
                <img className={category===item.menu_name?"active":""} src={item.menu_image} alt="" />
                <p>{item.menu_name}</p>
            </div>
        ))}
    </div>
    <hr />
    </div>
  )
}

export default Exploremenu