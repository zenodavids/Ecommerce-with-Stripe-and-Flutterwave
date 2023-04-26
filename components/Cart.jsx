import React, { useRef } from 'react'
import Link from 'next/link'
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from 'react-icons/ai'
import { TiDeleteOutline } from 'react-icons/ti'
import toast from 'react-hot-toast'

import { useStateContext } from '../context/StateContext'
import { urlFor } from '../lib/client'
// import the stripe promise from the lib directory
import getStripe from '../lib/getStripe'

const Cart = () => {
  const cartRef = useRef()
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    toggleCartItemQuanitity,
    onRemove,
  } = useStateContext()
  // this is for the pay with stripe button
  const handleCheckout = async () => {
    const stripe = await getStripe()
    // make an api request to the next js backend to connect the stripe api
    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // this will pass in all the products the user selected in the cart
      body: JSON.stringify(cartItems),
    })
    // if something goes wrong, exit this function...
    if (response.statusCode === 500) return
    // ... else if all goes well, run the next three lines in this code block
    const data = await response.json()

    toast.loading('Redirecting...')

    stripe.redirectToCheckout({ sessionId: data.id })
  }

  return (
    <div className='cart-wrapper' ref={cartRef}>
      <div className='cart-container'>
        <button
          type='button'
          className='cart-heading'
          // this function closes the cart
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className='heading'>Your Cart</span>
          <span className='cart-num-items'>({totalQuantities} items)</span>
        </button>
        {/* if the cart is empty ... */}
        {cartItems.length < 1 && (
          <div className='empty-cart'>
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>
            {/* ... this button takes us back to the home page */}
            <Link href='/'>
              <button
                type='button'
                onClick={() => setShowCart(false)}
                className='btn'
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}
        <div className='product-container'>
          {/* if the cart is not empty, it maps through the array of items in the cart and renders... */}
          {cartItems.length >= 1 &&
            cartItems.map((item) => (
              <div className='product' key={item._id}>
                <img
                  // ... the images, starting from the first one, ...
                  src={urlFor(item?.image[0])}
                  className='cart-product-image'
                />
                <div className='item-desc'>
                  <div className='flex top'>
                    {/* ... the item names, ... */}
                    <h5>{item.name}</h5>
                    {/* ... the items prices, ... */}
                    <h4>&#8358;{item.price}</h4>
                  </div>
                  <div className='flex bottom'>
                    <div>
                      <p className='quantity-desc'>
                        <span
                          className='minus'
                          onClick={() =>
                            toggleCartItemQuanitity(item._id, 'dec')
                          }
                        >
                          <AiOutlineMinus />
                        </span>
                        <span className='num' onClick=''>
                          {item.quantity}
                        </span>
                        <span
                          className='plus'
                          onClick={() =>
                            toggleCartItemQuanitity(item._id, 'inc')
                          }
                        >
                          <AiOutlinePlus />
                        </span>
                      </p>
                    </div>
                    {/* button to remove items from the cart */}
                    <button
                      type='button'
                      className='remove-item'
                      onClick={() => onRemove(item)}
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {/* this calculates the total price */}
        {cartItems.length >= 1 && (
          <div className='cart-bottom'>
            <div className='total'>
              <h3>Subtotal:</h3>
              <h3>&#8358;{totalPrice}</h3>
            </div>
            <div className='btn-container'>
              <button type='button' className='btn' onClick={handleCheckout}>
                Pay with Stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
