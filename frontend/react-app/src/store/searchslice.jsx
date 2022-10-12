import { createSlice } from "@reduxjs/toolkit";

export const SearchSlice=createSlice({
    "name":"search Slice",
    initialState:{
        params:null,
        searchlist:[],
        loaded:false
    },
    reducers:{
        updateparams(state,action){
            console.log(action.payload)
            state.params=action.payload
        },
        updatesearch(state,action){
            state.searchlist=action.payload
            state.loaded=true
            console.log(state.loaded)
        },
        updatestatus(state){
            state.loaded=false
        }

    }
})
export const searchaction = SearchSlice.actions