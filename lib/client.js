import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// we need to export the client to be able to use it
export const client = sanityClient({
  // this helps sanity know which project to connect us with
  projectId: 'ww8e7rq8',
  // this helps us know if we are in development or production
  dataset: 'production',
  // the current api version
  apiVersion: '2022-03-10',
  // wheher to use cdn, this is always set to 'true'
  useCdn: true,
  // api token
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
})
// to be able to use images from sanity, we pass in the client variable in the parameter
const builder = imageUrlBuilder(client)
// this enables us the url where our images are stored
export const urlFor = (source) => builder.image(source)
