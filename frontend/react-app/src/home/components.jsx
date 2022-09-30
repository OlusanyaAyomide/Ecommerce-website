import React from 'react'
import {motion} from "framer-motion"
import { Featured } from './xanimation'

export function Cart(props) {
  return (
    <span className='inline-block fa fa-shopping-cart relative text-3xl '> 
        <span className='absolute -top-3 md:-top-[10px] text-sm px-1 rounded-full py-0 bg-red-500 text-white left-3  font-semibold'>{props.name>0?props.name:''}</span>
    </span>
  )
}
export function Slider(props){
  return(
    <motion.div className="w-full h-[200px] rounded-xl overflow-hidden relative dark-cover before:bg-black/10  bg-gradient-to-r to-slate-200 from-white" variants={Featured} initial="initial" animate="animate">
      <div>
      <img src={props.url} alt="image" className="cover-image h-[200px]" />
      </div>

      <span className='absolute bottom-4 left-2 text-gray-900 text-[21px] md:text-2xl lg:text-3xl bg-white/70 px-2 rounded-lg font-semibold'>{props.label}</span>
    </motion.div>
  )
}

export function MinHeader(props){
  return(
    <div className='flex justify-center py-4 mb-2'>
    <h1 className='py-1 px-3 bg-[#5858ec] relative header-design before:left-[55px] text-white z-20 rounded-md'>
       {props.label}</h1>
    </div>
  )
}

export function Ratings(props){
    if(props.reviews >= 4.6){
      return(
            <span className='text-yellow-500 block  text-[14px]'>
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
      <span className='text-yellow-500 text-[14px]'>
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
      <span className='text-yellow-500  text-[14px]'>
      <i className='fa fa-star'></i>
      <i className='fa fa-star'></i>
      <i className='fa fa-star'></i>
      <i className='fa fa-star'></i>
      <i className='text-[14px] text-gray-600 ml-2'>of {props.totalR} reviews</i>
    </span>)
    }
    else if(props.reviews >= 3.2 && props.reviews < 3.7 ){
      return(
      <span className='text-yellow-500 text-[14px]'>
      <i className='fa fa-star'></i>
      <i className='fa fa-star'></i>
      <i className='fa fa-star'></i>
      <i className='fa fa-star-half'></i>
      <i className='text-[14px] text-gray-600 ml-2'>of {props.totalR} reviews</i>
    </span>)
    }
    else if(props.reviews >= 2.6 && props.reviews < 3.1 ){
      return(
      <span className='text-yellow-500 text-[14px]'>
      <i className='fa fa-star'></i>
      <i className='fa fa-star'></i>
      <i className='fa fa-star'></i>
      <i className='text-[14px] text-gray-600 ml-2'>of {props.totalR} reviews</i>
    </span>)
    }
    else if(props.reviews >= 2.2 && props.reviews < 3 ){
      return(
      <span className='text-yellow-500 text-[14px]'>
      <i className='fa fa-star'></i>
      <i className='fa fa-star'></i>
      <i className='fa fa-star-half'></i>
      <i className='text-[14px] text-gray-600 ml-2'>of {props.totalR} reviews</i>
    </span>)
  }
  else if(props.reviews >= 1.3 && props.reviews < 2.1 ){
    return(
    <span className='text-yellow-500 text-[14px]'>
    <i className='fa fa-star'></i>
    <i className='fa fa-star'></i>
    <i className='text-[14px] text-gray-600 ml-2'>of {props.totalR} reviews</i>
  </span>)
}
  else{return}
}

export function ProductList(prop){
  return(
    <div className=" w-6/12 md:w-4/12 lg:w-3/12 mb-3 ">
    <div className=' '>
      <div className='mx-2 '>
        <div className='h-[160px] w-full dark-cover relative  rounded-[10%] overflow-hidden'>
          <a href="#"><img src={prop.url} alt="image" className="cover-image"/></a>
        </div>
      </div>
      <div className='py-1 px-1'>
        <h1 className='font-semibold text-center'>{prop.name}</h1>
        <Ratings reviews = {prop.reviews} totalR ={prop.totalR} />
        <h1 className='font-semibold text-base my-2'>₦{prop.price}</h1>
        <h3 className='text-xs text-gray-500'>{prop.store} items left</h3>
      </div> 
    </div>
  </div>
  )
}

export function TopDealsCom(props){
  return(
    <div className='mx-2 '>
        <div className='h-24 w-24 rounded-xl overflow-hidden'>
            <a href="#"><img src={props.image} alt="image" className='full-image'/></a>
        </div>
        <h3 className='text-[12px] font-semibold text-center'>{props.name}</h3>
        <h3 className='text-[12px] font-semibold text-center mt-2'>₦{props.price}</h3>
    </div>
   
)
}
export function AffiliateHeader(prop){
  return(
    <div className='py-1 flex justify-center text-white my-2 bg-gradient-to-b from-slate-400 to-[#5858ec]/60 font-semibold text-[20px]'><span>{prop.label}</span></div>
  )
}
