/** @type {import('react-shop').ShopConfig} */
module.exports = {
  logo: {
    src: '/images/book.svg',
    width: 150,
    height: 40,
  },
  title: {
    default: 'Bookshelf',
    template: 'Bookshelf | %s',
  },
  description: 'E-commerce Bookstore',
  openGraph: {
    type: 'website',
    title: 'Bookshelf',
    siteName: 'bookshelf',
    description: 'Online Bookstore',
    url: '',
    images: [],
  },
  social: [
    {
      name: 'facebook',
      url: 'https://facebook.com',
    },
    {
      name: 'instagram',
      url: 'https://instagram.com',
    },
    {
      name: 'whatsup',
      url: 'tel:19102017',
    },
  ],
  gtag: process.env.NEXT_PUBLIC_GA_ID,
  auth: {
    authApiRoute: process.env.NEXT_PUBLIC_AUTH_API,
  },
  paths: {
    baseUrl: process.env.NEXT_PUBLIC_BASE_PATH,
  },
};
