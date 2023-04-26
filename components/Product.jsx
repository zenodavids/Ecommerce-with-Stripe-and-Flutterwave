import React from 'react'
import Link from 'next/link'

import { urlFor } from '../lib/client'
// we pass in the product object
const Product = ({ product: { image, name, slug, price } }) => {
  return (
    <div>
      {/* recall, slug is the unique link identifier */}
      <Link href={`/product/${slug.current}`}>
        <div className='product-card'>
          <img
            // if image exists, show the images, starting from the first one in the image array
            src={urlFor(image && image[0])}
            width={250}
            height={250}
            className='product-image'
          />
          <p className='product-name'>{name}</p>
          <p className='product-price'>&#8358;{price}.00</p>
        </div>
      </Link>
    </div>
  )
}

export default Product
