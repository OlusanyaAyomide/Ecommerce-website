import React,{useState} from 'react'
import { useSelector } from 'react-redux'
import { convert } from '../../home/components'
import { Link } from 'react-router-dom'
import { Cartaction } from '../../store/cartslice'
import { useDispatch } from 'react-redux'


export default function Checkout() {
    const products = useSelector((state=>state.cart))
    const dispatch =useDispatch()
    const [popout,setpopout] = useState(false)
    function getDetail(prop){
          const params= `product${prop}`
          const quantity = products.repeated[params].count
          return quantity.toLocaleString("en-Us")
         
    }
    function Remove(){
      return(
        <h1 className='text-lg pt-1 text-[#5858ec] font-semibold'><i className='fa fa-trash text-xl ml-2 mr-5 '></i> Remove</h1>
      )
    }
    function increaseCart(item){
      dispatch(Cartaction.addproduct({product:item}))
      setpopout(true)
      console.log(popout)
      setTimeout(()=>{
        setpopout(false)
      },2000)
    }

    const CartItems=products.productlist.map((item,key)=>{
        return(
            <div className='bg-white my-1 p-2' key={key}>
                <div className='flex'>
                    <div className='w-4/12 md:3/12 lg:w-[4/12] border rounded-lg'>
                        <div className='h-[120px] '>
                            <Link to="/detail" state={{from:item}}><img src={item.url} alt="" className='cover-image'/></Link>
                        </div>
                        <div className='hidden md:block'><Remove/></div>
                    </div>
                    <div className='px-2'>
                       <h1 className='text md:text-[20px] lg:text-[24px] mb-2 font-[500]'>{item.name}</h1>
                       <div>
                            <span className='text-[20px] font-semibold'>₦{item.price}</span>
                            {item.discount && <span className='line-through text-gray-700 ml-1 text-[16px]'>₦{convert(item.price,item.discount)}</span>}
                            <div><Remove/></div>
                        </div>
                        <div className='my-2'>
                            <span className='py-1 px-3 rounded-md shadow-md shadow-gray-700 text-white bg-[#5858ec] text-2xl'>-</span>
                            <span className='px-8 font-semibold'>{getDetail(item.id)}</span>
                            <button><span className='py-1 px-[11px] rounded-md shadow-md shadow-gray-700 text-white bg-[#5858ec] text-2xl' onClick={()=>{increaseCart(item)}}>+</span></button>
                        </div>
                    </div>
                </div>
            </div>
        )
    })
  return (
    <section>
        {popout && <div className='flex justify-center bg-[#36f736] py-2 w-full z-50 text-white fixed top-0'>
            Product succesfully added to cart succesfully
        </div>}
        <div className='row'>
            <div className='w-full md:w-8/12 lg:w-9/12 px-2 bg-slate-300 py-1'>
                <h1 className='bg-white my-1 rounded-tr-md rounded-tl-md px-4 font-semibold'>CART ({products.quantity})</h1>
                <div>
                  {CartItems}
                </div>
                
            </div>
            <div className='hidden md:block md:w-4/12 lg:w-3/12'></div>
        </div>
    </section>
  )
}
