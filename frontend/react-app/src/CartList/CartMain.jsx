import React,{useEffect} from 'react'
import Header from '../detail/detail/Header'
import CatHero from './cartlist/CartHero'
import Checkout from './cartlist/Checkout'
import { useSelector,useDispatch } from 'react-redux'
import { RecentFetch,CheckoutCart } from '../store/datafetch'
import Recent from './cartlist/Recent'
import Test from '../Test'
import Footer from '../Footer'

export default function CartMain(){
  const isloaded = useSelector((state=>state.cart.loaded))
  const {sendToServer} = useSelector((state=>state.cart))
  const {cart} = useSelector((state=>state))
  const accessToken = useSelector((state=>state.auth.token.access))
  console.log(cart)
  console.log(sendToServer)
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(RecentFetch())
  },[])
  useEffect(()=>{
    if (!sendToServer){
      return}
    dispatch(CheckoutCart(cart,accessToken))
  },[sendToServer])


  return (
   <div>{isloaded && 
   <div>
    <div><Header/></div>
    <div><CatHero/></div>
    <div><Checkout/></div>
    <div><Recent/></div>
    <div><Footer/></div>
  </div>}
  {!isloaded && <Test/>}
  </div>
  )
}
