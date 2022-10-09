import { createSlice } from "@reduxjs/toolkit";

const categoryslice = createSlice({
    "name":"categoryslice",
    initialState:{
        name:{},
        allcategories:[],
        trending:[],
        allstores:[],
        active:false
    },
    reducers:{
        updatename(state,action){
            state.name=action.payload
        },
        changecategory(state,action){
            state.allcategories=action.payload
        },
        findcategory(state,action){
            for(let item of state.allcategories){
                if(item.name === action.payload){
                    state.name = item
                }
            }
        },
        updatetrending(state,action){
            state.trending = action.payload
        },
        updateallstores(state,action){
            state.allstores = action.payload
        },
        setasactive(state){
            state.active = true
        }
    }
})
export const categoryactions = categoryslice.actions
export {categoryslice}