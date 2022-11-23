import React,{useState} from 'react'
import { Tester } from '../../constants'

export default function Review() {
  const Product = Tester
  const [Rating,setRating] = useState(0)

  function Stars(){
    const StarNum = 5;
    const MappingArray=[]
    console.log(Rating)
    for (let i=0;i<StarNum;i++){
        MappingArray.push({id:i})
    }
    console.log(MappingArray)
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
    <section className='fixed top-16 w-full bg-black/60 px-8 md:px-12 lg:px-15 py-4 z-50 h-[100vh]'>
        <div className='bg-white rounded-xl md:w-8/12 w-full mx-auto '>
            <div className=' '>
              <img src={Product.url} alt="" className="cover-image h-[250px]"/>
            </div>
            <div className='flex justify-center'>
                <div>
                  <Stars/>
                </div>
      
            </div>
        </div>
    </section>
  )
}
