import {createContext, useState} from 'react'
import { food_list } from '../assets/assets'

export const StoreContext = createContext(null);

const StoreContextProvider = (props) =>{

    const [cartItems,setCartItems] = useState({});

    const addToCart = (foodId)=>{
        if(!cartItems[foodId]){
            setCartItems({...cartItems,[foodId]:1})
        }
        else{
            setCartItems({...cartItems,[foodId]:cartItems[foodId]+1})
        }
    }

    const removeFromCart = (foodId)=>{
        if(cartItems[foodId]){
            setCartItems({...cartItems,[foodId]:cartItems[foodId]-1})
        }
    }

    const getTotalCartAmount = ()=>{
        let totalAmount = 0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                let foodItem = food_list.find((food)=>food._id === item);
                totalAmount += cartItems[item]*foodItem.price;
            }
        }
        return totalAmount;
    }

    // useEffect(()=>{
    //     console.log(cartItems);
    // },[cartItems])
    const contextValue={
        food_list,
        cartItems,
        getTotalCartAmount,
        setCartItems,
        addToCart,
        removeFromCart,
    }
    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )

}
export default StoreContextProvider;