import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios';
import { toast } from 'react-toastify';

function List({ url }) {
    const [list,setList] = useState([]);
    const fetchList= async ()=>{
      const response = await axios.get(`${url}/api/food/list`)
      console.log(response.data)
      if(response.data.success){
        const items = Array.isArray(response.data?.data)
          ? response.data.data
          : Array.isArray(response.data?.foods)
          ? response.data.foods
          : []
        setList(items)
      }
      else{
        setList([])
        toast.error("Error fetching food items")
      }
    }

    const removeFood = async(foodId)=>{
      const response = await axios.post(`${url}/api/food/remove`,{id: foodId})
      await fetchList();
      if(response.data.success){
        toast.success(response.data.message)
      }
      else{
        toast.error("Error removing food item")
      }
    }

    useEffect(()=>{
      fetchList();
    },[])

  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item,index)=>{
          const itemId = item?._id ?? item?.id ?? index
          return (
            <div key={itemId} className='list-table-format'>
              <img src={`${url}/images/`+item.image} alt="itemname"/>
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p onClick={()=>removeFood(itemId)} className='cursor'>X</p>
            </div>

          )
        })}
      </div>
    </div>
  )
}

export default List