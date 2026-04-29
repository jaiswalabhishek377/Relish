import React, { useContext, useEffect, useState } from 'react'
import './placeorder.css'
import Footer from '../../Footer/footer.jsx'
import { StoreContext } from '../../context/storecontext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const PlaceOrder = () => {

  const {getTotalCartAmount,token,food_list,cartItems,url} = useContext(StoreContext);

  const [data,setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
   })

   const onChangeHandler = (e)=>{
    const name = e.target.name;
    const value = e.target.value;
    setData((prev)=>({...prev,[name]:value}))
   }

   const placeOrderHandler = async (e)=>{
    e.preventDefault();
    let orderItems =[];
    food_list.map((item)=>{
      if(cartItems[item._id]>0){
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })
    let orderData ={
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+10,
    }
    let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}});
    if(response.data.success){
      // const {session_url} = response.data;
      // window.location.replace(session_url);
      window.location.href = response.data.session_url; // redirect to stripe payment page
    }else{
      alert("Error placing order. Please try again.");
    }
   }

   const navigate = useNavigate();
   useEffect(()=>{
      if(!token){
        navigate("/");
      }
      else if(getTotalCartAmount()===0){
        navigate("/cart");
      }
    },[token])

  return (
    <>
    <form onSubmit={placeOrderHandler} className='place-order'>
        <div className="place-order-left">
            <p className='title'>Delivery Information</p>
            <div className="multi-fields">
                <input name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='first name' required/>
                <input name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='last name' required/>
            </div>
            <input name='email' onChange={onChangeHandler} value={data.email} type="text" placeholder='Email address' required />
            <input name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' required/>
            <div className="multi-fields">
                <input name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' required/>
                <input name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' required/>
            </div>
            <div className="multi-fields">
                <input name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip Code' required/>
                <input name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' required/>
            </div>
            <input name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' required/>
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
            <button type='submit' className='checkout-btn'>Payment!</button>
          </div>
        </div>
    </form>
    </>
  )
}

export default PlaceOrder