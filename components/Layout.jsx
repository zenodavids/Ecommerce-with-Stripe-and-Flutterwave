import React from 'react'
// this is the same as the head tag in html that gives info about the metadata
import Head from 'next/head'

import Navbar from './Navbar'
import Footer from './Footer'

// to make the layout accessible, we must pass in the keyword 'children in the parameter and this accesses all oher components'
const Layout = ({ children }) => {
  return (
    <div className='layout'>
      {/* the head is a typical head element in html */}
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
