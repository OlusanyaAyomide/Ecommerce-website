import React from 'react'
import {Link,useNavigate} from "react-router-dom"
import { useSelector,useDispatch } from 'react-redux'
import { categoryactions } from '../../store/categoryslice'




export default function Caetegory() { 
    const CategoryList = useSelector((state=>state.product.allcategory))
    const navigate = useNavigate()
    const dispatch = useDispatch()
    function setCategoryID(id){
        dispatch(categoryactions.setCategoryID(id))
        navigate("/category")
      }
    const FilterList = CategoryList.map((item,key)=>{
        return(
            <div className='mx-2' key={key}>
                <div className='h-24 w-24 rounded-xl overflow-hidden'>
                    <button className='h-full w-full block' key={key} onClick={()=>setCategoryID(item.id)}><img src={item.image} alt="image" className='full-image'/></button>
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
