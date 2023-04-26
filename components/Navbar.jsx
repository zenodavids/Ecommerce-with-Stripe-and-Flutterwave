// import React from 'react'
// import Link from 'next/link'
// import { AiOutlineShopping } from 'react-icons/ai'

// const Navbar = () => {
//   return (
//     <div className='navbar-container'>
//       <p className='logo'>
//         <Link href='/'>ZENO Headphones</Link>
//       </p>
//       <button type='button' className='cart-icon' onClick=''>
//         <AiOutlineShopping />

//         <span className='cart-item-qty'>1</span>
//       </button>
//     </div>
//   )
// }

// export default Navbar

import React from 'react'
import Link from 'next/link'
import { AiOutlineShopping } from 'react-icons/ai'

import { Cart } from './'
import { useStateContext } from '../context/StateContext'

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext()

  return (
    <div className='navbar-container'>
      <p className='logo'>
        <Link href='/'>ZEE Headphones</Link>
      </p>

      <button
        type='button'
        className='cart-icon'
        // this will close and open the button on demand
        onClick={() => setShowCart(true)}
      >
        <AiOutlineShopping />
        {/* this is what shows the notification */}
        <span className='cart-item-qty'>{totalQuantities}</span>
      </button>
      {/* show the cart if its set to true */}
      {showCart && <Cart />}
    </div>
  )
}

export default Navbar
