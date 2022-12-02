import React,{useState} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { reviewactions } from '../../store/reviewslice'
import {motion} from "framer-motion"
import { Popup } from '../../home/xanimation'

export default function Review() {
  const Product = useSelector((state=>state.review.currentlyViewed))
  const [Rating,setRating] = useState(0)
  const dispatch = useDispatch()
  const [formInput,setFormInput] = useState({input:"",text:""}) 
  console.log(formInput)

  function HandleFormChange(event){
    setFormInput((prev)=>{
      return(
        {...prev,[event.target.name]:event.target.value}
      )
    })
  }
  function HandleSubmit(event){
    event.preventDefault()
    const data = {
      rating2 : Rating,
      title2: formInput.input,
      comment2:formInput.text 
    }
    dispatch(reviewactions.setReviewDetail(data))
    setTimeout(()=>{
      dispatch(reviewactions.setToggle(false))
    },500)
  }

  function Stars(){
    const StarNum = 5;
    const MappingArray=[]
    for (let i=0;i<StarNum;i++){
        MappingArray.push({id:i})
    }
    const StarsList = MappingArray.map((item,key)=>{
      const i = item.id
      return(
        <button key={i} className="mx-1" onClick={()=>{
          setRating(i+1)
          console.log(i)}}>
          <i className={`fa ${Rating>i?"fa fa-star":"fa fa-star-o"} text-[40px] ${Rating>i?"text-yellow-500":""}`}></i>
        </button>
      )
      
    })
    return StarsList
    }
    
  return (
    <motion.section className='fixed top-16 w-full bg-black/60 px-8 md:px-12 lg:px-15 py-4 z-30 h-[100vh]' variants={Popup} initial="initial" animate="animate">
        <div className='bg-white rounded-xl md:w-8/12 relative w-full mx-auto '>
            <div className=' '>
              <img src={Product.url} alt="" className="cover-image h-[250px]"/>
            </div>
            <h1 className="text-center font-bold md:text-[20px] text-[24px] my-2">{Product.name}</h1>
            <div className='absolute top-2 right-5 flex justify-end '>
              <button onClick={()=>{dispatch(reviewactions.setToggle(false))}}><i className="fa fa-times text-[20px] font-semibold "></i></button>
          </div>
            <div className=''>
                <div className='w-full text-center'>
                  <Stars/>
                </div>
                <div className='pb-4'>
                <div className='w-full px-6'>
                  <input placeholder='Title' onChange={HandleFormChange} value={formInput.input} name="input"  className='w-full bg-slate-200 h-10 rounded-md text-semibold px-4 text-gray-700 py-1 outline-[#5858ec]  outline-1 border-gray-500 focus:bg-slate-300 text-[18px] font-[500] block mb-4'/>
                  <textarea name="text" value={formInput.text} onChange={HandleFormChange} rows="6" resize="none" className='w-full bg-slate-200  rounded-md text-semibold px-4 text-gray-700 py-1 outline-[#5858ec]  outline-1 border-gray-500 focus:bg-slate-300 text-[18px] font-[500] block mb-4' placeholder='review'></textarea>
                  <button onClick={HandleSubmit} className="block mx-auto bg-[#5858ec] rounded-md px-4 ring py-1 ring-offset-1 ring-[#5858ec]/50 text-white">Submit Review</button>
                </div>
                </div>
           

            </div>
        </div>
    </motion.section>
  )
}
