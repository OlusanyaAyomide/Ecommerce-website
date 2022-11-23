import { createSlice } from "@reduxjs/toolkit";
import { getExactPrice,getCartPrice } from "../home/components";
export const cartSlice = createSlice({
    "name":"Cart Slice",
    initialState:{
        productlist:[],
        quantity:0,
        repeated:{},
        price:0,
        recent:[],
        loaded:false,
        sendToServer:false,
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
                state.repeated = {...state.repeated,[`product${product.id}`]:{
                    price:getprize(),
                    count:1
                }}
            }
            else{
                state.quantity += 1
                state.price+=getprize()
                let price = state.repeated[`product${product.id}`].price + getprize()
                let count = state.repeated[`product${product.id}`].count + 1
                state.repeated = {...state.repeated,[`product${product.id}`]:{
                    price:price,
                    count:count
                }}
            }
           
        },
        reduceproduct(state,action){
            const product = action.payload.product
            const getprize=()=>{
                let prize = product.price
                if(product.discount){
                  return(getCartPrice(product.price,product.discount))
                  }
                else{
                    return Number(prize.replace(",",""))
                }
            }
            const count = state.repeated[`product${product.id}`].count
            const price = state.repeated[`product${product.id}`].price - getprize()
            if (count > 1){
                state.repeated ={...state.repeated,[`product${product.id}`]:{
                    count:count-1,
                    price:price
                }
                }
                state.quantity -=1
                state.price -= getprize()
            }
            else{
                const newList = []
                for (let item of state.productlist){
                    if (item.id !== product.id){
                        newList.push(item)
                    }
                }
                state.productlist = newList
                state.quantity -=1
                state.price -=getprize()
                state.repeated ={...state.repeated,[`product${product.id}`]:{
                    count:0,
                    price:0
                }}
            }
    
    },
    removeproduct(state,action){
        const product = action.payload.product
        const newList =[]
        const count = state.repeated[`product${product.id}`].count
        const price = state.repeated[`product${product.id}`].price
        const intprice = Number(product.price.replace(",",""))
        for (let item of state.productlist){
            if (item.id !== product.id){
                newList.push(item)
            }
        }
        state.productlist = newList
        state.price -= price
        state.quantity -= count
        state.repeated = {...state.repeated,[`product${product.id}`]:{
            count:0,
            price:0
        }}
    },
    setrecent(state,action){
        state.recent = action.payload
        state.loaded=true
    },
    setSendToServer(state,action){
        state.sendToServer = action.payload
    },
    resetCart(state){
        state.productlist=[]
        state.repeated = {}
        state.quantity = 0
        state.price = 0
    }
    },
    
  
}) 
export const Cartaction = cartSlice.actions
