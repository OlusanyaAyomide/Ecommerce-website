import React,{useState} from 'react'
import { AffiliateDemo,TopListtDemo} from '../../constants'
import { ProductList,TopDealsCom,AffiliateHeader} from '../components'
import { useSelector,useDispatch } from 'react-redux'
import { Productactions } from '../../store/productslice'



export default function Affiliate() {
    // const [Stores,setStores] = useState(AffiliateDemo)
    const Stores=useSelector((state=>state.product.affiliate))
    const pagenumber = useSelector((state=>state.product.page))
    const lastpage = useSelector((state=>state.product.total))
    const TopListDemo = useSelector((state=>state.product.topdeals))
    const Mostrated = useSelector((state=>state.product.mostrated))
    const dispatch = useDispatch()
    
    function handlepagination(prop){
        if(!prop && pagenumber > 1){
            dispatch(Productactions.setnewpage(prop))
        }
        if(prop && pagenumber < lastpage){
            dispatch(Productactions.setnewpage(prop))
        }
    }
    const StoreList = Stores.map((items,key)=>{
        return(
            <div key = {key}>
                {key == 2 && <div>
                <AffiliateHeader label ="Top Deals For You"/>
                <div className='flex py-1 bg-white overflow-auto -mx-4 px-4 shadow-lg  mt-2'>
                    {TopListDemo.map((item,key3)=>{
                   return( <TopDealsCom key ={key3} image ={item.url} name ={item.name} price = {item.price} item={item}/>)
                })}
                </div>
                    </div>} 
                {key == 3 && <div>
                <AffiliateHeader label ="Check out our most rated products"/>
                <div className='flex py-1 bg-white overflow-auto -mx-4 px-4 shadow-lg items-center  mt-2'>
                    {Mostrated.map((item,key3)=>{
                   return( <TopDealsCom key ={key3} image ={item.url} name ={item.name} price = {item.price} item={item}/>)
                })}
                </div>
                    </div>}
                <div className='py-1 flex justify-center text-white my-2 bg-gradient-to-b from-slate-400 to-[#5858ec]/60 font-semibold text-[20px]'><span>{items.store}</span></div>
                <div className='row bg-white container'>
                {items.product.map((item,key2)=>{
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
           <div className='bg-slate-200 py-2'>
            <div className='w-6/12 mx-auto flex justify-between'>
                <button className='rounded-md outline-offset-1 outline outline-[#5858ec] px-4 text-xl text-[#5858ec] outline-1' onClick={()=>handlepagination(false)}><i  className='fa fa-long-arrow-left'></i></button>
                <span className='text-lg'>page {pagenumber}/{lastpage}</span>
                <button className='rounded-md outline-offset-1 outline outline-[#5858ec] px-4 text-xl text-[#5858ec] outline-1' onClick={()=>handlepagination(true)}><i  className='fa fa-long-arrow-right'></i></button>
            </div>    
        </div> 
    </section>
  )
}
