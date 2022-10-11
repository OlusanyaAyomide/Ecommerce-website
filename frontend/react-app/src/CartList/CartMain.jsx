import React,{useEffect} from 'react'
import Header from '../detail/detail/Header'
import CatHero from './cartlist/CartHero'
import Checkout from './cartlist/Checkout'
import { useSelector,useDispatch } from 'react-redux'
import { RecentFetch } from '../store/datafetch'
import Recent from './cartlist/Recent'

export default function CartMain(){
  const isloaded = useSelector((state=>state.cart.loaded))
  const dispatch = useDispatch(
  useEffect(()=>{
    dispatch(RecentFetch())
  })
  )
  return (
   <>{isloaded && 
   <div>
    <div><Header/></div>
    <div><CatHero/></div>
    <div><Checkout/></div>
    <div><Recent/></div>
  </div>}</>
  )
}
