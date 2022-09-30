import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Home } from './home/Home.jsx'
import {BrowserRouter,Route,Routes} from "react-router-dom"

export default function Main() {
  return (
    <BrowserRouter>
         <Routes>
            <Route path='/' element={<Home/>}></Route>
         </Routes>
    </BrowserRouter>
  )
}


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
)
