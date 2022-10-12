import React from 'react'
import { LatestDemo,AffiliateDemo,Searchresults,categories,SlideImage,TopListtDemo,ProductDetailDemo,SimilarProduct,ProductDetailDemo2,ProductDetailDemo3  } from '../constants'
import { categoryactions } from './categoryslice'
import { Productactions } from './productslice'
import { detailaction } from './detailslice'
import { Cartaction } from './cartslice'
import { searchaction } from './searchslice'
import { authActions } from './authslice'


const host = "http://127.0.0.1:8000"

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
        if(prop <4){
             return dispatch(detailaction.setproduct(ProductDetailDemo))}
        if(prop >=3 && prop < 7 ){
            return dispatch(detailaction.setproduct(ProductDetailDemo2))}
        if(prop >=7){
             return dispatch(detailaction.setproduct(ProductDetailDemo3))}
    
    }
}
export function SimilarFetch(prop){
    return async(dispatch)=>{ 
        return dispatch(detailaction.setsimilarproduct(SimilarProduct))
    }
}
export function RecentFetch(){
    return async(dispatch)=>{
        return dispatch(Cartaction.setrecent(LatestDemo))
    }
}

export function SearchFetch(prop){
    console.log(prop)
    return async(dispatch)=>{
        return dispatch(searchaction.updatesearch(LatestDemo))
    }
}

export function InitiaTokenFetch(token){
    console.log(token)
    return async(dispatch)=>{
        async function FetchToken(){
            const res = await fetch(`${host}/auth/api/token/refresh`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({"refresh":token})
            })
            const data =await res.json()
            console.log(data)
            return data
        }
        try{
            const response =await FetchToken()
            const test = await dispatch(authActions.setTokens(response))
       
        }
        catch{"error encoutered"}
    }
}
