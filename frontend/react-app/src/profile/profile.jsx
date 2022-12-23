import React,{useEffect,useState} from 'react'
import Header from '../detail/detail/Header'
import CatHero from "../CartList/cartlist/CartHero"
import Review from './profile/Review'
import Purchased from './profile/purchased'
import { useSelector,useDispatch } from 'react-redux'
import {CreateReview,RecentFetch,WishListRemove} from '../store/datafetch'
import Wishlist from './profile/wishlist'
import { detailaction } from '../store/detailslice'
import Recent from '../CartList/cartlist/Recent'


export default function Profile() {
  const  {toggle,details,removedId} = useSelector((state=>state.review))
  const [pagetoggle,setpagetoggle] =  useState(false)
  const [firrsrender,setfirstrender] = useState(true)
  const {id,comment,title,rating} = details
  const Token = useSelector((state=>state.auth.token.access))
  const isloaded = useSelector((state=>state.cart.loaded))
  const dispatch = useDispatch()
  const purchasedList = useSelector((state=>state.auth.userinfo))
  console.log(purchasedList)
  useEffect(()=>{
    dispatch(detailaction.setadsactive())
    if (firrsrender){return}
    dispatch(CreateReview(Token,id,comment,title,rating))
  },[comment,rating,title])
  useEffect(()=>{
    if  (firrsrender){return}
    dispatch(WishListRemove(removedId,Token))
  },[removedId])
  useEffect(()=>{
    dispatch(RecentFetch())
  },[])


  useEffect(()=>{
    if (firrsrender){
      setfirstrender(false)
      return}
      setpagetoggle(toggle)
  },[toggle])

  return (
    <div>
        {isloaded && <div className='relative'>
        <Header/>
        <CatHero/>
        <Wishlist/>
        <Purchased/>
        <Recent/>
        {pagetoggle && <Review/>}
    </div>}
    </div>

  )
}
