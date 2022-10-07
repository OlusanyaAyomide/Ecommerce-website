import React,{useEffect} from 'react'
import  Header  from './home/Header'
import Caetegory from './home/caetegory'
import Latests from './home/latest'
import Affiliate from './home/Affiliate'
import { Latestfetch,AffiliateFetch,AutoPredictFetch,FeaturedFetch,CategoryFetch } from '../store/datafetch'
import { useSelector,useDispatch } from 'react-redux'


let first = true

export function Home() {
  
  const dispatch = useDispatch()
  const UserInput = useSelector((state=>state.product.search.userinput))

  useEffect(()=>{
    dispatch(Latestfetch())
  },[])

  useEffect(()=>{
    dispatch(AffiliateFetch())
  },[])

  useEffect(()=>{
    dispatch(FeaturedFetch())
  },[])
  
  useEffect(()=>{
    dispatch(CategoryFetch())
  },[])
    return(
      <div className='bg-[#d1c9b2] '>
        <div className="bg-slate-100"><Header/></div>
        <div><Caetegory/></div>
        <div><Latests/></div>
        <div><Affiliate/></div>
      </div>
    
    )
}
