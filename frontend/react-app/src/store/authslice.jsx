import { createSlice } from "@reduxjs/toolkit";

const authslice = createSlice({
    "name":"authslice",
    initialState:{isauthenticated:false,token:{
        access:"",
        refresh:""
    }},
    reducers:{
        
    }
})