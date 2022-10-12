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




  // if (firstrender){window.localStorage.setItem("access",JSON.stringify("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY3MzM3MTAzMywiaWF0IjoxNjY1NTk1MDMzLCJqdGkiOiI5MjFlZWU3ODQ4YWQ0YzE4ODE2ODg4YjIyYzhhODNhZiIsInVzZXJfaWQiOjF9.mD8yoqiK26Y-H53r5V3PE1okHPyk9tpqVS8ve9wkB20"))}
  console.log(window.localStorage.getItem("access"))
  useEffect(()=>{
    console.log("aliveeee")
    if (firstrender){
      firstrender=false
      const token = JSON.parse(window.localStorage.getItem("access"))
      if (token !== null){
        console.log(token)
          dispatch(InitiaTokenFetch(token))
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
            <Route path='/login' element={<Login/>}></Route>
          </Routes>
    </BrowserRouter>
  )
}


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store ={store}>
    <Main />
  </Provider>
)