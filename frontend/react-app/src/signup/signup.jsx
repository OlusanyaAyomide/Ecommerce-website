import React from 'react'
import {useState,useEffect} from "react"
import { useDispatch,useSelector } from 'react-redux'
import { authActions } from '../store/authslice'
import { useNavigate } from 'react-router-dom'


export default function Signup() {
    const {signuperror} = useSelector((state=>state.auth))
    const navigate =useNavigate()
    const [formInput,setformInput] = useState({
        username:"",
        password:"",
        email:"", 
        password2:"",
    })
    const [formControl,setformcontrol] = useState({email:false,password:false,password2:false})
    const dispatch = useDispatch()
    const handleSubmit=(event)=>{
        setformcontrol({email:false,password:false,password2:false})
        event.preventDefault()
        let error  = false
        const {username,email,password,password2} = event.target
        console.log(event.target.username.value)
        if (!email.value.includes("@gmail.com")){
            error = true
            setformcontrol((prev)=>{return{...prev,["email"]:true}})
        }
        if (password.value.length < 7 ){
            error = true
            setformcontrol((prev)=>{return {...prev,["password"]:true}})
        }
        if (password.value !== password2.value){
            error = true
            setformcontrol((prev)=>{return {...prev,["password2"]:true}})
        }
        console.log("last ",error)
        if (!error){
            dispatch(authActions.setsignupusername({
                username:username.value,
                password:password.value,
                email:email.value,
            })) 
        }
    
    }
    
  return (
    <div>
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
        <div className="p-6 m-auto bg-slate-200 w-11/12 lg:w-full rounded-md shadow-xl shadow-slate-300  ring-2 ring-[#5858ec] lg:max-w-xl">
            <h1 className="text-3xl font-semibold text-center text-[#5858ec] underline uppercase decoration-wavy">
               Sign Up
            </h1>
            <form className="mt-6" onSubmit={handleSubmit}>
                <div className="mb-2">
                    {signuperror !== "" && <span className='text-red-500 font-semibold text-md'>{signuperror}</span>}
                    <label
                        htmlFor="username"
                        className="block text-sm font-semibold text-gray-800"
                    >
                        Username
                    </label>
                    <input
                        id="username"
                        type="text"
                        name="username"
                        autoComplete='current-username'
                        className="block w-full px-4 py-2 mt-2 text-[#5858ec]  bg-white border rounded-md focus:border-[#5858ec]/40 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                </div>
                <div className="mb-2">
                     {formControl.email && <span className='text-red-500 font-semibold text-md'>{"Email is not valid"}</span>} 
                    <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-gray-800"
                    >
                      Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        // autoComplete='email@gmail.com'
                        className="block w-full px-4 py-2 mt-2 text-[#5858ec]   bg-white border rounded-md focus:border-[#5858ec]/40 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                </div>

                <div className="mb-2">
                    {formControl.password && <span className='text-red-500 block font-semibold text-md'>
                        {"Password field is empty or To short"}</span>} 
                    {formControl.password2 && <span className='text-red-500 block font-semibold text-md'>
                        {"Password does not match"}</span>} 
                    <label
                        htmlFor="password"
                        className="block text-sm font-semibold text-gray-800"
                    >
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        autoComplete='current-username'
                        className="block w-full px-4 py-2 mt-2 text-[#5858ec]   bg-white border rounded-md focus:border-[#5858ec]/40 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                </div>
                <div className="mb-2">
                    <label
                        htmlFor="password"
                        className="block text-sm font-semibold text-gray-800"
                    >
                        Confirm Password
                    </label>
                    <input
                        id="password2"
                        type="password"
                        name="password2"
                        autoComplete='current-username'
                        className="block w-full px-4 py-2 mt-2 text-[#5858ec]   bg-white border rounded-md focus:border-[#5858ec]/40 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                </div>

                <div className="mt-6">
                    <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#5858ec] rounded-md hover:bg-[#0e0e6b] focus:outline-none focus:bg-[#5858ec]">
                        Login
                    </button>
                </div>
            </form>
            <button onClick={()=>{navigate("/login")}} className="font-medium text-[#5858ec] text-sm hover:underline">Back To login</button>
        </div>
    </div>
 </div>
  )
}
