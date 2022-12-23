import { createSlice } from "@reduxjs/toolkit";

export const authslice = createSlice({
    "name":"authslice",
    initialState:{
        isauthenticated:false,
        token:{
        access:null,
        refresh:null,
    },globalerr:"false",
      loginerr:null,
      loginstatus : 0,
      isloaded:false,
      userinfo:{},
      addwishlistloading:false,
      removewishloading:false,
      signupusername:"",
      signuppassword:"",
      signupemail:"",
      randnumb:0,
      signuperror:""


    },
    reducers:{ 
        setTokens(state,action){
            state.token.access=action.payload.access
            state.token.refresh = action.payload.refresh
            const storageToken = action.payload.refresh
            window.localStorage.setItem("access",JSON.stringify(storageToken))
            window.localStorage.setItem("current",JSON.stringify(action.payload.access))
            state.isauthenticated=true
            state.loginstatus = 200
        },
        seterror(state,action){
            state.loginerr=action.payload.detail
            console.log(action.payload.detail)        
        },
        setstatus(state,action){
            state.loginstatus = 200
        },
        zerostatus(state){
            state.loginstatus=0
        },
        setuserinfo(state,action){
            state.userinfo = action.payload
            state.addwishlistloading = false
            state.removewishloading = false
            state.isloaded = true

        },
        setloader(state){
            state.isloaded = true
        },
        addwishlistloading(state){
            state.addwishlistloading = true
            console.log("setting add to true")
        },
        setremovewishlist(state){
            state.removewishloading = true
            console.log("setting remove to true")
        },
        setisloaded(state){
            state.isloaded = true
        },
        resetuserinfo(state){
            console.log("redux resetting")
            state.userinfo={}
            localStorage.removeItem("current")
            localStorage.removeItem("access")
            state.isloaded = true
        },
        setsignupusername(state,action){
            console.log("setting....sett")
            state.signupusername = action.payload.username
            state.signuppassword = action.payload.password
            state.signupemail = action.payload.email
            state.randnumb = Math.floor(Math.random() * 100000)
        },
        setsignuperror(state,action){
            console.log(action.payload)
            state.signuperror = action.payload

        }

    },
})
export const authActions=authslice.actions