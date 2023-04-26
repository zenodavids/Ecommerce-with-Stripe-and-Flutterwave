import React, { createContext, useContext, useState, useEffect } from 'react'
// this is the little pop-up at appears when we finish our orders
import { toast } from 'react-hot-toast'

const Context = createContext()

export const StateContext = ({ children }) => {
  // show cart will currently not show cart on start
  const [showCart, setShowCart] = useState(false)
  // add items to cart will be set to empty. this will also include local storgae so if a user exits this page, thier selected items will be saved to thier local storage and when they come back to the page, thry will still have access to it
  const [cartItems, setCartItems] = useState([])
  // this keeps track of the total price and will be set to 0 on start
  const [totalPrice, setTotalPrice] = useState(0)
  // total quantities will be set to 0 on start
  const [totalQuantities, setTotalQuantities] = useState(0)
  // number of quantity of product will start with 1
  const [qty, setQty] = useState(1)

  let foundProduct
  let index

  const onAdd = (product, quantity) => {
    // this checks the products in the cart
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    )
    // this sets the price of the products and added quantities in the cart
    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity)
    // this keeps track of the number of quantites of products in the cart
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity)

    if (checkProductInCart) {
      // mapp through the products in the cart...
      const updatedCartItems = cartItems.map((cartProduct) => {
        // ... and if we have a product already in the cart and we want to add the product again...
        if (cartProduct._id === product._id)
          return {
            // ... instead of adding it again, it just increases the quantity.
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          }
      })

      setCartItems(updatedCartItems)
    } else {
      // else if the product is not in cart...
      product.quantity = quantity
      // ...add it.
      setCartItems([...cartItems, { ...product }])
    }
    // show toast sucess pop up
    toast.success(`${qty} ${product.name} added to the cart.`)
  }
  // to remove items from cart
  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id)
    const newCartItems = cartItems.filter((item) => item._id !== product._id)

    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice - foundProduct.price * foundProduct.quantity
    )

    setTotalQuantities(
      (prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity
    )

    setCartItems(newCartItems)
  }

  const toggleCartItemQuanitity = (id, value) => {
    // finds an item in the cart ...
    foundProduct = cartItems.find((item) => item._id === id)
    // ... and also get the index of the found item
    index = cartItems.findIndex((product) => product._id === id)
    // const newCartItems = cartItems.filter((item) => item._id !== id)

    // this is for increasing quantity in the cart.
    // if the value increases...
    if (value === 'inc') {
      // ... create a new array of items, include the already existing products, possibly increase the quantity, ...
      setCartItems([
        ...cartItems.slice(0, index),
        { ...foundProduct, quantity: foundProduct.quantity + 1 },
        ...cartItems.slice(index + 1),
      ])
      // ... increase the price and sum it up to the already existing price.
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)

      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1)
      // if the value decreases, ...
    } else if (value === 'dec') {
      if (foundProduct.quantity > 1) {
        setCartItems([
          ...cartItems.slice(0, index),
          { ...foundProduct, quantity: foundProduct.quantity - 1 },
          ...cartItems.slice(index + 1),
        ])
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1)
      }
    }
  }
  // this will always increase the number of quantity by 1
  const incQty = () => {
    setQty((prevQty) => prevQty + 1)
  }

  // this will always reduce the number of quantity by 1 and not go beyond 1
  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1

      return prevQty - 1
    })
  }

  return (
    <Context.Provider
      // here, we pass all of our state fields
      value={{
        // start of state fields
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        // end of state fields
        // start of functions
        onAdd,
        toggleCartItemQuanitity,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
      }}
    >
      {children}
    </Context.Provider>
  )
}

// this exports the useState context and allows us to use it in other components like a hook
export const useStateContext = () => useContext(Context)
