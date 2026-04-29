import React from 'react'
import './Orders.css'
import { useState } from 'react'
import axios from 'axios'
import {toast } from 'react-toastify'
import { useEffect } from 'react'
import { assets } from '../../../../frontend/src/assets/assets'
import OrderSkeletonLoader from '../../components/OrderSkeltonLOader/OrdersSkeltonLoader'

function Orders({url}) {

  const  [orders,setOrders] = useState([]);
  const [loading,setLoading] = useState(false);

  const fetchAllOrders = async ()=>{
    setLoading(true);

    const response = await axios.get(url+"/api/order/list");
    if(response.data.success){
      setOrders(response.data.orders || []);
      console.log(response.data.orders);
    }
    else{
      toast.error("Failed to fetch orders!");
    }
    setLoading(false);
  }

  const statusHandler = async (event,orderId)=>{
    const response =await axios.post(url+"/api/order/status",
    {status:event.target.value,orderId});
    if(response.data.success){
      await fetchAllOrders();
    }
  }

  useEffect(()=>{
    fetchAllOrders();

  },[])

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {loading ? (
          // Render SkeletonLoader while loading
          <OrderSkeletonLoader />
        ) : (
          orders.map((order, index) => (
            <div key={index} className="order-item">
              <img src={assets.parcel_icon} alt="" />
              <div>
                <p className="order-item-food">
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return item.name + " x " + item.quantity;
                    } else {
                      return item.name + " x " + item.quantity + ", ";
                    }
                  })}
                </p>
                <p className="order-item-name">
                  {order.address.firstName + " " + order.address.lastName}
                </p>
                <div className="order-item-address">
                  <p>{order.address.street + ","}</p>
                  <p>
                    {order.address.city +
                      ", " +
                      order.address.state +
                      ", " +
                      order.address.country +
                      ", " +
                      order.address.zipcode}
                  </p>
                </div>
                <p className="order-item-phone">{order.address.phone}</p>
              </div>
              <p>Items: {order.items.length}</p>
              <p>${order.amount}</p>
              {/* Select option to change the order status */}
              <select
                onChange={(e) => statusHandler(e, order._id)}
                value={order.status}
              >
                <option value="Food Processing">Food Processing</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders