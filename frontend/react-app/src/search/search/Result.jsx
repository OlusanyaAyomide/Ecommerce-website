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
      <MinHeaderDy label ={`Results for ${params} (${searchproduct.length} result${searchproduct.length>1?"s":""})`} left={100}/>
      {searchproduct.length > 0 && <div className="row -mx-4 px-4 bg-white rounded-md py-2">
        {searchList}
      </div>}
      {searchproduct.length < 1 && <div className='row flex rounded-lg h-[100px] md:h-[200px] items-center justify-center shadow  shadow-gray-700'>
          <h1 className='md:text-lg  font-semibold shadow-lg px-6 rounded-md shadow-[#5858ec]/90'>No Product Match your search query</h1>
      </div>}
    </section>
  )
}
