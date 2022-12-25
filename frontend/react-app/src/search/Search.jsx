import React from 'react'
import Header from './search/Header'
import CartHero from '../CartList/cartlist/CartHero'
import { useSelector,useDispatch } from 'react-redux'
import { SearchFetch } from '../store/datafetch'
import { useEffect } from 'react'
import Result from './search/Result'
import Test from '../Test'
import Footer from '../Footer'

export default function Search() {
  const dispatch = useDispatch()
  const userInput = useSelector((state=>state.search.params))
  const loaded= useSelector((state=>state.search.loaded))
  console.log(userInput)
  console.log(loaded)
  useEffect(()=>{
    dispatch(SearchFetch(userInput))
  },[userInput])
  return (
    <div> {loaded && 
    <div>
      <div><Header/></div>
      <div><CartHero/></div>
      <div><Result/></div>
      <div><Footer/></div>
    </div>}
    {!loaded && <Test/>}</div>
  )
}
