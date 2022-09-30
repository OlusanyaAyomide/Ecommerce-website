import React from 'react'
import styles from './style.js'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

export function App(){
    return (
        <div className='bg-orange-200'>
            <div className="text-3xl text-center text-yellow-900">Lorem ipsum 20</div>
            <Link to="/home" state={{from:"occupation"}}>Home</Link>
        </div>
      )
}


