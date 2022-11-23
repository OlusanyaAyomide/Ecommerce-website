import React from 'react'
import Header from '../detail/detail/Header'
import CatHero from "../CartList/cartlist/CartHero"
import Review from './profile/Review'
import Purchased from './profile/purchased'

export default function Profile() {
  return (
    <div className='relative'>
        <Header/>
        <CatHero/>
        <Purchased/>
        <Review/>
    </div>
  )
}
