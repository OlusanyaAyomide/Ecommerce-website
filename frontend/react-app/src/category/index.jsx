import React,{useEffect} from 'react'
import Header from './category/Header'
import { useLocation } from 'react-router-dom'
import { categoryactions } from '../store/categoryslice'
import { useDispatch,useSelector } from 'react-redux'
import Trending from './category/Trending'
import { TrendingFetch,AllcategoryStoreFetch } from '../store/datafetch'
import Allcategory from './category/Allcategory'
export default function Category() {
    // const allcategories = useSelector((s))
    const location = useLocation()
    const {from} = location.state
    const {all} = location.state
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(categoryactions.updatename(from))  
    },[])
    useEffect(()=>{
        dispatch(categoryactions.changecategory(all))
    },[])
    useEffect(()=>{
      dispatch(TrendingFetch(from))
    })
    useEffect(()=>{
      dispatch(AllcategoryStoreFetch())
    },[])
  return (
    <div className='bg-[#d1c9b2] '>
        <div className='bg-slate-100'><Header/></div>
        <div><Trending/></div>
        <div><Allcategory/></div>

    </div>
  )
}
