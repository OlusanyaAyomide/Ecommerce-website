import { createSlice } from "@reduxjs/toolkit";

export const SearchSlice=createSlice({
    "name":"search Slice",
    initialState:{
        params:"",
        searchlist:[]
    },
    reducers:{
        updateparams(state,action){
            console.log(action.payload)
            state.params=action.payload
        },
        updatesearch(state,action){
            state.searchlist=action.payload
        }
    }
})
export const searchaction = SearchSlice.actions