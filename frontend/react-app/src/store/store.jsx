import { configureStore } from "@reduxjs/toolkit";
import { ProductSlice } from "./productslice";
import { cartSlice } from "./cartslice";
import { categoryslice } from "./categoryslice";
import { Detailslice } from "./detailslice";

export const store = configureStore({
    reducer:{
        product:ProductSlice.reducer,
        cart:cartSlice.reducer,
        category:categoryslice.reducer,
        detail:Detailslice.reducer,
        cart:cartSlice.reducer,
    }
})