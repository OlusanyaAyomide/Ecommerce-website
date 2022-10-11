import React from 'react'
import { useSelector } from 'react-redux'
import { MinHeader4,ProductList } from '../../home/components'


export default function Recent() {
    const recent = useSelector((state=>state.cart.recent))

    const RecentList = recent.map((item,key)=>{
        return(
          <ProductList name = {item.name} reviews = {item.reviews} url = {item.url} totalR = {item.totalR} price ={item.price} store ={item.store} key ={key} items={item} discount={item.discount}/>
        )
      })
    
      return (
        <section className='container bg-gradient-to-b from-slate-300 to-[#5858ec]/10'>
          <MinHeader4 label="Receently Viewed"/>   
          <div className="row -mx-4 px-4 bg-white rounded-md py-2">
            {RecentList}
          </div> 
        </section>
    )
}
    

