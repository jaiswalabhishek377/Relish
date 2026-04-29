import React, { useContext } from 'react'
import './fooditem.css'
import { StoreContext } from '../../context/storecontext';
import { assets } from '../../assets/assets'

const FoodItem = ({_id, name, price,description,image}) => {

       // const [itemCount,setItemCount] = useState(0);
        const {cartItems,addToCart,removeFromCart,url} = useContext(StoreContext);
  return (
    <div className='food-item'>
        <div className="food-item-img-container">
            <img className="food-item-img" src={url+"/images/"+image} alt={name} />
            {
                !cartItems[_id] 
                ? <img className='food-item-add-btn' onClick={()=>addToCart(_id)} src={assets.add_icon_white} />  
                : <div className="food-item-count">
                    <img onClick={()=>removeFromCart(_id)} src={assets.remove_icon_red} alt="" />
                    <p>{cartItems[_id]}</p>
                    <img onClick={()=>addToCart(_id)} src={assets.add_icon_green} alt="" />
                  </div>
            }
        </div>
        <div className="food-item-info">
            <div className="food-item-rating">
                <p>{name}</p>
                <img src={assets.rating_starts} alt="" />
            </div>
            <p className='food-item-desc'>{description}</p>
            <p className='food-item-price'>${price}</p>
        </div> 
    </div>
  )
}

export default FoodItem