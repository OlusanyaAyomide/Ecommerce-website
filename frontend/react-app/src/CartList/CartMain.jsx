import React from 'react'
import Header from '../detail/detail/Header'
import CatHero from './cartlist/CartHero'
import Checkout from './cartlist/Checkout'

export default function CartMain() {
  return (
    <div>
        <div><Header/></div>
        <div><CatHero/></div>
        <div><Checkout/></div>

    </div>
  )
}
