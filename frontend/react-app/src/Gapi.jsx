import React,{useState,useEffect} from 'react'
import { gapi } from 'gapi-script'
import {GoogleLogin} from 'react-google-login'

export default function Gapi() {
    const clientId = "517439498055-nsctcop4v05f69rrmq83cl4m6783gb4e.apps.googleusercontent.com"

    useEffect(() => {
        const initClient = () => {
              gapi.client.init({
              clientId: clientId,
              scope: ''
            });
         };
         gapi.load('client:auth2', initClient);
     });

    const onSuccess = (res) => {
        console.log('success:', res);
    };
    const onFailure = (err) => {
        console.log('failed:', err);
    };

  return (
    <div>
        <GoogleLogin
          clientId={clientId}
          buttonText="Sign in with Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
          isSignedIn={true}
      />
    </div>
  )
}
