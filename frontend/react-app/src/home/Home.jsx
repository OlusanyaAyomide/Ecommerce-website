import React from 'react'
import  Header  from './home/Header'
import Caetegory from './home/caetegory'
import Latests from './home/latest'
import Affiliate from './home/Affiliate'


export function Home() {
    return(
      <div className='bg-[#d1c9b2] '>
        <div className="bg-slate-100"><Header/></div>
        <div><Caetegory/></div>
        <div><Latests/></div>
        <div><Affiliate/></div>
      </div>
    
    )
}
