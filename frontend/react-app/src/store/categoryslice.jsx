import { createSlice } from "@reduxjs/toolkit";

const categoryslice = createSlice({
    "name":"categoryslice",
    initialState:{
        name:{},
        allcategories:[],
        trending:[],
        allstores:[],
        active:false,
        currentid:0,
        isloaded:false
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
            state.isloaded = true
        },
        setasactive(state){
            state.active = true
        },
        setCategoryID(state,action){
            state.currentid=action.payload
        }
        
    }
})
export const categoryactions = categoryslice.actions
export {categoryslice}