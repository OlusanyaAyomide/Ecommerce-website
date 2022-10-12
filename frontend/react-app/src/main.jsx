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
import {AutoPredictFetch,CategoryFetch} from "./store/datafetch"
import CartMain from './CartList/CartMain'
import Search from './search/Search'
import Login from './login/Login'

let first = false
export default function Main() {
  const dispatch = useDispatch()
  const UserInput = useSelector((state=>state.product.search.userinput))
  const dactive = useSelector((state=>state.detail.active))
  const catActive = useSelector((state=>state.category.active))
  const searchparam = useSelector((state=>state.search.params))
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
