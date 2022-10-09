import React from 'react'
import { CatHeaeder2 } from '../../home/components'
import { useSelector } from 'react-redux'
import { ProductList } from '../../home/components'

export default function Allcategory() {
    const Allproducts = useSelector((state=>state.category.allstores))
    const AllProductList = Allproducts.map((item,key)=>{
        return(
            <ProductList name = {item.name} reviews = {item.reviews} url = {item.url} totalR = {item.totalR} price ={item.price} store ={item.store} key ={key} items={item} discount={item.discount}/>)
    })
  return (
   <section className='container'>
        <div>
            <div className='-mx-4 md:-mx-6 pt-2'>
                <div className='bg-slate-200'>
                 <CatHeaeder2 name ="All Products" />
                </div>
            </div>
        </div>
        <div>
            <div className="row -mx-4 px-4 bg-white rounded-md py-2">
            {AllProductList}
          </div> 
        </div>
   </section>
  )
}
