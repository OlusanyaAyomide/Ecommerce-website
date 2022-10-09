import { createSlice } from "@reduxjs/toolkit";

export const Detailslice =createSlice({
    name:"DetailSlice",
    initialState:{product:{},loaded:false,active:false,similarproduct:[],curId:0},
    reducers:{
        setproduct(state,action){
            state.product=action.payload
            state.loaded=true
        },
        setadsactive(state){
            state.active= true
        },
        setsimilarproduct(state,action){
            state.similarproduct = action.payload
        },
        updatecurrentid(state,action){
            state.curId = action.payload
        }

    }
})
export const detailaction = Detailslice.actions