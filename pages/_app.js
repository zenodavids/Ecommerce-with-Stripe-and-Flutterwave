import React from 'react'
import '../styles/globals.css'
// for the pop-up window
import { Toaster } from 'react-hot-toast'

import { StateContext } from '../context/StateContext'

import { Layout } from '../components'

const MyApp = ({ Component, pageProps }) => {
  return (
    <StateContext>
      <Layout>
        <Toaster />
        {/* whatever we pass in between a component, to get access to it, we use the keyword 'children' as a prop in that component and in this case its the layout component */}
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  )
}

export default MyApp

// what happens here is we place the Component inside the Layout element, hence whatever component or page we are on will maintain the layout style because everything is wrapped inside the layout

// import React from 'react';
// import { Toaster } from 'react-hot-toast';

// import { Layout } from '../components';
// import '../styles/globals.css';
// import { StateContext } from '../context/StateContext';

// function MyApp({ Component, pageProps }) {
//   return (
// <StateContext>
//   <Layout>
//     <Toaster />
//         <Component {...pageProps} />
//   </Layout>
// </StateContext>
//   )
// }

// export default MyApp
