import { createSlice } from "@reduxjs/toolkit";
import { getCartPrice } from "../home/components";
export const cartSlice = createSlice({
    "name":"Cart Slice",
    initialState:{
        productlist:[],
        quantity:0,
        repeated:{},
        price:0,

    },
    reducers:{
        addproduct(state,action){
            const product =  action.payload.product
            let ispresent=false
            const getprize=()=>{
                let prize = product.price
                if(product.discount){
                  return(getCartPrice(product.price,product.discount))
                  }
                else{
                    return Number(prize.replace(",",""))
                }
            }
            for (let item of state.productlist){
                if (item.id === product.id){ispresent=true}
            }
            if (!ispresent){
                state.productlist.push(product)
                state.quantity +=1
                state.price += getprize()
                state.repeated = {...state.repeated,[product.id]:{
                    price:getprize(),
                    count:1
                }}
            }
            else{
                state.quantity += 1
                state.price+=getprize()
                let price = state.repeated[product.id].price + getprize()
                let count = state.repeated[product.id].count + 1
                state.repeated = {...state.repeated,[product.id]:{
                    price:price,
                    count:count
                }}
            }
           
        }
    }
    
}) 
export const Cartaction = cartSlice.actions
