import React from 'react'
import Header from './detail/Header'
import Hero from './detail/Hero'
import Feedback from './detail/Feedback'
import { useEffect,useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { DetailFetch,SimilarFetch } from '../store/datafetch'
import Similar from './detail/Similar'
import Review from "./detail/Review"
import { detailaction } from '../store/detailslice'

export default function Detail() {
    const isloaded = useSelector((state=>state.detail.loaded))
    const render = useSelector((state=>state.detail.render))
    const dispatch = useDispatch()
    const location=useLocation()
    const [first,setfirst] = useState(false)
    const curID= useSelector((state=>state.detail.curId))
    const {from} = location.state
    const Select = !first?from.id:curID



    useEffect(()=>{
      dispatch(SimilarFetch(Select))
    },[curID])
    
    useEffect(()=>{  
        dispatch(DetailFetch(Select))
    },[curID])
    useEffect(()=>{
      window.scrollTo(0,0)
      setfirst(true)
      dispatch(detailaction.setrender(true))
    })
    
  return (
    <>
   {isloaded && render && <div>
        <div><Header/></div>
       <div><Hero/></div>
       <div><Feedback/></div>
       <div><Review/></div>
       <div><Similar/></div>
    </div>}
    </>
  )
}
