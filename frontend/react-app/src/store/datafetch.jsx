import React from 'react'
import { LatestDemo,AffiliateDemo,Searchresults,categories,SlideImage,TopListtDemo,ProductDetailDemo,SimilarProduct,ProductDetailDemo2,ProductDetailDemo3  } from '../constants'
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
export function DetailFetch(prop){
    return async(dispatch)=>{
        console.log(prop)
        if(prop <4){
            console.log("low is here")
             return dispatch(detailaction.setproduct(ProductDetailDemo))}
        if(prop >=3 && prop < 7 ){
            console.log("Med is here")
            return dispatch(detailaction.setproduct(ProductDetailDemo2))}
        if(prop >=7){
            console.log("Top is here")
             return dispatch(detailaction.setproduct(ProductDetailDemo3))}
    
    }
}
export function SimilarFetch(prop){
    console.log(prop)
    return async(dispatch)=>{ 
        return dispatch(detailaction.setsimilarproduct(SimilarProduct))
    }
}


