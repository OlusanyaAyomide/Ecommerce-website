import React from 'react'
import { logo } from './assests'
import { categoryactions } from './store/categoryslice'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { authActions } from './store/authslice'



export default function Footer() {
  const categoryList = useSelector((state=>state.product.allcategory))
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state=>state.auth.userinfo))
  const FooterCategory = categoryList.map((items,key)=>{
      return(
        <button key ={key} className="py-1 block text-left" onClick={()=>{
          dispatch(categoryactions.setCategoryID(items.id))
          navigate("/category")
        }}>{items.name}</button>
      )
  })
  return (
    <section className='bg-white pt-16'>
    <div className='relative border px-4 md:px-6 pt-16 pb-4 bg-gradient-to-r from-[#090938] to-[#090938]/90 rounded-tr-lg rounded-tl-lg mt-10'>
        <div className='absolute bg-gradient-to-r w-10/12 md:w-10/12 from-[#1a1a8f] -slate-500 to-white -top-10 mx-6 sm:mx-12 rounded-md py-6 px-4 flex '>
          <div className='w-8/12 md:text-[18px] text-md text-white px-2'>Shop With Maginito Today</div>
          <div className='w-4/12 flex justify-center items-center'>
            <button className='bg-[#090938] rounded-lg px-2 py-1 text-white' onClick={()=>{
              if (!user.id){
                navigate("/signup")
              }
              else{
                dispatch(authActions.resetuserinfo())
                dispatch(authActions.zerostatus())
                navigate("/")  
              }
        
            }}>{user.id?"Sign Out":"Sign Up"}<i className='fa fa-long-arrow-right px-2'></i></button>
          </div>
        </div>
        <div className="mt-10">
          <div className='h-20  w-5/12 mx-auto md:mx-0'>
            <img src={logo} alt="" className='cover-image' />
          </div>
          <div className='flex mt-4'>
            <div className='w-6/12 pl-2'>
              <h1 className='text-gray-400 text-[16px] font-semibold'>Categories</h1>
              <div className='w-full text-gray-500'>
                {FooterCategory}
              </div>
            </div>
            <div className='w-6/12 pl-2'>
            <h1 className='text-gray-400 text-[16px] font-semibold'>Useful Links</h1>
            <div className='text-gray-500'>
              {user.id && <button className ="py-1 block" onClick={()=>{
                navigate("/profile")
              }}>Profile</button>}
              <button className ="py-1 block" onClick={()=>{
                navigate("/cart")
              }}>Cart</button>
              {!user.id && <button className='py-1 block' onClick={()=>{
                navigate("/login")
              }}>login</button>}
              {user.id && <button className='py-1 block' onClick={()=>{
                dispatch(authActions.resetuserinfo())
                dispatch(authActions.zerostatus())
                navigate("/")
              }}>logout</button>}
            </div>
            </div>
          </div>
          <div className='border-t border-gray-500 mb-2'>
              <span className='text-gray-500 text-[10px]'>Developed by jumperle,All rights reserved</span>
          </div>
        </div>
    </div>
    </section>

  )
}
