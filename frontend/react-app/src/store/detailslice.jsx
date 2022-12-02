import { createSlice } from "@reduxjs/toolkit";

export const Detailslice =createSlice({
    name:"DetailSlice",
    initialState:{
        product:{},
        loaded:false,
        active:false,
        similarproduct:[],
        curId:0,
        render:false,
        popout:false,
        activeproduct:0,
    },
    reducers:{
        setproduct(state,action){
            state.product=action.payload
            state.activeproduct = action.payload.detail.id
            state.loaded=true
            state.render=true

        },
        setadsactive(state){
            state.active= true
        },
        setsimilarproduct(state,action){
            state.similarproduct = action.payload
        },
        updatecurrentid(state,action){
            state.curId = action.payload
        },
        setrender(state,action){
            state.render=action.payload
        },
        setpopout(state,action){
            state.popout = action.payload
        },
    

    }
})
export const detailaction = Detailslice.actions