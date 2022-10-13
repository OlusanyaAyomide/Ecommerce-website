import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useState,useEffect } from 'react'
import { LoginFetch } from '../store/datafetch'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const token = useSelector((state=>state.auth.token.access))
    const error= useSelector((state=>state.auth.loginerr))
    console.log(error)
    const navigate = useNavigate()
    let first = true
    useEffect(()=>{
        if (first){
            first=false
            return}
            if (token){
                navigate("/")
            }
    },[token,error])

    const dispatch = useDispatch()
    function handleSubmit(event){
        event.preventDefault()
        const username = event.target.username.value
        const password = event.target.password.value
        console.log(username + " " + password)
        if(username !== "" && password !== ""){
            dispatch(LoginFetch(username,password))
    }
    }

    return (
        <div className='b'>
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="p-6 m-auto bg-white w-11/12 lg:w-full rounded-md shadow-xl shadow-slate-300  ring-2 ring-[#5858ec] lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-[#5858ec] underline uppercase decoration-wavy">
                   Sign in
                </h1>
                <form className="mt-6" onSubmit={handleSubmit}>
                    <div className="mb-2">
                        {error && <span className='text-red-500 font-semibold text-md'>{error}</span>}
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            autoComplete='current-password'
                            className="block w-full px-4 py-2 mt-2 text-[#5858ec]  bg-white border rounded-md focus:border-[#5858ec]/40 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            autoComplete='current-username'
                            className="block w-full px-4 py-2 mt-2 text-[#5858ec]   bg-white border rounded-md focus:border-[#5858ec]/40 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <a
                        href="#"
                        className="text-xs text-[#5858ec] hover:underline"
                    >
                        Forgot Password?
                    </a>
                    <div className="mt-6">
                        <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#5858ec] rounded-md hover:bg-[#0e0e6b] focus:outline-none focus:bg-[#5858ec]">
                            Login
                        </button>
                    </div>
                </form>

                <p className="mt-8 text-xs font-light text-center text-gray-700">
                    {" "}
                    Don't have an account?{" "}
                    <a
                        href="#"
                        className="font-medium text-[#5858ec] hover:underline"
                    >
                        Sign up
                    </a>
                </p>
            </div>
        </div>
     </div>
    );
}