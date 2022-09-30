import React,{useEffect,useState} from 'react'
import { MinHeader } from '../components'
import { LatestDemo } from '../../constants'
import { ProductList} from '../components'

export default function Latests() {

  const [Latest,setLatest] = useState(LatestDemo)

  const LatestList = Latest.map((item,key)=>{
    return(
      <ProductList name = {item.name} reviews = {item.reviews} url = {item.url} totalR = {item.totalR} price ={item.price} store ={item.store} key ={key}/>
    )
  })
  // useEffect(()=>{
  //   async function ApiCall(){
  //     const res = await fetch("http://127.0.0.1:8000")
  //     const data = await res.json()
  //     console.log(data)
  //     setLatest(data)
  //   }
  //   ApiCall()
  // },[])


  return (
    <section className='container bg-gradient-to-b from-slate-300 to-[#5858ec]/10'>
      <MinHeader label="Latest Product"/>   
      <div className="row -mx-4 px-4 bg-white rounded-md py-2">
        {LatestList}
      </div> 
    </section>
  )
}
