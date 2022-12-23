import React,{useEffect,useState} from 'react'
import {useGoogleLogin} from "react-use-googlelogin"


export default function Test() {
    const clientId = "517439498055-nsctcop4v05f69rrmq83cl4m6783gb4e.apps.googleusercontent.com"
    const [testuser,settestuser] = useState("")
    const {signIn,signOut,googleUser,isSignedIn} = useGoogleLogin({clientId:clientId})
    
    console.log(googleUser)

    function signIntest(){
      signIn()
    }

    useEffect(() => {
      const initClient = () => {
            gapi.client.init({
            clientId: clientId,
            scope: ''
          });
       };
       gapi.load('client:auth2', initClient);
   });


  return (
    <div>
        <button className='border block mx-auto text-lg rounded-md bg-slate-100' onClick={signIntest}>sign in</button>
        <button className='border block mx-auto text-lg rounded-md bg-slate-100' onClick={signOut}>sign Out</button>
        {isSignedIn && <span>{googleUser.profileObj.givenName}</span>}
    </div>
  )
}
