import React,{useEffect, useState} from 'react'
import {logo,camera,station} from '../../assests/index.js'
import { Cart,Sliders,MinHeader } from '../components.jsx'
import {motion,AnimatePresence} from 'framer-motion'
import { NavbarAn } from '../xanimation.jsx'
import {useInView} from "react-intersection-observer"
import { Scrolling } from '../xanimation.jsx'
import { useSelector,useDispatch } from 'react-redux'
import { authActions } from '../../store/authslice.jsx'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { searchaction } from '../../store/searchslice.jsx'
import { categoryactions } from '../../store/categoryslice.jsx'



export default function Header(){
  const[toggle,setToggle] = useState(false)
  const[drop,setdrop] = useState(false)
  const [admin,setadmin] = useState(false)
  // const [CategoryList,setCategoryList] = useState(categories)
  const [isearching,setisSearching] = useState()
  const [count,setcount] = useState(0)
  const [scrolref,scrolling] = useInView()
  const dispatch=useDispatch()
  const curImage =useSelector((state)=>state.product.featured)
  const loaded = useSelector((state=>state.product.featureloaded))
  const CategoryList = useSelector((state=>state.product.allcategory))
  const Searchresult= useSelector((state=>state.product.search.autopredict))
  const navigate=useNavigate()
  const [params,setparams] =useState("")
  const user = useSelector((state=>state.auth.userinfo))

  function setCategoryID(id){
    dispatch(categoryactions.setCategoryID(id))
    console.log(id)
    navigate("/category")
  }
  const CategoryItems = CategoryList.map((items,key)=>{
    return(
      <button className='block' key={key} onClick={()=>setCategoryID(items.id)}><li className='py-1 hover:before:bg-black/20  dark-cover relative before:animate-all rounded-sm overflow-hidden before:duration-300 text-gray-900'>{items.name}</li></button>
    )
  })
  function Autocomplete(value){
    console.log(value)
    navigate("/search")
    dispatch(searchaction.updateparams(value))
  }
  const SearchList  = Searchresult.map((item,key)=>{
    return(
      <li key={key} className="text-[16px] my-1 text-gray-800" >
        <button onClick={()=>{Autocomplete(item.name)}}> {item.name} </button>
      </li>
    )
  })
  function changeInput(e){
    setparams(e.target.value)

  }

  function handleSearch(){
    console.log(params)
    dispatch(searchaction.updateparams(params))
    navigate("/search")
  }

  function Blurout(){
    setTimeout(()=>{
       setisSearching(false)
    },300)

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
    dispatch(searchaction.updatepredicter(e.target.value))


  }

  function headerouter(param){
    if(param === "login"){
      navigate("/login")
    }
    else if(param === "profile"){
      navigate("/profile")
    }
    else if(param === "logout"){
      dispatch(authActions.resetuserinfo())
      navigate("/login")
    }
    else if(param === "View Cart"){
      navigate("/cart")
    }
  }

  function User(props){
    const check = ()=>{if (props.type === 'user'){return drop}return admin}
    const click=()=>{if (props.type === 'user'){return dropdown}return ChangeAdmin}
    console.log(props)
    return (
      <div className='font-semibold text-[14px]'>{props.name}
           <i className={`${!check()?'fa fa-angle-down':'fa fa-angle-up'} ml-1`} onClick={click()}></i>
           {check() && <ul className={`${props.status?"":"absolute"} top-10 font-normal z-40 py-1 bg-gray-100 rounded-md`}>
              {props.items.map((item,key)=>{
                return(
                  <button onClick={()=>{headerouter(item)}} key={key} className="block px-6 py-1 hover:before:bg-black/20  dark-cover relative before:animate-all rounded-md overflow-hidden before:duration-300"><a href="#"></a>{item}</button>
                )
              })}
           </ul>}
          </div>
    )
  }
  useEffect(()=>{
    setTimeout(()=>{
      if(count<4){
        setcount((prev=>prev + 1))
      }
      else(setcount(0))
    },5000
  )
  },[count])

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
            <input type="text" placeholder='Search' className='input' onKeyDown={SearchDiv} onBlur={Blurout} onChange={changeInput}/>
            <button onClick={handleSearch} className='px-2 py-1 rounded-tr-md rounded-br-md bg-[#5858ec]'><i className='fa fa-search text-white text-2xl'></i></button>
            <span className='md:hidden'><Cart name = {0}/></span>
        </div> 
        <div className='md:w-3/12 hidden md:flex relative items-center justify-between px-1'>
          <span><User name= {user.id?user.user:"log in"} items={user.id?["profile","Orders","View Cart","logout"]:["login"]} type="user"/></span>
          <span className='hidden'><User name="Admin" items ={["Products","View"]} type="admin"/></span>
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
          <div className='w-8/12 flex'><input type="text" placeholder='Search' className='input' onKeyDown={SearchDiv} onBlur={Blurout} onChange={changeInput}/> 
          <button className='px-2 py-1 rounded-tr-md rounded-br-md bg-[#5858ec]' onClick={handleSearch}><i className='fa fa-search text-white text-2xl'></i></button>
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
            <span className='block mb-3'><User name={user.id?user.user:"log in here"} items={user.id?["profile","View Cart","Logout"]:["login"]} type="user" status="nav"/></span>
            <span className='mb-3 hidden'><User name="Admin" items ={["Products","View"]} type="admin" status="nav"/></span>
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
            <ul>
              {SearchList}
            </ul>
        </div>}

        
        <div className='row bg-gradient-to-b from-[#5858ec]/10 to-transparent pb-5 -mx-4 md:-mx-6 px-4 md:px-6'>
          <div className='hidden md:w-3/12 md:block'>
            <div>
              <ul>              
                 <Link to={"/"}>
                  <li className='py-1 hover:before:bg-black/20  dark-cover relative before:animate-all rounded-sm overflow-hidden before:duration-300 text-gray-900'>All Products</li>
                  </Link>
                
                {CategoryItems}
              </ul>
            </div>
          </div>
          <div className='w-full md:w-9/12'>
            <div className='flex justify-center py-4 mb-2'>
            <h1 className='py-1 px-3 bg-[#5858ec] relative header-design text-white z-20 rounded-md'>
               Featured Products</h1>
            </div>
            {loaded &&  <div className=' w-full px-6 md:px-10 lg:px-16 rounded-xl'>
              <Sliders url={curImage[count].url} label={curImage[count].name} item={curImage[count]}/>
            </div>}
          </div>
        </div>
    </section>
  )
}

