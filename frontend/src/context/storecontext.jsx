import axios from 'axios';
import {createContext, useEffect, useState} from 'react'
// import { food_list } from '../assets/assets'

export const StoreContext = createContext(null);

const StoreContextProvider = (props) =>{

    const [cartItems,setCartItems] = useState({});
    const url="http://localhost:5000";
    const [token,setToken] = useState(localStorage.getItem("token") || "");
    const [food_list,setFoodList] = useState([]);

    const addToCart = async (itemId)=>{
        if(!cartItems[itemId]){
            setCartItems((prev)=>({...prev,[itemId]:1}))
        }
        else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
        if(token){
           await axios.post(url+"/api/cart/add",{itemId},{headers:{token}}) // so that item are saved in db with help of token
        }
    }

    const removeFromCart = async (itemId)=>{
        if(cartItems[itemId]){
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        }
        if(token){
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }
    }

    const getTotalCartAmount = ()=>{
        let totalAmount = 0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                let foodItem = food_list.find((food)=>food._id === item);
                if (foodItem) {
                    totalAmount += cartItems[item]*foodItem.price;
                }
            }
        }
        return totalAmount;
    }

    const fetchFoodList = async ()=>{
        try {
            const response = await axios.get(url+"/api/food/list");
            setFoodList(response.data.data || response.data.foods || []);
        } catch (error) {
            console.error("Error fetching food list:", error);
            setFoodList([]);
        }
    }

    const loadCartdata = async (token)=>{   //even after reload page we can get cart data with help of token
        const response = await axios.post(url+"/api/cart/get",{},{headers:{token}});
        setCartItems(response.data.cartData || {}) // if cartData is not there then set empty object
    }

    useEffect(()=>{
        async function loadData(){
            await fetchFoodList();
            if(localStorage.getItem("token")){
            setToken(localStorage.getItem("token"))  //when we will reload page not get logout
            await loadCartdata(localStorage.getItem("token"));
            }
        }
        loadData();
    },[])

    const contextValue={
        food_list,
        cartItems,
        getTotalCartAmount,
        setCartItems,
        addToCart,
        removeFromCart,
        url,
        token,
        setToken
    }
    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )

}
export default StoreContextProvider;