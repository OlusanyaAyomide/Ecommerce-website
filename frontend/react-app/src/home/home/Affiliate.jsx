import React,{useState} from 'react'
import { AffiliateDemo,TopListtDemo} from '../../constants'
import { ProductList,TopDealsCom,AffiliateHeader} from '../components'
import { useSelector } from 'react-redux'



export default function Affiliate() {
    // const [Stores,setStores] = useState(AffiliateDemo)
    const Stores=useSelector((state=>state.product.affiliate))
    const StoreList = Stores.map((items,key)=>{
        return(
            <div key = {key}>
                {key == 2 && <div>
                <AffiliateHeader label ="Top Deals For You"/>
                <div className='flex py-1 bg-white overflow-auto -mx-4 px-4 shadow-lg items-center md:justify-center mt-2'>
                    {TopListtDemo.map((item,key3)=>{
                   return( <TopDealsCom key ={key3} image ={item.url} name ={item.name} price = {item.price}/>)
                })}
                </div>
                    </div>}
                {key == 3 && <div>
                <AffiliateHeader label ="Amazing offers Not To Miss"/>
                <div className='flex py-1 bg-white overflow-auto -mx-4 px-4 shadow-lg items-center md:justify-center mt-2'>
                    {TopListtDemo.map((item,key3)=>{
                   return( <TopDealsCom key ={key3} image ={item.url} name ={item.name} price = {item.price}/>)
                })}
                </div>
                    </div>}
                <div className='py-1 flex justify-center text-white my-2 bg-gradient-to-b from-slate-400 to-[#5858ec]/60 font-semibold text-[20px]'><span>{items.store}</span></div>
                <div className='row bg-white container'>
                {items.Products.map((item,key2)=>{
                    return(
                          <ProductList name = {item.name} reviews = {item.reviews} url = {item.url} totalR = {item.totalR} price ={item.price} store ={item.store} key ={key2} items={item} discount={item.discount}/>
                    )
                })}
                </div>
            </div>
        )
    })
  return (
    <section className="bg-gradient-to-b from-slate-300 to-[#5858ec]/10">
           {StoreList} 
    </section>
  )
}
