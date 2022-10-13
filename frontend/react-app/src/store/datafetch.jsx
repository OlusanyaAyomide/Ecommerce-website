import React from 'react'
import { LatestDemo,AffiliateDemo,Searchresults,categories,SlideImage,TopListtDemo,ProductDetailDemo,SimilarProduct,ProductDetailDemo2,ProductDetailDemo3  } from '../constants'
import { categoryactions } from './categoryslice'
import { Productactions } from './productslice'
import { detailaction } from './detailslice'
import { Cartaction } from './cartslice'
import { searchaction } from './searchslice'
import { authActions } from './authslice'
import { useSelector } from 'react-redux'


const host = "http://127.0.0.1:8000"

export function Latestfetch() {
    let status = 0
    return async(dispatch)=>{
        async function FetchApi(){
           const res = await fetch(`${host}/latest`) 
           status = res.status
           const data = await res.json()
           return data
        }
        try{
            const response = await FetchApi()
            if (status===200){
                return dispatch(Productactions.updateLatest(response))
            }
        }
        catch{}
    }
}
export function AffiliateFetch(prop){
    console.log(prop)
    let status;
    console.log("hereee")
    return async(dispatch)=>{
        async function FetchApi(){
            const res =await fetch(`${host}/store?page=${prop}`)
            status = res.status
            const data = await res.json()
            return data
        }
        try{
            const response = await FetchApi()
            if (status === 200){
                console.log(response)
                return dispatch(Productactions.updateaffiliate(response))
            }
        }
        catch(err){console.log(err)}
        
    }
}

export function TopproductFetch(prop){
    let status = 200
    return async(dispatch)=>{
        async function FetchApi(){
            const res = await fetch(`${host}/topdeals`)
            status = res.status
            const data = res.json()
            return data
        }
        try{
            const response = await FetchApi()
            if (status === 200){
                dispatch(Productactions.updatetopdeals(response))
            }
        }
        catch{}
    }
}

export function AutoPredictFetch(prop){
    return async(dispatch)=>{
        return dispatch(Productactions.updateautopredict(Searchresults))
    }
}
export function FeaturedFetch(){
    let status;
    return async(dispatch)=>{
        async function FetchApi(){
            const res = await fetch(`${host}/featured`)
            status = res.status
            const data =await res.json()
            return data
        }
        try{
            const data =await FetchApi()
            return dispatch(Productactions.updatefeatured(data))
        }
        catch{}
    }
}
export function CategoryFetch(){
    let status = 0
    return async(dispatch)=>{
        async function FetchApi(){
            const res = await fetch(`${host}/category`) 
            status = res.status
            const data = await res.json()
            return data
        }
        try{
            const data = await FetchApi()
            return dispatch(Productactions.updateallcategory(data))
        }
        catch{}
   
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
    console.log(prop)
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
    let status =0
    return async(dispatch)=>{
        async function FetchToken(){
            const res = await fetch(`${host}/auth/api/token/refresh`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({"refresh":token})
            })
            status =res.status
            const data =await res.json()
            return data
        }
        try{
            const response =await FetchToken()
            if (status===200){
                dispatch(authActions.setTokens(response))}
       
        }
        catch{"error encoutered"}
    }
}
export function LoginFetch(username,password){
    let status=0
    console.log()
    return async(dispatch)=>{
        async function login(){
            const res = await fetch(`${host}/auth/api/token`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"},
                    body:JSON.stringify({
                        "username":username,
                        "password":password})
                })
         
            status = res.status
            const data = await res.json()
            return data
        }
        try{
            const response = await login()
            if(status === 200){
            dispatch(authActions.setstatus(200))
            dispatch(authActions.setTokens(response))}
            else(
                dispatch(authActions.seterror(response))
            )
        }
        catch{console.log("err")}
    }
}