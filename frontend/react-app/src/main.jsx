import React,{useState,useEffect} from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Home } from './home/Home.jsx'
import {BrowserRouter,Route,Routes,Navigate} from "react-router-dom"
import { Provider } from 'react-redux'
import { store } from './store/store'
import Category from "./category/index"
import Detail from './detail/Detail'
import { useSelector,useDispatch } from 'react-redux'
import {AutoPredictFetch,CategoryFetch,InitiaTokenFetch} from "./store/datafetch"
import CartMain from './CartList/CartMain'
import Search from './search/Search'
import Login from './login/Login'

let first = false
let firstrender = true

export default function Main() {
  const dispatch = useDispatch()
  const UserInput = useSelector((state=>state.product.search.userinput))
  const dactive = useSelector((state=>state.detail.active))
  const catActive = useSelector((state=>state.category.active))
  const searchparam = useSelector((state=>state.search.params))
  const auth = useSelector((state=>state.auth))
  const loginsatus = useSelector((state=>state.auth.loginstatus))
  
  const anonymous = window.localStorage.getItem("anonymous")
  if (anonymous === null){
    let r = (Math.random() + 1).toString(36).substring(7)
    window.localStorage.setItem("anonymous",r)
  }
  console.log(window.localStorage.getItem("anonymous"))
  useEffect(()=>{
    if (firstrender){
      firstrender=false
      const token = JSON.parse(window.localStorage.getItem("access"))
      if (token !== null){
          dispatch(InitiaTokenFetch(token))
          const interval = setInterval(()=>{
            console.log("alive")
            const token = JSON.parse(window.localStorage.getItem("access"))
            dispatch(InitiaTokenFetch(token))
          },300000)
     
      }
  }
  },[])

  useEffect(()=>{
    if (first){
      first = false
      return
    }
    dispatch(AutoPredictFetch(UserInput))
  },[UserInput])

  useEffect(()=>{
    dispatch(CategoryFetch())
  },[])
  

  return (
    <BrowserRouter>
         <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/category' element={
            catActive?<Category/>:(<Navigate replace to="/"/>)
            }></Route>
            <Route path='/detail' element={
            dactive?<Detail/>:(<Navigate replace to="/"/>)
            }></Route>
            <Route path='/cart' element={<CartMain/>}></Route>
            <Route path='/search' element={
              searchparam?<Search/>:(<Navigate replace to="/"/>)}>
            </Route>
            <Route path='/login' element={
            loginsatus !== 200? <Login/>:(<Navigate replace to="/"/>)}>
            </Route>
          </Routes>
    </BrowserRouter>
  )
}


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store ={store}>
    <Main />
  </Provider>
)