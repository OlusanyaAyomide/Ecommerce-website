import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { Link,useNavigate } from 'react-router-dom'
import { categoryactions } from '../../store/categoryslice'
import { logo } from '../../assests'

export default function Hero() {
  const CategoryList = useSelector((state=>state.product.allcategory))
  const dispatch = useDispatch()
  const navigate = useNavigate()
  function setCategoryID(id){
    dispatch(categoryactions.setCategoryID(id))
    navigate("/category")
  }
  const CategoryItems = CategoryList.map((items,key)=>{
    return(
      <button className='block' key={key} onClick={()=>setCategoryID(items.id)}><li className='py-1 hover:before:bg-black/20  dark-cover relative before:animate-all rounded-sm overflow-hidden before:duration-300 text-gray-900'>{items.name}</li></button>
    )
  })
  return (
    <section className='hidden md:block'>
        <div className='row bg-gradient-to-b from-[#5858ec]/10 to-transparent'>
            <div className='hidden md:block md:w-4/12 lg:w-3/12 container'>
                  <div>           
                    <ul>              
                       <Link to={"/"}>
                        <li className='py-1 hover:before:bg-black/20  dark-cover relative before:animate-all rounded-sm overflow-hidden before:duration-300 text-gray-900'>All Products</li>
                        </Link>
                      {CategoryItems}
                    </ul>
                  </div>
                
            </div>
            <div className='w-full md:w-8/12 lg:w-9/12 bg-gray-300 p-2 md:bg-transparent'>
               <div>
                  <div className='bg-white w-full mx-auto flex items-center justify-center h-[300px] md:w-11/12 lg:w-8/12 xl:w-7/12 shadow-md shadow-black/80 rounded-xl'>
                    <div className='-rotate-[15deg]'>
                         <img src={logo} className="cover-image" alt="" />
                    </div>
                   
                  </div>
               </div>
            </div>
        </div>
    </section>
  )
}
