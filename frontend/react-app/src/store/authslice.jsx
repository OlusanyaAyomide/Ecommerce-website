import { createSlice } from "@reduxjs/toolkit";

export const authslice = createSlice({
    "name":"authslice",
    initialState:{isauthenticated:false,token:{
        access:null,
        refresh:null,
    },globalerr:"false",
      loginerr:null,
      loginstatus : 0},
    reducers:{ 
        setTokens(state,action){
            console.log(action.payload.access)
            state.token.access=action.payload.access
            state.token.refresh = action.payload.refresh
            const storageToken = action.payload.refresh
            window.localStorage.setItem("access",JSON.stringify(storageToken))
            state.isauthenticated=true
        },
        seterror(state,action){
            state.loginerr=action.payload.detail
            console.log(action.payload.detail)        
        },
        setstatus(state,action){
            state.loginstatus = 200
        }
    },

})
export const authActions=authslice.actions