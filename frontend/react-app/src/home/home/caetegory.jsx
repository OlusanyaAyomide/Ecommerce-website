import React from 'react'
import {Link} from "react-router-dom"
import { useSelector } from 'react-redux'

export default function Caetegory() {
    
    const CategoryList = useSelector((state=>state.product.allcategory))
    const FilterList = CategoryList.map((item,key)=>{
        return(
            <div className='mx-2' key={key}>
                <div className='h-24 w-24 rounded-xl overflow-hidden'>
                    <Link to ={'/category'} state={{all:CategoryList,from:item}}><img src={item.image} alt="image" className='full-image'/></Link>
                </div>
                <h3 className='text-[12px] font-semibold text-center'>{item.name}</h3>
            </div>

        )
    })
  return (
    <section className="container py-3 bg-gradient-to-r from-slate-200 to-[#5858ec]/10 overflow-auto">
        <div className='flex py-1 bg-white overflow-auto -mx-4 px-4 shadow-lg items-center md:justify-center'>
            {FilterList}
        </div>    
    </section>
  )
}
