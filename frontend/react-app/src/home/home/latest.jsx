import React,{useEffect,useState} from 'react'
import { MinHeader } from '../components'
import { LatestDemo } from '../../constants'
import { ProductList} from '../components'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function Latests() {

  const Latest= useSelector(state=>state.product.latest)

  const LatestList = Latest.map((item,key)=>{
    return(
      <ProductList name = {item.name} reviews = {item.reviews} url = {item.url} totalR = {item.totalR} price ={item.price} store ={item.store} key ={key} items={item} discount={item.discount}/>
    )
  })

  return (
    <section className='container bg-gradient-to-b from-slate-300 to-[#5858ec]/10'>
      <MinHeader label="Latest Product"/>   
      <div className="row -mx-4 px-4 bg-white rounded-md py-2">
        {LatestList}
      </div> 
    </section>
  )
}
