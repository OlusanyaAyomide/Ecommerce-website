import { createSlice } from "@reduxjs/toolkit";

export const authslice = createSlice({
    "name":"authslice",
    initialState:{isauthenticated:false,token:{
        access:"",
        refresh:""
    }},
    reducers:{ 
        setTokens(state,action){
            console.log(action.payload.access)
            state.token.access=action.payload.access
            state.token.refresh = action.payload.refresh
            const storageToken = action.payload.refresh
            console.log(JSON.stringify(storageToken))
            window.localStorage.setItem("access",JSON.stringify(storageToken))
            state.isauthenticated=true
        },
    },

})
export const authActions=authslice.actions