import React, { useContext }  from 'react'
import './fooddisplay.css'
import { StoreContext } from '../../context/storecontext';
import FoodItem from '../Fooditem/fooditem';
const FoodDisplay = ({category, searchQuery = ''}) => {

    const {food_list}= useContext(StoreContext);

    const filteredList = food_list ? food_list.filter(item => {
        const matchesCategory = category === "All" || item.category === category;
        const matchesSearch = !searchQuery || 
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
          item.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    }) : [];

  return (
    <div className='food-display' id='food-display'>
        <h2>Top dishes near you</h2>
        {filteredList.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: '#676767', fontSize: '18px' }}>
            <p>No dishes found matching your criteria. Try exploring another category or search term!</p>
          </div>
        ) : (
          <div className="food-display-list">
              {filteredList.map((item,index)=>{
                  return <FoodItem key={item._id || index} _id={item._id} name={item.name} price={item.price} description={item.description} image={item.image}/>
              })}
          </div>
        )}
    </div>
  )
}

export default FoodDisplay