import React, { useContext } from 'react'
import './placeorder.css'
import Footer from '../../Footer/footer.jsx'
import { StoreContext } from '../../context/storecontext'

const PlaceOrder = () => {

  const {getTotalCartAmount} = useContext(StoreContext);
  return (
    <>
    <form className='place-order'>
        <div className="place-order-left">
            <p className='title'>Delivery Information</p>
            <div className="multi-fields">
                <input type="text" placeholder='first name'/>
                <input type="text" placeholder='last name'/>
            </div>
            <input type="text"placeholder='Email address' />
            <input type="text" placeholder='Street'/>
            <div className="multi-fields">
                <input type="text" placeholder='City'/>
                <input type="text" placeholder='State'/>
            </div>
            <div className="multi-fields">
                <input type="text" placeholder='Zip Code'/>
                <input type="text" placeholder='Country'/>
            </div>
            <input type="text" placeholder='Phone'/>
        </div>

        <div className="place-order-right">
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
                <b>${getTotalCartAmount()===0 ? 0 : getTotalCartAmount() + 10}</b>
              </div>
            </div>
            <button  className='checkout-btn'>Payment!</button>
          </div>
        </div>
    </form>
    </>
  )
}

export default PlaceOrder