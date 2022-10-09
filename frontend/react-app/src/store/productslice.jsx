import {createSlice} from "@reduxjs/toolkit"

const ProductSlice = createSlice({
    "name":"productSlice",
    initialState:{latest:[],featured:[],featureloaded:false,affiliate:[],search:{
        userinput:"",
        autopredict:[]
    },allcategory:[],loaded:false},
    reducers:{
        updateLatest(state,action){
            state.latest = action.payload
        },
        updatefeatured(state,action){
            state.featured = action.payload
            state.featureloaded = true
        },
        updateaffiliate(state,action){
            state.affiliate = action.payload
        },
        updateinput(state,action){
            state.search.userinput=action.payload
        },
        updateautopredict(state,action){
            state.search.autopredict=action.payload
        },
        updateallcategory(state,action){
            state.allcategory = action.payload
            state.loaded= true
        },        
    }
})

export const Productactions = ProductSlice.actions
export {ProductSlice}