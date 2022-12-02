import React from 'react'
import {motion} from "framer-motion"
import { Featured } from './xanimation'
import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom'

export function Cart() {
  const counts = useSelector((state=>state.cart.quantity))
  return (
    <Link to="/cart"><span className='inline-block fa fa-shopping-cart relative text-3xl ml-1'> 
        <span className='absolute -top-3 md:-top-[10px] text-sm px-1 rounded-full py-0 bg-red-500 text-white left-3  font-semibold'>{counts>0?counts:''}</span>
    </span></Link>
  )
}

export function Sliders(props){
  return(
    <Link to="/detail" state={{from:props.item}}><motion.div  className="w-full h-[200px] rounded-xl overflow-hidden relative dark-cover before:bg-black/10  bg-gradient-to-r to-slate-200 from-white" variants={Featured} initial="initial" animate="animate">
      <div>
     <img src={props.url} alt="image" className={`${props.type === "category"?"full-image":"cover-image"} h-[200px]`} />
      </div>
      <span className='absolute bottom-4 left-2 text-gray-900 text-[21px] md:text-2xl lg:text-3xl bg-white/70 px-2 rounded-lg font-semibold'>{props.label}</span>
    </motion.div></Link> 
  )
}

export function MinHeader(props){
  return(
    <div className='flex justify-center py-4 mb-2 relative overflow-hidden'>
    <h1 className='py-1 px-3 bg-[#5858ec] relative header-design before:left-[55px] text-white z-20 rounded-md'>
       {props.label}</h1>
    </div>
  )
}
export function MinHeader2(props){
  return(
    <div className='flex justify-center py-4 mb-2 relative overflow-hidden'>
    <h1 className='py-1 px-3 bg-[#5858ec] relative header-design before:left-[35px] text-white z-20 rounded-md'>
       {props.label}</h1>
    </div>
  )
}


const Star=(prop)=>{
  if(prop.rating===5){
    return(
      <>
        <i className='fa fa-star'></i>
        <i className='fa fa-star'></i>
        <i className='fa fa-star'></i>
        <i className='fa fa-star'></i>
        <i className='fa fa-star'></i>
      </>
    )
}
  else if(prop.rating === 4){
    return(
      <>
        <i className='fa fa-star'></i>
        <i className='fa fa-star'></i>
        <i className='fa fa-star'></i>
        <i className='fa fa-star'></i></>
    )
  }
  else if(prop.rating === 3){
    return(
      <>
        <i className='fa fa-star'></i>
        <i className='fa fa-star'></i>
        <i className='fa fa-star'></i>
      </>
    )
  }
  else if(prop.rating ===2 ){
    return(
      <>
        <i className='fa fa-star'></i>
        <i className='fa fa-star'></i>
      </>
    )
  }
  else{
    return(
      <i className='fa fa-star'></i>
    )
  }
  
}

export const DetailStar=(prop)=>{
    return(
      <span className='text-yellow-500 text-base'>
        <Star rating={prop.rating} />
      </span>
    )
}

