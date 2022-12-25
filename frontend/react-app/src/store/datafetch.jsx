import React from 'react'
import { LatestDemo} from '../constants'
import { categoryactions } from './categoryslice'
import { Productactions } from './productslice'
import { detailaction } from './detailslice'
import { Cartaction } from './cartslice'
import { searchaction } from './searchslice'
import { authActions } from './authslice'
import { reviewactions } from './reviewslice'



// const host = "http://127.0.0.1:8000"
const host = "https://ecommerce.pythonanywhere.com/"

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
    let status;
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
export function MostratedFetch(){
    let status = 0
    return async(dispatch)=>{
        async function FetchApi(){
            const res = await fetch(`${host}/rated`)
            status = res.status
            const data = res.json()
            return data
        }
        try{
            const response = await FetchApi()
            if(status  === 200){
                dispatch(Productactions.updatemostrated(response))
            }
        }
        catch{}
    }
}


export function AutoPredictFetch(prop){
    // console.log(prop)
    // return async(dispatch)=>{
    //     return dispatch(Productactions.updateautopredict(Searchresults))
    // }
    let status;
    return async(dispatch)=>{
        async function FetchApi(){
            const res = await fetch(`${host}/predict?param=${prop}`)
            status = res.status
            const data =await res.json()
            return data
        }
        try{
            const data = await FetchApi()
            return dispatch(Productactions.updateautopredict(data))
        }
        catch{}
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
            const response = await FetchApi()
            return dispatch(Productactions.updateallcategory(response))
        }
        catch{}   
    }
}

export function TrendingFetch(prop){
    let status = 200
    return async(dispatch)=>{
            async function FetchApi(){
            const res = await fetch(`${host}/catrending/${prop}`)
            status = res.status
            const data = await res.json()
            return data
        }
        try{
            if (status == 200){
                const data = await FetchApi()
                if (status == 200){
                    return dispatch(categoryactions.updatetrending(data))
                }
            }
        }
        catch(err){
            console.log(err)
        }
        // return dispatch(categoryactions.updatetrending(TopListtDemo))
    }
}
export function AllcategoryStoreFetch(){
        return async (dispatch)=>{
            return dispatch(categoryactions.updateallstores(LatestDemo))
        }
}

export function categoryDetailFetch(prop){
    let status
    return async(dispatch)=>{
        async function FetchApi(){
            const res = await fetch(`${host}/category/${prop}`) 
            status = res.status
            const data = await res.json()
            return data
        }
        try{
            const response = await FetchApi()
            return dispatch(categoryactions.updateallstores(response))
        }
        catch(err){console.log(err)}
    }
}

export function CategoryHeaderFetch(prop){
    let status
    return async(dispatch)=>{
        async function FetchApi(){
            const res = await fetch(`${host}/categoryheader/${prop}`) 
            status = res.status
            const data = await res.json()
            return data
        }
        try{
            const response = await FetchApi()
            return dispatch(categoryactions.updatename(response))
        }
        catch(err){console.log(err)}
    }
}

export function DetailFetch(prop){
    let status = 200
    const anonymous = window.localStorage.getItem("anonymous")
    return async(dispatch)=>{
            async function FetchApi(){
                const res = await fetch(`${host}/detail/${prop}/${anonymous}`)
                status = res.status
                const data = await res.json()
                return data
            }
            try{
                const response = await FetchApi()
                if (status === 200){
                    dispatch(detailaction.setproduct(response)) 
                }
            }
            catch{}
    }
}
export function SimilarFetch(prop){
    let status
    return async(dispatch)=>{ 
        async function FetchApi(){
            const res = await fetch(`${host}/similar/${prop}`)
            status = res.status
            const data = await res.json()
            return data
        }
        try{
            const response = await FetchApi()
            if (status === 200){
                dispatch(detailaction.setsimilarproduct(response))
            }
        }
        catch{}
    }
}
export function RecentFetch(){
    const key = window.localStorage.getItem("anonymous")
    let status = 0
    console.log(key)
    return async(dispatch)=>{
        async function FetchApi(){
            const res = await fetch(`${host}/recent/${key}`)
            status = res.status
            const data = await res.json()
            return data
        }
        try{
            const response = await FetchApi()
            if (status === 200){
                return dispatch(Cartaction.setrecent(response))
            }
        }
        catch(err){console.log(err)}
      
    }
}

