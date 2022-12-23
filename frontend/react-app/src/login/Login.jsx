import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useState,useEffect } from 'react'
import { LoginFetch,googlesignupLogin } from '../store/datafetch'
import { useNavigate } from 'react-router-dom'
import {gapi} from 'gapi-script'
import { authActions } from '../store/authslice'
import { useGoogleLogin } from 'react-use-googlelogin'

export default function Login() {
    const token = useSelector((state=>state.auth.token.access))
    const error= useSelector((state=>state.auth.loginerr))
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const clientId = "517439498055-nsctcop4v05f69rrmq83cl4m6783gb4e.apps.googleusercontent.com"
    const [changing,setchanging] = useState(false)
    const [signedout,setsignedout] = useState(false)
    const [rendered,setrendered] = useState(false)
    
    console.log(rendered)
    
    const {signIn,isSignedIn,googleUser,signOut} = useGoogleLogin({clientId:clientId})

    let first = true
    useEffect(()=>{
        if (first){
            first=false
            return}
            if (token){
                navigate("/")
            }
    },[token,error])
    
    function handlesign(){
        signIn()
        setrendered((prev=>true))
    
    }

     console.log(isSignedIn)
     console.log(googleUser)

    function handleSubmit(event){
        event.preventDefault()
        const username = event.target.username.value
        const password = event.target.password.value
        console.log(username + " " + password)
        if(username !== "" && password !== ""){
            dispatch(LoginFetch(username,password))
    }
    }
    useEffect(()=>{
        if(isSignedIn){
            console.log(googleUser.profileObj.givenName , googleUser.profileObj.googleId,googleUser.profileObj.email)
            dispatch(authActions.setsignupusername({
                username:googleUser.profileObj.givenName,
                password:googleUser.profileObj.googleId,
                email:googleUser.profileObj.email
            }))
        }
        else{
            return
        }
    },[isSignedIn])
    
    useEffect(() => {
        const initClient = () => {
            console.log("gapi loaded")
              gapi.client.init({
              clientId: clientId,
              scope: ''
            });
         };
         gapi.load('client:auth2', initClient);
         console.log("setchangingg")
         setchanging(true)
     });

    useEffect(()=>{
        if (!changing || signedout || !isSignedIn){
            return}
        console.log(signedout)
        console.log("signinng out")
        signOut()
        setsignedout(true)
     },[changing,isSignedIn])

    useEffect(()=>{
        console.log(changing)
        console.log(isSignedIn)
        if(changing &&  isSignedIn){
            dispatch(googlesignupLogin(googleUser.profileObj.familyName,googleUser.googleId,true))
        }
        else{
            // console.log("im hereeee")
            // setrendered(false)
        }
    },[rendered,isSignedIn])
    
    return (
        <div>
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="p-6 m-auto bg-slate-200 w-11/12 lg:w-full rounded-md shadow-xl shadow-slate-300  ring-2 ring-[#5858ec] lg:max-w-xl">
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
                <div>
                    <button onClick={handlesign}>Sign in</button>
                    <button onClick={signOut}>Sign Out</button>
                </div>
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