export function Ratings(props){
    if(props.reviews >= 4.6){
      return(
            <span className={`text-yellow-500 ${props.big?"text-[22px]":"text-[14px]"}`}>
              <i className='fa fa-star'></i>
              <i className='fa fa-star'></i>
              <i className='fa fa-star'></i>
              <i className='fa fa-star'></i>
              <i className='fa fa-star'></i>
              <i className='text-[14px] text-gray-600 ml-2'>of {props.totalR} review</i>
            </span>
      )
    }
    else if(props.reviews >= 4.2 && props.reviews < 4.6 ){
      return(
      <span className={`text-yellow-500 ${props.big?"text-[22px]":"text-[14px]"}`}>
      <i className='fa fa-star'></i>
      <i className='fa fa-star'></i>
      <i className='fa fa-star'></i>
      <i className='fa fa-star'></i>
      <i className='fa fa-star-half'></i>
      <i className='text-[14px] text-gray-600 ml-2'>of {props.totalR} reviews</i>
    </span>)
    }
    else if(props.reviews >= 3.7 && props.reviews < 4.2 ){
      return(
      <span className={`text-yellow-500 ${props.big?"text-[22px]":"text-[14px]"}`}>
      <i className='fa fa-star'></i>
      <i className='fa fa-star'></i>
      <i className='fa fa-star'></i>
      <i className='fa fa-star'></i>
      <i className='text-[14px] text-gray-600 ml-2'>of {props.totalR} reviews</i>
    </span>)
    }
    else if(props.reviews >= 3.2 && props.reviews < 3.7 ){
      return(
      <span className={`text-yellow-500 ${props.big?"text-[22px]":"text-[14px]"}`}>
      <i className='fa fa-star'></i>
      <i className='fa fa-star'></i>
      <i className='fa fa-star'></i>
      <i className='fa fa-star-half'></i>
      <i className='text-[14px] text-gray-600 ml-2'>of {props.totalR} reviews</i>
    </span>)
    }
    else if(props.reviews >= 2.6 && props.reviews < 3.1 ){
      return(
      <span className={`text-yellow-500 ${props.big?"text-[22px]":"text-[14px]"}`}>
      <i className='fa fa-star'></i>
      <i className='fa fa-star'></i>
      <i className='fa fa-star'></i>
      <i className='text-[14px] text-gray-600 ml-2'>of {props.totalR} reviews</i>
    </span>)
    }
    else if(props.reviews >= 2.2 && props.reviews < 3 ){
      return(
      <span className={`text-yellow-500 ${props.big?"text-[22px]":"text-[14px]"}`}>
      <i className='fa fa-star'></i>
      <i className='fa fa-star'></i>
      <i className='fa fa-star-half'></i>
      <i className='text-[14px] text-gray-600 ml-2'>of {props.totalR} reviews</i>
    </span>)
  }
  else if(props.reviews >= 1.3 && props.reviews < 2.1 ){
    return(
    <span className={`text-yellow-500 ${props.big?"text-[22px]":"text-[14px]"}`}>
    <i className='fa fa-star'></i>
    <i className='fa fa-star'></i>
    <i className='text-[14px] text-gray-600 ml-2'>of {props.totalR} reviews</i>
  </span>)
}
  else{return}
}
export function convert(price,discount){
  let prize = Number(price.replace(",",""))
  let discounted_price = prize-(discount/100*prize)
  if (discounted_price>10000){
    const value=parseFloat(discounted_price.toPrecision(3))
    const newprice = value.toLocaleString("en-Us")
    return newprice
  }
  else{
    const value=parseFloat(discounted_price.toPrecision(2))
    const newprice = value.toLocaleString("en-Us")
    return newprice
  }
}

export function getCartPrice(value,discount){
  let prize = Number(value.replace(",",""))
  let discounted_price = prize-(discount/100*prize)
  if (discounted_price>10000){
    const value=parseFloat(discounted_price.toPrecision(3)) 
    return value
  }
  else{
    const value=parseFloat(discounted_price.toPrecision(2))
    return value
  }
}
export function getExactPrice(value,discount){
  console.log(value)
  let prize = Number(value.replace(",",""))
  let discounted_price = prize-(discount/100*prize)
  return discounted_price
}

export function ProductList(prop){
  // 
  return(
    <div className=" w-6/12 md:w-4/12 lg:w-3/12 mb-3 ">
    <div className=' '>
      <div className='mx-2 '>
      <Link to="/detail" state={{from:prop.items}}><div className='h-[160px] w-full dark-cover relative  rounded-[10%] overflow-hidden'>
          <img src={prop.url} alt="image" className="cover-image"/>
        </div>
        </Link>
      </div>
      <div className='py-1 px-1'>
        <Link to="/detail" state={{from:prop.items}}><h1 className='font-semibold text-center'>{prop.name}</h1></Link>
        <Link to="/detail" state={{from:prop.items}}><Ratings reviews = {prop.reviews} totalR ={prop.totalR} /></Link>
        {!prop.discount && <Link to="/detail" state={{from:prop.items}}><h1 className='font-semibold text-[15px] md:text-base my-2'>₦{prop.price}</h1></Link>}
        {prop.discount && <Link to="/detail" state={{from:prop.items}}><div className='font-semibold  text-[15px] md:text-base my-2 flex justify-around'>
        <h1 className='gray-400 font-normal text-[15px] md:text-base'>
          <span className='line-through decoration-gray-700'>₦{prop.price}</span> <span className='relative -left-1 bottom-2 text-xs text-[#ff3c00] font-bold'>-{prop.discount}%</span>
        </h1>
        <span>₦{convert(prop.price,prop.discount)}</span>
        </div></Link>}
        <Link to="/detail" state={{from:prop.items}}><h3 className='text-xs text-gray-500'>{prop.store} items left</h3></Link>
      </div> 
    </div>
  </div>
  )
}

