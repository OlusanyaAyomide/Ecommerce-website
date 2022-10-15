import {createSlice} from "@reduxjs/toolkit"

const ProductSlice = createSlice({
    "name":"productSlice",
    initialState:{latest:[],featured:[],featureloaded:false,affiliate:[],search:{
        userinput:"",
        autopredict:[]
    },allcategory:[],loaded:false,page:1,total:"",topdeals:[],mostrated:[]},
    reducers:{
        updateLatest(state,action){
            state.latest = action.payload
        },
        updatefeatured(state,action){
            state.featured = action.payload
            state.featureloaded = true
        },
        updateaffiliate(state,action){
            state.affiliate = action.payload.results
            state.total = Math.ceil(action.payload.count/5)
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
        setnewpage(state,action){
            if (action.payload === true){
                state.page +=1
            }
            else(state.page -=1)
        },
        updatetopdeals(state,action){
            state.topdeals=action.payload
        },
        updatemostrated(state,action){
            state.mostrated = action.payload
        }
    }
})

export const Productactions = ProductSlice.actions
export {ProductSlice}