import React from 'react'
import { MinHeader4 } from '../../home/components'
import { useSelector,useDispatch } from 'react-redux'
import { Ratings } from '../../home/components'
import { detailaction } from '../../store/detailslice'
import { convert } from '../../home/components'

export default function Similar(){
  const dispatch = useDispatch()
  function handleChange(itemid){
      dispatch(detailaction.setrender(false))
      dispatch(detailaction.updatecurrentid(itemid))
  }
  const similarProduct= useSelector((state=>state.detail.similarproduct))
  const ProdutList = similarProduct.map((item,key)=>{
    return(
      <div className=" block w-6/12 md:w-4/12 lg:w-3/12 mb-3 " key={key} onClick={()=>{handleChange(item.id)}} data-user={item.id}>
        <div className=' '>
          <div className='mx-2 '>
          <div className='h-[160px] w-full dark-cover relative  rounded-[10%] overflow-hidden'>
          <img src={item.url} alt="image" className="cover-image"/></div>
          </div>
          <div className='py-1 px-1'>
          {!item.discount && <h1 className='font-semibold text-[15px] md:text-base my-2'>₦{item.price}</h1>}
        {item.discount && <div className='font-semibold  text-[15px] md:text-base my-2 flex justify-around'>
        <h1 className='gray-400 font-normal text-[15px] md:text-base'>
          <span className='line-through decoration-gray-700'>₦{item.price}</span> <span className='relative -left-1 bottom-2 text-xs text-[#ff3c00] font-bold'>-{item.discount}%</span>
        </h1>
        <span>₦{convert(item.price,item.discount)}</span>
        </div>}
            <h3 className='text-xs text-gray-500'>{item.store} items left</h3>
          </div> 
      </div>
</div> )     
  })
  return (
    <section className="container bg-slate-300">
      <div className='-mx-4 md:-mx-6 pt-2'>
            <div className='bg-slate-200'>
            <MinHeader4 label="Similar Products"/>
            </div>
        </div>
      <div className='row -mx-2 px-4 bg-white rounded-md py-2'>
        {ProdutList}
      </div>      
  </section>


  )
}
