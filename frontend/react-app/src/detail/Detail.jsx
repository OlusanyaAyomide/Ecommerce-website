import React from 'react'
import Header from './detail/Header'
import Hero from './detail/Hero'
import Feedback from './detail/Feedback'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function Detail() {
    const location=useLocation()
    const {from} = location.state
    useEffect(()=>{     
    },[])
  return (
    <div>
       <div><Header/></div>
       <div><Hero/></div>
       <div><Feedback/></div>
    </div>
  )
}
