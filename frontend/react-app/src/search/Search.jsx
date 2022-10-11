import React from 'react'
import Header from './search/Header'
import CartHero from '../CartList/cartlist/CartHero'
import { useSelector,useDispatch } from 'react-redux'
import { SearchFetch } from '../store/datafetch'
import { useEffect } from 'react'

export default function Search() {
  const dispatch = useDispatch()
  const userInput = useSelector((state=>state.search.params))
  console.log(userInput)
  useEffect(()=>{
    dispatch(SearchFetch(userInput))
  },[userInput])
  return (
    <>
    <div><Header/></div>
    <div><CartHero/></div>
    </>
  )
}