export function TopDealsCom(props){
  return(
    <Link to="/detail" state={{from:props.item}}><div className='mx-2 '>
        <div className='h-24 w-24 rounded-xl overflow-hidden'>
          <img src={props.image} alt="image" className='full-image'/>
        </div>
        <h3 className='text-[12px] font-semibold text-center'>{props.name}</h3>
        <h3 className='text-[12px] font-semibold text-center mt-2'>₦{props.price}</h3>
    </div></Link>   
)
}
export function AffiliateHeader(prop){
  return(
    <div className='py-1 flex justify-center text-white my-2 bg-gradient-to-b from-slate-400 to-[#5858ec]/60 font-semibold text-[20px]'><span>{prop.label}</span></div>
  )
}
export function CatHeaeder(props){
  return(
  <div className=' py-4 mb-2  px-4 md:px-6'>
  <h1 className='py-1 px-3  relative text-center text-gray-800 shadow-lg shadow-black/30 font-semibold text-[24px] lg:text-[28px] z-20 rounded-md'>
     {props.name}
    </h1>
  </div>
  )
}
export function CatHeaeder2(props){
  return(
  <div className=' py-4 mb-2  px-4 md:px-6 lg:flex lg:justify-center '>
  <h1 className='py-1 px-3  relative text-center text-gray-800 shadow-lg shadow-black/30 font-semibold text-xl lg:text-[24px] z-20 rounded-md bg-slate-300 lg:w-6/12'>
     {props.name}
    </h1>
  </div>
  )
}

export function StoreDetail(prop){
  return(
    <div>
    <h1 className='font-semibold text-lg'>Seller Info</h1>
    <div className='md:h-40 flex flex-col justify-center'>
       <ul>
          <li>Store Name  <span className='font-semibold mx-2'>:</span>{prop.name}</li>
          <li>Products Available <span className='font-semibold mx-2'>:</span> {prop.count}</li>
          <li> Store Category <span className='font-semibold mx-2'>:</span> {prop.category}</li>      
        </ul>
    </div>   
  </div> 
  )
}
export function MinHeader4(props){
  return(
    <div className='flex justify-center py-4 mb-2 relative overflow-hidden'>
    <h1 className='py-1 px-3 bg-[#5858ec] relative header-design before:left-[65px] text-white z-20 rounded-md'>
       {props.label}</h1>
    </div>
  )
}
export function MinHeaderDy(props){
  console.log(props.left)
  return(
    <div className='flex justify-center py-4 mb-2 relative overflow-hidden'>
    <h1 className={`py-1 px-3 bg-[#5858ec] relative header-design before:left-[90px] text-white z-20 rounded-md`}>
       {props.label}</h1>
    </div>
  )
}
export function MinHeaderProfile(props){
  return(
    <div className='flex justify-center py-4 mb-2 relative overflow-hidden'>
    <h1 className={`py-1 px-3 bg-[#5858ec] relative header-design before:left-[75px] text-white z-20 rounded-md`}>
       {props.label}</h1>
    </div>
  )
}
export function MinHeaderwishlist(props){
  return(
    <div className='flex justify-center py-4 mb-2 relative overflow-hidden'>
    <h1 className={`py-1 px-6 bg-[#5858ec] relative header-design before:left-[38px] text-white z-20 rounded-md`}>
       {props.label}</h1>
    </div>
  )
}