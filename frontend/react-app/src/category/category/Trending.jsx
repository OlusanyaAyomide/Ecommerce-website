import React from 'react'
import { useSelector } from 'react-redux'
import { CatHeaeder2 } from '../../home/components'
import { ProductList } from '../../home/components'

export default function Trending() {
    const trending = useSelector((state=>state.category.trending))
    const trendingList = trending.map((item,key)=>{
        return(
        <ProductList name = {item.name} reviews = {item.reviews} url = {item.url} totalR = {item.totalR} price ={item.price} store ={item.store} key ={key} items={item} discount={item.discount}/>
        )
    })
  return (
    <section className="container ">
        <div className='-mx-4 md:-mx-6 pt-2'>
            <div className='bg-slate-200'>
             {trending.length > 1 && <CatHeaeder2 name ="Trending Products" />}
            </div>
        </div>
        <div className="row -mx-4 px-4 bg-white rounded-md py-2">
        {trendingList}
      </div> 
      
    </section>
  )
}
