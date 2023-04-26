import Stripe from 'stripe'

// create a new instance of stripe and pass in your api key
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY)
// in next js, each file has to have its own handler
export default async function handler(req, res) {
  // we can create a new 'if/else' statement for different types of request.
  // if the ree.method is a string of POST, ...
  if (req.method === 'POST') {
    // we use a try and catch method
    try {
      const params = {
        submit_type: 'pay',
        mode: 'payment',
        payment_method_types: ['card'],
        billing_address_collection: 'auto',
        // array of shipping rae options
        shipping_options: [
          // free shipping
          { shipping_rate: 'shr_1KxNIIK4TiIxqe5zzo82AVFB' },
          // fast shipping 20usd
          { shipping_rate: 'shr_1KxNKxK4TiIxqe5z5kC0r1u7' },
        ],
        // this gets the list items from what the user has added to the cart
        line_items: req.body.map((item) => {
          // the reference to this image is deployed from sanity
          const img = item.image[0].asset._ref
          const newImage = img
            .replace(
              'image-',
              'https://cdn.sanity.io/images/ww8e7rq8/production/'
            )
            // we must run this for other image formats as well
            .replace('-webp', '.webp')
          // return one object tha represents one of our items
          return {
            price_data: {
              currency: 'usd',
              product_data: {
                name: item.name,
                images: [newImage],
              },
              unit_amount: item.price * 100,
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.quantity,
          }
        }),
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/canceled`,
      }

      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params)

      res.status(200).json(session)
      // if something goes wrong with the code block,
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message)
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
