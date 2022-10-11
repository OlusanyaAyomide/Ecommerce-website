import React,{useState} from 'react'
import { useSelector } from 'react-redux'
import { convert } from '../../home/components'
import { Link } from 'react-router-dom'
import { Cartaction } from '../../store/cartslice'
import { useDispatch } from 'react-redux'
import PaystackPop from '@paystack/inline-js'




export default function Checkout() {
    const products = useSelector((state=>state.cart))
    const dispatch =useDispatch()
    const [popout,setpopout] = useState(false)
    const [remove,setremove] = useState(false)
    const [checkedout,setcheckedout] = useState(false)

    function handlepayment(){
      const paystack = new PaystackPop()
      const amount = products.price + (products.quantity * 240) + (products.price * 0.05 )
      paystack.newTransaction({
      key : "pk_test_9c574c9c2d08170afdaf43de5e76fcec6f514a5b",
      amount: amount * 100,
      email:"ayomideflex73@gmail.com",
      firstname:"Olusanya",
      lastname:"Ayomide",
      onSuccess(transaction){
        console.log( `payment complete refrence id: ${transaction.reference}`)
      },
      onCancel(){console.log("Transactiion Cancelled")}
  })
    }

    function removeproduct(prop){
      dispatch(Cartaction.removeproduct({product:prop.item}))
      setremove(true)
      setTimeout(()=>{
          setremove(false)
      },2000)
      console.log(products)
    }
    function Remove(prop){
      return(
        <button onClick={()=>{removeproduct(prop)}}><h1 className='text-lg pt-1 text-[#5858ec] font-semibold'><i className='fa fa-trash text-xl ml-2 mr-5 '></i> Remove</h1></button>
      )
    }
    function Toint(number){return Number(number.replace(",",""))}
    function handlecheckout(){
        setcheckedout(true)
    }
    
    function increaseCart(item){
      dispatch(Cartaction.addproduct({product:item}))
      setpopout(true)
      setcheckedout(false)
      console.log(popout)
      setTimeout(()=>{
        setpopout(false)
      },2000)
      console.log(products)
    }
    function decreaseCart(item){
      dispatch(Cartaction.reduceproduct({product:item}))
      setremove(true)
      setcheckedout(false)
      setTimeout(()=>{
          setremove(false)
      },2000)
      console.log(products)
    }
    function getDetail(prop){
      const params= `product${prop}`
      const quantity = products.repeated[params].count
      return quantity.toLocaleString("en-Us")
     
    }
    function Buttons(prop){
      let item = prop.item
      return(
        <>
          <button><span className='py-1 px-3 rounded-md shadow-md shadow-gray-700 text-white bg-[#5858ec] text-2xl' onClick={()=>{decreaseCart(item)}}>-</span></button>
          <span className='px-8 font-semibold'>{getDetail(item.id)}</span>
          <button><span className='py-1 px-[11px] rounded-md shadow-md shadow-gray-700 text-white bg-[#5858ec] text-2xl' onClick={()=>{increaseCart(item)}}>+</span></button>
        </>
      )
    }
    function getTotal(){
      return products.price + (products.quantity * 240) + (products.price * 0.05 )
    }

    const CartItems=products.productlist.map((item,key)=>{
        return(
            <div className='bg-white my-1 p-2' key={key}>
                <div className='flex'>
                    <div className='w-4/12 md:3/12 lg:w-[4/12] border rounded-lg'>
                        <div className='h-[120px] '>
                            <Link to="/detail" state={{from:item}}><img src={item.url} alt="image" className='cover-image'/></Link>
                        </div>
                        {/* <div className='hidden md:block'><Remove item={item}/></div> */}
                    </div>
                    <div className='px-2 md:flex md:w-full '>
                      <div className='w-full md:w-7/12'>
                        <h1 className='text-[18px] md:text-[20px] lg:text-[24px] mb-2 font-[500]'>{item.name}</h1>
                        <div>
                             <span className='text-[20px] font-semibold'>
                              ₦{(Toint(convert(item.price,item.discount))*getDetail(item.id)).toLocaleString()}</span>
                             {item.discount && <span className='line-through text-gray-700 ml-1 text-[16px]'>₦{(Toint(item.price) * getDetail(item.id)).toLocaleString()}</span>}
                             <div><Remove item={item}/></div>
                         </div>
                         <div className='my-2 md:hidden'>
                            <Buttons item={item}/>
                         </div>
                        </div>
                        <div className=' hidden md:flex w-5/12 justify-end'>
                          <div className='flex items-center'> <Buttons item={item}/></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    })
  return (
    <section>
        {popout && <div className='flex justify-center bg-[#36f736] py-2 w-full z-50 text-white fixed top-0'>
            Product succesfully added to cart
        </div>}
        {remove && <div className='flex justify-center bg-[#36f736] py-2 w-full z-50 text-white fixed top-0'>
            Product succesfully removed from Cart
        </div>}
        <div className='row'>
            <div className='w-full md:w-8/12 lg:w-9/12 px-2  bg-slate-300 py-1 h-full'>
                <h1 className='bg-white -mb-1 rounded-tr-md rounded-tl-md px-4 font-semibold'>CART ({products.quantity})</h1>
                <div>
                  {CartItems}
                </div>
                
            </div>
            <div className='md:w-4/12 lg:w-3/12 bg-slate-300 md:pt-1 md:pb-2 w-full px-2 md:pl-0 md:h-full'>
              {!checkedout && <div className='md:bg-white md:py-6 rounded-xl md:px-2 '>
                 {products.quantity > 0 && <button className='bg-[#5858ec] w-full block font-semibod text-xl text-white py-2 rounded-md shadow-gray-700 shadow-md' onClick={handlecheckout}>Check out (₦{products.price.toLocaleString()})</button>}     
              </div>}
              {products.quantity>0 && checkedout && <div className='bg-slate-300 py-2 md:pb-0'>
              <div className='h-full border border-[#5858ec] ] bg-white pt-4 rounded-md '>
                    <div className="flex justify-between px-4">
                      <span className='font-semibold text-lg'>Quantity</span>
                      <span className='font-semibold text-lg '>{products.quantity} Item{products.quantity>1?"s":""}</span>
                    </div>
                    <div className="flex justify-between px-4">
                      <span className='font-semibold text-lg'>Items Total</span>
                      <span className='font-semibold text-lg'>₦{products.price.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between px-4">
                      <span className='font-semibold text-lg'>Shipping Fee</span>
                      <span className='font-semibold text-lg'>₦{(products.quantity * 240).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between px-4">
                      <span className='font-semibold text-lg'>Tax</span>
                      <span className='font-semibold text-lg'>₦{(products.price * 0.05).toLocaleString()}</span>
                    </div>
                    <div className='py-1 rounded-xl md:px-2 '>
                 {products.quantity > 0 && <button className='bg-[#5858ec] w-full block font-semibod mt-10 text-xl text-white py-2 rounded-md shadow-gray-700 shadow-md' onClick={handlepayment}>Pay Now (₦{(getTotal()).toLocaleString()})</button>}     
              </div>
                  </div> 
                
              </div>}
              
            </div>
        </div>
    </section>
  )
}