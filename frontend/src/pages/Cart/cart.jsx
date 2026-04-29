import React, { useContext } from 'react'
import './cart.css'
import { StoreContext } from '../../context/storecontext'
import Footer from '../../Footer/footer.jsx'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const {cartItems,food_list,removeFromCart,getTotalCartAmount,url} = useContext(StoreContext);

  const navigate = useNavigate();
  return (
    <>
    <div className='cart'>
        <div className="cart-items">
          <div className="cart-items-title">
            <p>Item</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
          <br />
          <hr />
          {food_list.map((item,index)=>{
            if(cartItems[item._id]){
              return(
                <div>
                  <div className="cart-items-title cart-items-item" key={index}>
                    <img src={url+"/images/"+item.image} alt={item.name} />
                    <p>{item.name}</p>
                    <p>${item.price}</p>
                    <p>{cartItems[item._id]}</p>
                    <p>${cartItems[item._id]*item.price}</p>
                    <p onClick={()=>removeFromCart(item._id)} className='cross'>x</p>
                  </div>
                  <hr />
                </div>
              )
            }
          })} 
        </div>
        <div className="cart-summary">
          <div className="cart-total">
            <h2>Cart Summary</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>${getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>${getTotalCartAmount()===0 ? 0 : 10}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>${(getTotalCartAmount()===0 ? 0 : getTotalCartAmount() + 10)}</b>
              </div>
            </div>
            <button onClick={() => navigate('/order')} className='checkout-btn'>Checkout</button>
          </div>
          <div className="cart-promocode">
              <p>Have a promo code?</p>
              <div className="promocode-input">
                  <input type="text" placeholder="Enter promo code" />
                  <button>Apply</button>
              </div>
          </div>
        </div>
    </div>
    </>
  )
}

export default Cart