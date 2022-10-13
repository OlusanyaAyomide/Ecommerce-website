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
  console.log(auth)
  
  console.log(loginsatus)
  useEffect(()=>{
    console.log("aliveeee")
    if (firstrender){
      firstrender=false
      const time = 1000*4*60
      const token = JSON.parse(window.localStorage.getItem("access"))
      if (token !== null){
          dispatch(InitiaTokenFetch(token))
          const interval = setInterval(()=>{
            console.log("alive")

            dispatch(InitiaTokenFetch(auth.token.refresh))
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