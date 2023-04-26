import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { BsBagCheckFill } from 'react-icons/bs'

import { useStateContext } from '../context/StateContext'
import { runFireworks } from '../lib/utils'

const Success = () => {
  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext()
  // this useEffect execute as soon as the success page is loaded.
  useEffect(() => {
    // this clears the local storage
    localStorage.clear()
    // empty the cart
    setCartItems([])
    // sets the total price to 0
    setTotalPrice(0)
    // sets total quantities to 0
    setTotalQuantities(0)
    runFireworks()
  }, [])

  return (
    <div className='success-wrapper'>
      <div className='success'>
        <p className='icon'>
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your order!</h2>
        <p className='email-msg'>Check your email inbox for the receipt.</p>
        <p className='description'>
          If you have any questions, please email
          <a className='email' href='mailto:order@example.com'>
            order@example.com
          </a>
        </p>
        <Link href='/'>
          <button type='button' width='300px' className='btn'>
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Success
