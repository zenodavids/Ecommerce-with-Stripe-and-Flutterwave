import React, { useState } from 'react'
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from 'react-icons/ai'

import { client, urlFor } from '../../lib/client'
import { Product } from '../../components'
import { useStateContext } from '../../context/StateContext'

// place the returned values as props
const ProductDetails = ({ product, products }) => {
  // destructure the products schema object that way we dont have to use 'product.image' etc.
  const { image, name, details, price } = product
  // for the carousel that shows other photos of the specific product
  const [index, setIndex] = useState(0)
  // destructure the useState context.
  const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext()

  const handleBuyNow = () => {
    onAdd(product, qty)

    setShowCart(true)
  }

  return (
    <div>
      <div className='product-detail-container'>
        <div>
          <div className='image-container'>
            <img
              // if images show, show it via the index
              src={urlFor(image && image[index])}
              className='product-detail-image'
            />
          </div>
          <div className='small-images-container'>
            {/* this is where we apply the usestate */}
            {image?.map((item, i) => (
              <img
                key={i}
                src={urlFor(item)}
                // this syles the images based on a condition
                className={
                  i === index ? 'small-image selected-image' : 'small-image'
                }
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>

        <div className='product-detail-desc'>
          <h1>{name}</h1>
          <div className='reviews'>
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className='price'>&#8358;{price}.00</p>
          <div className='quantity'>
            <h3>Quantity:</h3>
            <p className='quantity-desc'>
              <span className='minus' onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className='num'>{qty}</span>
              <span className='plus' onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className='buttons'>
            <button
              type='button'
              className='add-to-cart'
              onClick={() => onAdd(product, qty)}
            >
              Add to Cart
            </button>
            <button type='button' className='buy-now' onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* you may also like section */}
      <div className='maylike-products-wrapper'>
        <h2>You may also like</h2>
        <div className='marquee'>
          <div className='maylike-products-container track'>
            {products.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// connect the sanity API backend with the frontend
export const getStaticPaths = async () => {
  // get the type thats equals to the product and return only the current slug property
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }
  `
  // gets the products
  const products = await client.fetch(query)
  // map through all the products and only show the slug of he current product
  const paths = products.map((product) => ({
    // return the slugs as path params
    params: {
      slug: product.slug.current,
    },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps = async ({ params: { slug } }) => {
  // this gets the first slug that matches the selected product's slug
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`

  // show all the other products that matches the shown product
  const productsQuery = '*[_type == "product"]'
  // we fetch the singular product
  const product = await client.fetch(query)
  // we fetch the other products
  const products = await client.fetch(productsQuery)

  return {
    props: { products, product },
  }
}

export default ProductDetails

// import React, { useState } from 'react';
// import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';

// import { client, urlFor } from '../../lib/client';
// import { Product } from '../../components';
// import { useStateContext } from '../../context/StateContext';

// const ProductDetails = ({ product, products }) => {
//   const { image, name, details, price } = product;
//   const [index, setIndex] = useState(0);
// const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();

// const handleBuyNow = () => {
//   onAdd(product, qty);

//   setShowCart(true);
// }

// return (
//   <div>
//     <div className="product-detail-container">
//       <div>
//         <div className="image-container">
//           <img src={urlFor(image && image[index])} className="product-detail-image" />
//         </div>
//         <div className="small-images-container">
//           {image?.map((item, i) => (
//             <img
//               key={i}
//               src={urlFor(item)}
//               className={i === index ? 'small-image selected-image' : 'small-image'}
//               onMouseEnter={() => setIndex(i)}
//             />
//           ))}
//         </div>
//       </div>

//       <div className="product-detail-desc">
//         <h1>{name}</h1>
//         <div className="reviews">
//           <div>
//             <AiFillStar />
//             <AiFillStar />
//             <AiFillStar />
//             <AiFillStar />
//             <AiOutlineStar />
//           </div>
//           <p>
//             (20)
//           </p>
//         </div>
//         <h4>Details: </h4>
//         <p>{details}</p>
//         <p className="price">${price}</p>
//         <div className="quantity">
//           <h3>Quantity:</h3>
//           <p className="quantity-desc">
//             <span className="minus" onClick={decQty}><AiOutlineMinus /></span>
//             <span className="num">{qty}</span>
//             <span className="plus" onClick={incQty}><AiOutlinePlus /></span>
//           </p>
//         </div>
//         <div className="buttons">
//           <button type="button" className="add-to-cart" onClick={() => onAdd(product, qty)}>Add to Cart</button>
//           <button type="button" className="buy-now" onClick={handleBuyNow}>Buy Now</button>
//         </div>
//       </div>
//     </div>

//     <div className="maylike-products-wrapper">
//         <h2>You may also like</h2>
//         <div className="marquee">
//           <div className="maylike-products-container track">
//             {products.map((item) => (
//               <Product key={item._id} product={item} />
//             ))}
//           </div>
//         </div>
//     </div>
//   </div>
// )
// }

// export const getStaticPaths = async () => {
//   const query = `*[_type == "product"] {
//     slug {
//       current
//     }
//   }
//   `;

//   const products = await client.fetch(query);

//   const paths = products.map((product) => ({
//     params: {
//       slug: product.slug.current
//     }
//   }));

//   return {
//     paths,
//     fallback: 'blocking'
//   }
// }

// export const getStaticProps = async ({ params: { slug }}) => {
//   const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
//   const productsQuery = '*[_type == "product"]'

//   const product = await client.fetch(query);
//   const products = await client.fetch(productsQuery);

//   console.log(product);

//   return {
//     props: { products, product }
//   }
// }

// export default ProductDetails
