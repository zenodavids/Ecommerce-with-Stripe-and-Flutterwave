# FETCHING DATA IN NEXT JS

- to fetch data, we use 'getServerSideProps' and this the syntax;

> export const getServerSideProps = async (context) {
> return{
> props: {} // will be passed to the page component as props
> }
> }

- we also use getStaticProps in other components to fetch data when getServerSideProps is in use in the index.js and uses the getStaticPaths to support it when the routes are dynamically rendered.

  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

# PASSING {CHILDREN} AS PROPS

- when we pass in children as props in a component, we can wrap the whole app around the said component in the \_app.js in the hml element style. i.e;

> say we passed in children in the layout.js component;

~~in the Layout.jsx;~~

import React from 'react'
import Head from 'next/head'
import Navbar from './Navbar'
import Footer from './Footer'

const Layout = ({ children }) => {
return (

<div className='layout'>
{/_ the head is a typical head element in html _/}
<Head>
<title>ZENO</title>
</Head>
<header>
<Navbar />
</header>
<main className='main-container'>{children}</main>
<footer>
<Footer />
</footer>
</div>
)
}

export default Layout

~~in the app.js~~
import { Layout } from '../components'

const MyApp = ({ Component, pageProps }) => {
return (
<Layout>
<Component {...pageProps} />
</Layout>
)
}
