import React,{useState,useEffect} from 'react'
import Signup from './signup'
import { useSelector,useDispatch } from 'react-redux'
import { authActions } from '../store/authslice'
import { googlesignupLogin } from '../store/datafetch'
import Footer from '../Footer'


export default function Signupcontrol() {
  const {signupusername,signuppassword,signupemail} = useSelector((state=>state.auth))
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
  useEffect(()=>{
    if (signuppassword !== ""){
      dispatch(googlesignupLogin(signupusername,signuppassword,signupemail,false))
    }
  },[signupusername,signuppassword,signupemail])
  return (
    <div>
      {isreset && <div><Signup/></div>}
      <div><Footer/></div>
    </div>

  )
}
