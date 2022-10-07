import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    "name":"Cart Slice",
    initialState:{
        productlist:[],
        quantity:2,
        price:0
    }
}) 