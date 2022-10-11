import React,{useState} from 'react'
import {logo} from '../../assests/index.js'
import { Cart,Sliders,MinHeader } from '../../home/components'
import {categories,Searchresults,SlideImage} from '../../constants/index.js'
import {motion,AnimatePresence} from 'framer-motion'
import {useInView} from "react-intersection-observer"
import { Scrolling,NavbarAn } from '../../home/xanimation.jsx'
import { useSelector,useDispatch } from 'react-redux'
import { Productactions } from '../../store/productslice.jsx'
import { Link } from 'react-router-dom'



export default function Header(){
  const[toggle,setToggle] = useState(false)
  const[drop,setdrop] = useState(false)
  const [admin,setadmin] = useState(false)
  const [isearching,setisSearching] = useState()
  const [count,setcount] = useState(0)
  const [scrolref,scrolling] = useInView()
  const dispatch=useDispatch()
  const CategoryList = useSelector((state=>state.product.allcategory))
  const Searchresult= useSelector((state=>state.product.search.autopredict))

  const CategoryItems = CategoryList.map((items,key)=>{
    return(
      <Link state={{from:items,all:CategoryList}} to={'/category'}  key ={key }><li className='py-1 hover:before:bg-black/20  dark-cover relative before:animate-all rounded-sm overflow-hidden before:duration-300 text-gray-900'>{items.name}</li></Link>
    )
  })
  const SearchList  = Searchresult.map((item,key)=>{
    return(
      <li key={key} className="text-[16px] my-1 text-gray-800">
        <a href={`#${item.id}`}>{item.name}</a>
      </li>
    )
  })


  function Blurout(){
    setisSearching(false)
  }
  function dropdown(){
    setdrop((prev=>!prev))
    setadmin(false)
  }
  function changToggle(){
    setToggle((prev=>!prev))
  
  }
  function ChangeAdmin(){
    setadmin((prev=>!prev))
    setdrop(false)
  }
  function SearchDiv(e){
    setisSearching(true)
    setToggle(false)
    dispatch(Productactions.updateinput(e.target.value))


  }
  function User(props){
    const check = ()=>{if (props.type === 'user'){return drop}return admin}
    const click=()=>{if (props.type === 'user'){return dropdown}return ChangeAdmin}
    return (
      <div className='font-semibold text-[14px]'>{props.name}
           <i className={`${!check()?'fa fa-angle-down':'fa fa-angle-up'} ml-1`} onClick={click()}></i>
           {check() && <ul className={`${props.status?"":"absolute"} top-10 font-normal  py-1 bg-gray-100 rounded-md`}>
              {props.items.map((item,key)=>{
                return(
                  <li key={key} className="px-6 py-1 hover:before:bg-black/20  dark-cover relative before:animate-all rounded-md overflow-hidden before:duration-300"><a href="#"></a>{item}</li>
                )
              })}
           </ul>}
          </div>
    )
  }
  // useEffect(()=>{
  //   setTimeout(()=>{
  //     if(count<4){
  //       setcount((prev=>prev + 1))
  //     }
  //     else(setcount(0))
  //   },5000
  // )
  // },[count])

  return(
    <section className='container'>
      <div className='row justify-between md:justify-start' ref={scrolref}>
        <div className='flex items-center h-[60px] md:h-[60px] w-5/12 md:w-4/12' >
          <div className='flex items-center -ml-2'>
            {!toggle && <button><span className='inline-block fa fa-bars text-3xl md:hidden' onClick={changToggle}></span></button>}
            {toggle && <button><span className='inline-block fa fa-close text-3xl md:hidden' onClick={changToggle}></span></button>}
            <div className='h-[50px] w-[120px]  md:w-[150px] md:h-[70px] -ml-3'>
              <img src={logo} alt="" className="cover"/>
            </div>
          </div> 
        </div>
        <div className="w-7/12 md:w-5/12 flex items-center ">
            <input type="text" placeholder='Search' className='input' onKeyDown={SearchDiv} onBlur={Blurout}/>
            <button className='px-2 py-1 rounded-tr-md rounded-br-md bg-[#5858ec]'><i className='fa fa-search text-white text-2xl'></i></button>
            <span className='md:hidden'><Cart name = {0}/></span>
        </div> 
        <div className='md:w-3/12 hidden md:flex relative items-center justify-between px-1'>
          <span><User name="Ayomide" items={["profile","Orders","saved Items"]} type="user"/></span>
          <span><User name="Admin" items ={["Products","View"]} type="admin"/></span>
          <span><Cart name={0}/></span>  
        </div>
    
      </div>

      {/* NAVBARR */}
      <AnimatePresence>
      {!scrolling && 
        <motion.div className='flex md:hidden fixed items-center bg-slate-100 top-0 h-[61px] z-50 w-full left-0' variants={Scrolling} initial="initial" animate="animate" exit={{x:0}}>
          <div className='w-2/12 flex px-2'>
          {!toggle && <button><span className='inline-block fa fa-bars text-3xl md:hidden' onClick={changToggle}></span></button>}
          {toggle && <button><span className='inline-block fa fa-close text-3xl md:hidden' onClick={changToggle}></span></button>}
          </div>
          <div className='w-8/12 flex'><input type="text" placeholder='Search' className='input' onKeyDown={SearchDiv} onBlur={Blurout}/> 
          <button className='px-2 py-1 rounded-tr-md rounded-br-md bg-[#5858ec]'><i className='fa fa-search text-white text-2xl'></i></button>
          </div>
          <div className='w-2/12 flex justify-center'>
            <span className='md:hidden'><Cart name = {0}/></span>
          </div>
        </motion.div>}
      </AnimatePresence>

      {/* NAVBARR */}

      {toggle &&<motion.div className="fixed w-full bg-black/10 h-full  top-15 left-0 z-50 md:hidden" variants={NavbarAn} initial="initial" animate="animate">
          <div className='w-10/12 h-full bg-[#FAF9F6] py-4  px-4 md:px-6'>
            <h1 className='style-heading'>My Magneto Account</h1>
            <span className='block mb-3'><User name="Ayomide" items={["profile","Orders","Saved Items"]} type="user" status="nav"/></span>
            <span className='block mb-3'><User name="Admin" items ={["Products","View"]} type="admin" status="nav"/></span>
            <h1 className='style-heading'>Categories</h1>
            <ul>
            <Link to={"/"}>
                  <li className='py-1 hover:before:bg-black/20  dark-cover relative before:animate-all rounded-sm overflow-hidden before:duration-300 text-gray-900'>All Products</li>
              </Link>  
              {CategoryItems}
            </ul>
          </div>
      </motion.div>}
      {isearching && <div className='fixed w-full bg-gray-100 z-50 -ml-4 px-4'>
            <ul className=''>
              {SearchList}
            </ul>
        </div>}
    
    </section>
  )
}

