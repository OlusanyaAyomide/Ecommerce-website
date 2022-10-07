import React from 'react'
import { LatestDemo,AffiliateDemo,Searchresults,categories,SlideImage,TopListtDemo,ProductDetailDemo } from '../constants'
import { categoryactions } from './categoryslice'
import { Productactions } from './productslice'
import { detailaction } from './detailslice'



export function Latestfetch() {
    return async(dispatch)=>{
        return dispatch(Productactions.updateLatest(LatestDemo))
    }
}
export function AffiliateFetch(){
    return async(dispatch)=>{
        return dispatch(Productactions.updateaffiliate(AffiliateDemo))
    }
}

export function AutoPredictFetch(prop){
    console.log(prop)
    return async(dispatch)=>{
        return dispatch(Productactions.updateautopredict(Searchresults))
    }
}
export function FeaturedFetch(){
    return async(dispatch)=>{
        return dispatch(Productactions.updatefeatured(SlideImage))
    }
}

export function CategoryFetch(){
    return async(dispatch)=>{
        return dispatch(Productactions.updateallcategory(categories))
    }
}

export function TrendingFetch(prop){
    return async(dispatch)=>{
        return dispatch(categoryactions.updatetrending(TopListtDemo))
    }
}
export function AllcategoryStoreFetch(){
    return async(dispatch)=>{
        return dispatch(categoryactions.updateallstores(LatestDemo))
    }
}
export function DetailFetch(){
    return async(dispatch)=>{
        return dispatch(detailaction.setproduct(ProductDetailDemo.detail))
    }
}


