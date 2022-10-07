import { createSlice } from "@reduxjs/toolkit";

export const Detailslice =createSlice({
    name:"DetailSlice",
    initialState:{product:{}},
    reducers:{
        setproduct(state,action){
            state.product=action.payload

        }
    }
})
export const detailaction = Detailslice.actions