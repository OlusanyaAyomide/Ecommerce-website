import React,{useEffect,useState} from 'react'
import Login from './Login'
import { authActions } from '../store/authslice'
import { useSelector,useDispatch } from 'react-redux'
import Footer from '../Footer'
// import { googlesignupLogin } from '../store/datafetch'

export default function LoginControl() {
  const [isreset,setisereset] = useState(false)
  const dispatch = useDispatch()
 useEffect(()=>{
    dispatch(authActions.setsignupusername({
      username:"",
      password:"",
      email:""
    }))
    console.log("reseting...")
    setisereset(true)
 },[])

  return (
    <div>
      { isreset && <div>
        <Login/>
        <Footer/>
    </div>}
    </div>

  )
}
