import React,{useEffect} from 'react'
import Header from './category/Header'
import { useDispatch,useSelector } from 'react-redux'
import Trending from './category/Trending'
import { TrendingFetch,AllcategoryStoreFetch,categoryDetailFetch,CategoryHeaderFetch } from '../store/datafetch'
import Allcategory from './category/Allcategory'
import Test from "../Test"
import Footer from '../Footer'
export default function Category() {
    const dispatch = useDispatch()
    const currentId = useSelector((state=>state.category.currentid))
    const {isloaded} = useSelector((state=>state.category))
    // useEffect(()=>{
    
    // },[currentId])
    // useEffect(()=>{

    // },[])

    useEffect(()=>{
      dispatch(categoryDetailFetch(currentId))
      dispatch(TrendingFetch(currentId))
      dispatch(CategoryHeaderFetch(currentId))
    },[currentId])
    useEffect(()=>{
      dispatch(AllcategoryStoreFetch())
      window.scrollTo(0,0)
    },[])
  return (
    <div>
      {isloaded && <div className='bg-[#d1c9b2] '>
        <div className='bg-slate-100'><Header/></div>
        <div><Trending/></div>
        <div><Allcategory/></div>
        <div><Footer/></div>
    </div>}
    {!isloaded && <Test/>}
    </div>
 
  )
}