export function SearchFetch(prop){
    console.log(prop)
    let status;
    return async(dispatch)=>{
        async function FetchApi(){
            const res = await fetch(`${host}/search?param=${prop}`)
            status = res.status
            const data = await res.json()
            return data
        }
        try{
            const response = await FetchApi()
            if(status === 200){
                return dispatch(searchaction.updatesearch(response))
        }
        }
        catch(err){console.log(err)}
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
                console.log(response)
                dispatch(authActions.setTokens(response))
                console.log(response)   
            }
            else{
                dispatch(authActions.resetuserinfo())
                
            }
       
        }
        catch{"error encoutered"}
    }
}
export function LoginFetch(username,password){
    let status=0
    // console.log(username,password)
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
            dispatch(authActions.setTokens(response))
    
        }
            else(
                dispatch(authActions.seterror(response))
            )
        }
        catch(err){console.log(err)}
    }
}

export function CheckoutCart(products,token){
    let status = 0
    return async(dispatch)=>{
        async function FetchApi(){
            const res = await fetch(`${host}/checkout`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": `Bearer ${token}`
                },
                body:JSON.stringify(products)
            })
            const data = await res.json()
            status = res.status
            return data
        }
        try{
            const response = await FetchApi()
            console.log(response)
            if (status == 200){
                console.log("dispatching......")
                dispatch(Cartaction.resetCart())
                dispatch(Cartaction.setSendToServer(false))
            }
        }
        catch(err){console.log(err)}
    }
}

export function Userinfo(token){
    let status = 0
    return async(dispatch)=>{
        async function FetchApi(){
            const res = await fetch(`${host}/profile`,{
                method : "POST",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": `Bearer ${token}`}
            }) 
            status = res.status
            const data = await res.json()
            return data
        }
        try{
            const response = await FetchApi()
            if (status == 200){
                console.log(response)
               dispatch(authActions.setuserinfo(response))
            }
        }
        catch(err){console.log(err)}   
    }
}

export function WishListAdd(productid,token){
    let status = 0;
    return async(dispatch)=>{
        async function FetchApi(){
            const res = await fetch(`${host}/wishlist/${productid}`,{
                method : "POST",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": `Bearer ${token}`}
            }) 
            status = res.status
            const data = await res.json()
            return data
        }
        try{
            const response = await FetchApi()

            if(status ==200){
                dispatch(authActions.setuserinfo(response))
            }
        }
        catch(err){console.log(err)}
    }
}

export function WishListRemove(productid,token){
    let status = 0;
    return async(dispatch)=>{
        async function FetchApi(){
            const res = await fetch(`${host}/wishlistremove/${productid}`,{
                method : "POST",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": `Bearer ${token}`}
            }) 
            status = res.status
            const data = await res.json()
            return data
        }
        try{
            const response = await FetchApi()

            if(status ==200){
                dispatch(authActions.setuserinfo(response))
            }
        }
        catch(err){console.log(err)}
    }
}


export function CreateReview(token,productid,comment,title,rating){
    let status = 0;
    return async(dispatch)=>{
        async function FethcApi(){
            const res = await fetch(`${host}/review-create/${productid}`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body:JSON.stringify({
                    "title":title,
                    "comment":comment,
                    "rating":rating
                })
            })
            status = res.status
            const data = await res.json()
            console.log(data)
            return data
        }
        try{
            const response = await FethcApi()
            // console.log(response)
            console.log(status)
            if (status === 200){
                dispatch(authActions.setuserinfo(response))
                console.log(response)
                dispatch(reviewactions.setReviewStatus(status))
            } 
            console.log(response)
        }
        catch(err){
            console.log(err)
        }

    }
}

export function googlesignupLogin(username,password,email,bool){
    console.log(username, "is heree")
    return async (dispatch)=>{
        async function TryLogin(){
            const res = await fetch(`${host}/usersignup`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    "username":username,
                    "password":password,
                    "email":email
                })
            })
            const status = res.status
            const data = await res.json()
            console.log(data)
            if (status == 200 || status == 201){
                console.log(data.username)
                dispatch(LoginFetch(username,password))
            }   
            else{
                dispatch(authActions.setsignuperror(data))
            }
            console.log(data)
            console.log(status)
        }
        try{
            const response = await TryLogin()
        }
        catch(err){console.log(err)}
    }
}