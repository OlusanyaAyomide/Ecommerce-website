import React,{useEffect,useState} from 'react'
import { MinHeaderProfile,Ratings } from '../../home/components'
import { reviewactions } from '../../store/reviewslice'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'

export default function Purchased() {
  const {purchasedField,user} = useSelector((state=>state.auth.userinfo))
  const status = useSelector((state=>state.review.reviewstatus))
  const dispatch = useDispatch()
  const [showMessage,setshowMessage] = useState(false)
  function HandleReview(item){
    console.log(item)
    dispatch(reviewactions.setViewed(item))
    setTimeout(()=>{
      dispatch(reviewactions.setToggle(true))
    },100)
  }
  console.log(purchasedField)

  function CheckReviewStatus(product){
    let status = false
    for (let rev of product.review){
        if (rev.customer === user){status = true}
    }
    console.log(status)
    return status
  }

  function SuccessDiv(){
    return(
      <div className='top-0 w-full z-40 bg-[#36f736]  py-2 fixed' >
          <h1 className='text-center text-white'>Review Succesfully Added</h1>
      </div>
    )
  }

  useEffect(()=>{
    if(status !== 200){return}
    setshowMessage(true)
    setTimeout(()=>{ 
    setshowMessage(false)
    dispatch(reviewactions.revertstatus())
    },4000)
  },[status])

  const purchased = purchasedField.map((item,key)=>{
    return(
      <div className="my-2 flex bg-white rounded-lg -mx-2" key={key}>
          <div className='h-[120px] rounded-lg border w-4/12 md:3/12 lg:w-[4/12]'>
          <Link to="/detail" state={{from:item}}><img src={item.url} alt="" className='cover-image' /></Link>
          </div>
          <div className=' w-8/12 md:w-9/12 lg:w-[4/12] '>
            <div>
            <h1 className='text-[18px] md:text-[20px] lg:text-[24px] mb-2 font-[500] pl-2'>{item.name}</h1>
            <div className="pl-2">
              <Ratings reviews ={item.reviews} totalR = {item.totalR}/>
            </div>
            </div>
            <div className='flex justify-center'>
            {!CheckReviewStatus(item) && <button onClick={()=>{HandleReview(item)}} className='text-white bg-[#5858ec] px-4 md:px-10 font-[450] ring-2 ring-offset-2 py-2 text-sm rounded-lg'>Review This Product</button>}
          </div>
         
      </div>
      </div>
    )
  })
  return (
    <section className='bg-gradient-to-b from-[#5858ec]/10' id="purchased">
        {showMessage && <SuccessDiv/>}
        <div className='flex w-full '>
          <div className="w-full relative">
            {purchasedField.length > 0 && <MinHeaderProfile label ="Purchased Products "/>}
          </div>
        </div>
        <div className=' py-2 '>
          <div  className="bg-slate-400 px-4 md:px-5 lg:px-4 py-[2px]">
            {purchased}
          </div>
   
        </div>
    </section>
  )
}
