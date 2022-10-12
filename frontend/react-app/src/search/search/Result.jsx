import React from 'react'
import { useSelector } from 'react-redux'
import { MinHeaderDy } from '../../home/components'
import { ProductList } from '../../home/components'

export default function Result() {
  const searchproduct = useSelector((state=>state.search.searchlist))
  const searchList = searchproduct.map((item,key)=>{
     return(
      <ProductList name = {item.name} reviews = {item.reviews} url = {item.url} totalR = {item.totalR} price ={item.price} store ={item.store} key ={key} items={item} discount={item.discount}/>
     )
  })
  const params = useSelector((state=>state.search.params))
  return (
    <section className="container bg-gradient-to-b from-slate-300 to-[#5858ec]/10">
      <MinHeaderDy label ={`Results for ${params} (${searchproduct.length} results)`} left={100}/>
      <div className="row -mx-4 px-4 bg-white rounded-md py-2">
        {searchList}
      </div> 
    </section>
  )
}
