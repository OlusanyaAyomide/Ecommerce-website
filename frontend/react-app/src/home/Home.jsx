import React,{useEffect} from 'react'
import  Header  from './home/Header'
import Caetegory from './home/caetegory'
import Latests from './home/latest'
import Affiliate from './home/Affiliate'
import { Latestfetch,AffiliateFetch,AutoPredictFetch,FeaturedFetch,CategoryFetch, TopproductFetch,MostratedFetch } from '../store/datafetch'
import { useSelector,useDispatch } from 'react-redux'
import { detailaction } from '../store/detailslice'
import {categoryactions} from "../store/categoryslice"
import Test from '../Test'
import Footer from '../Footer'


let first = true

export function Home() {
  
  const dispatch = useDispatch()
  const loaded = useSelector((state=>state.product.loaded))
  const pagenumber = useSelector((state=>state.product.page))

  useEffect(()=>{
    dispatch(Latestfetch())
  },[])

  useEffect(()=>{
    dispatch(AffiliateFetch(pagenumber))
  },[pagenumber])
  useEffect(()=>{
    dispatch(TopproductFetch())
  },[])
  useEffect(()=>{
    dispatch(MostratedFetch()
    ) 
  },[])

  useEffect(()=>{
    dispatch(FeaturedFetch())
  },[])
  
  useEffect(()=>{
    if (first){
      first = false
      dispatch(CategoryFetch())
      dispatch(detailaction.setadsactive())
      dispatch(categoryactions.setasactive())
    }

  },[])
    return(
      <div>
      {loaded &&  <div className='bg-[#d1c9b2] '>
        <div className="bg-slate-100"><Header/></div>
        <div><Caetegory/></div>
        <div><Latests/></div>
        <div><Affiliate/></div>
        <div><Footer/></div>
      </div>}
      {!loaded && <><Test/></>}
      </div>
    
    )
}
