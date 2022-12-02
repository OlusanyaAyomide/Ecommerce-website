import { createSlice } from "@reduxjs/toolkit";

const ReviewSlice = createSlice({
    name:"review-slice",
    initialState:{
        currentlyViewed:{},
        toggle:false,
        reviewing:false,
        reviewstatus:0,
        details:{
            comment:"",
            rating:"",
            title:"",
            id:0,
        },
        removedId :0,
    },
    reducers:{
        setViewed(state,action){
            state.currentlyViewed = action.payload
        },
        setToggle(state,action){
            state.toggle = action.payload
        },
        setReviewDetail(state,{payload}){
            const details = state.details
            const currentlyViewed = state.currentlyViewed
            const id = currentlyViewed.id
            const {comment2,rating2,title2} = payload
            details.comment = comment2
            details.rating = rating2
            details.title = title2
            details.id = id
        },
        setReviewStatus(state){
            console.log("Setting")
            state.reviewstatus = 200
        },
        revertstatus(state){
            state.reviewstatus = 0
        },
        setRemoved(state,action){
            state.removedId = action.payload
        }
    }
})
export const reviewactions = ReviewSlice.actions
export {ReviewSlice}

