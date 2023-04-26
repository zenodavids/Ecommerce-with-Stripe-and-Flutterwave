# SETTING UP THE APP

> npx create-next-app

- in the package.json, replace the dependencies with;

  {
  "@sanity/client": "^3.2.0",
  "@sanity/image-url": "^1.0.1",
  "@stripe/stripe-js": "^1.25.0",
  "canvas-confetti": "^1.5.1",
  "next": "12.1.0",
  "next-sanity-image": "^3.2.1",
  "react": "17.0.2",
  "react-dom": "17.0.2",
  "react-hot-toast": "^2.2.0",
  "react-icons": "^4.3.1",
  "stripe": "^8.209.0"
  }

and use;

> npm i --legacy-peer-deps

this will install all the dependencies and no matter the time frame, it will install the exact version of the dependencies used.
\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

# SETTING UP SANITY

> npm install -g @sanity/cli
> sanity init --coupon javascriptmastery2022

- and follow the instructions
  -- sanity will ask for a login type
  -- will also ask if to use the default dataset configuration, accept.
  -- will ask you to select your schema

- we can go to the giignore file and remove the '/' sign in front of node modules to enable github savethe node modules.

### SANITY CLI COMMANDS

> sanity docs

- this opens the sanity documentation

> sanity manage

- this opens the sanity manager

> sanity start

- starts up the sanity studio

### SETTING UP THE SANITY SCHEMA

- open the schema folder in sanity_ecommerce folder,
- create two js files - product and banner
- set up the product and banner schemas
- import the two schemas in the schema.js file and put both schemas in the array there.
  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

# WHEN THE 'import' KEYWORD IS SHOWING THE RED ERROR LINE BELOW;

- then in the .eslintrc.json, paste the following line of code too;

> { "extends": ["next/babel", "next/core-web-vitals"] }

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

# TO SUPPORT THE JSX SYNTAX IMPORT;

- place the following line of code in the array thats in the .babelrc file

> "babel/preset-react"

next, install it via npm;

> npm i --save-dev @babel/preset-react

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

# CONNECTING SANITY TO THE APPLICATION

## GETTING INFO FROM THE SANITY MANAGER

- create a directory in the root directory called 'lib'
- create a file inside the lib directory named 'client.js
- get the necessary information for the client.js file by going to the sanity manager site with 'sanity manage'.
- to get the api token, in the sanity manager, click on API, select TOKEN, and select 'generate new'. create a new file called '.env' in the root directory and save the token there
  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

# ROUTING IN NEXT JS [RENDERING PAGES DYNAMICALLY]

unlike react where we need the 'react router', we can dynamically render pages in next js with the following steps;

- in the pages directory, we create another directory called 'product' and in the product directory, we create a file called '[slug].js'

- the reason for the square barackets is since slug is a unique key identifier, we can use it to dynamically route between the products pages.
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

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

# IMPLEMENTING STRIPE PAYMENT GATEWAY AND USING NEXT JS AS THE BACKEND

- to get started, we install stripe via npm and go to pages folder in our document and go to the api folder.

## GETTING STRIPE API KEYS

- stripe has two types of API keys ;
  -- secret key ,
  -- publishable key.

- but first, make sure your stripe dashboard is in TEST MODE, before you can access the api keys and put it back to LIVE MODE once all is set and you are ready to go live.

- to access the 'shipping rates', go to your stripe homepage and click on 'products' thats on the top left corner

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

# USING THE CONFETTI DISPLAY
- this is a party-like display element and to use it,
-- google 'canvas-confetti' and open the npm associated with it , locate the demo version in the npm link, and choose the best fit for you
-- install it via npm
