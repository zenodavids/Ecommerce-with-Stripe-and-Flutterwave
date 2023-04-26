export default {
  // name of schema
  name: 'product',
  title: 'Product',
  // type of schema
  type: 'document',
  fields: [
    // the Images field
    {
      name: 'image',
      title: 'Image',
      type: 'array',
      of: [{ type: 'image' }],
      options: {
        // the hotspot when set to true can enable images to be cropped
        hotspot: true,
      },
    },
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      // a slug is a unique identifier thats like a url
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        // this will automaically generate a unique slug based on the name property just above
        source: 'name',
        // the maxlength property of the slug won exceed 90 characters
        maxLength: 90,
      },
    },
    // the price field
    {
      name: 'price',
      title: 'Price',
      type: 'number',
    },
    // details field
    {
      name: 'details',
      title: 'Details',
      type: 'string',
    },
  ],
}
