import React from 'react'

import { client } from '../lib/client'
import { Product, FooterBanner, HeroBanner } from '../components'

// 6. we pass in the returned values as props
const Home = ({ products, bannerData }) => {
  return (
    <div>
      {/* 7. if bannerData exists, pass in the first object in the bannerData array */}
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      <div className='products-heading'>
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className='products-container'>
        {/* we map through the product component and access it via props and from sanity */}
        {products?.map((product) => (
          <Product
            // the unique key
            key={product._id}
            // this lists out all the available products in our sanity dashboard
            product={product}
          />
        ))}
      </div>
      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </div>
  )
}
// we use this to access the sanity api
export const getServerSideProps = async () => {
  // 1. we grab all of our products  in the sanity dashboard.
  const query = '*[_type == "product"]'
  // 2. we use the sanity client to pass in the query
  const products = await client.fetch(query)
  // 3. we grab everything tha type equals banner
  const bannerQuery = '*[_type == "banner"]'
  // 4. we pass in the banner query to fetch data
  const bannerData = await client.fetch(bannerQuery)

  return {
    // 5. we use this returned values in our Home function
    props: { products, bannerData },
  }
}

export default Home

// import React from 'react';

// import { client } from '../lib/client';
// import { Product, FooterBanner, HeroBanner } from '../components';

// const Home = ({ products, bannerData }) => (
//   <div>
//     <HeroBanner heroBanner={bannerData.length && bannerData[0]}  />
//     <div className="products-heading">
//       <h2>Best Seller Products</h2>
//       <p>speaker There are many variations passages</p>
//     </div>

// <div className="products-container">
//   {products?.map((product) => <Product key={product._id} product={product} />)}
// </div>

//     <FooterBanner footerBanner={bannerData && bannerData[0]} />
//   </div>
// );

// export const getServerSideProps = async () => {
//   const query = '*[_type == "product"]';
//   const products = await client.fetch(query);

//   const bannerQuery = '*[_type == "banner"]';
//   const bannerData = await client.fetch(bannerQuery);

//   return {
//     props: { products, bannerData }
//   }
// }

// export default Home;
