# SEO

By default **Next.js** has [Metadata API](https://nextjs.org/docs/app/building-your-application/optimizing/metadata) for improving SEO and web shareability.
**React shop** provides several components that you can use as alternatives.

### ShopTemplate

The ``ShopTemplate`` component is a wrapper that simplifies metadata management, integrates with site settings, and enhances internationalization (i18n).
To update page metadata during navigation between pages you must use this component in ``template.jsx`` file, which updates children components state, when route was changed.

```jsx title="template.tsx"
import { ShopTemplate } from 'react-shop';

const Template = (props: { children: React.ReactNode }) => <ShopTemplate {...props} />;

export default Template;
```
- Syncs with ``shop.config.js``: Pulls settings like **title** and **description** directly from the configuration file for consistency.
- Built-in i18n Support: Ensures titles and metadata adapt to localized content.

If you want to add metadata generated special for **route** - see examples of usage ``Title`` and ``Head`` components below.

### Title

The Title component simplifies setting the page title and its corresponding Open Graph meta tag for social sharing.

```jsx title="Example"
import { Title } from 'react-shop';

export default function OrderConfirmedPage {
  return (
    <Title title="Order confirmed" />
  )
} 
```

```html title="Output"
<title>My Site | Order confirmed</title>
<meta property="og:title" content="Order confirmed" />
```

### Head

The ``Head`` component allows you to define metadata for your pages (similar to the ``Head`` component from older versions of Next.js). It is especially useful for setting, ``<meta>``, ``link`` tags, and other head elements that improve SEO and page structure.

```jsx title="Example"
import { Head } from 'react-shop';

export default function OrderConfirmedPage {
  return (
  <Head>
    <meta name="description" content="Order has been successfully placed" />
  </Head>
  )
} 
```
- Supports standard HTML head tags.
- Ideal for SEO optimization by customizing page titles, descriptions, and social sharing meta tags.

### Analytics

The ``shop.config.js`` file allows you to easily define your Google Analytics tracking ID for seamless integration.
The **gtag** property is used with the ``GoogleAnalytics`` component and the ``useAnalytics`` hook to initialize and track page navigation events.

```jsx title="shop.config.js"
module.exports = {
  gtag: process.env.NEXT_PUBLIC_GA_ID,
}; 
```
Ensure that ``NEXT_PUBLIC_GA_ID`` is set in your .env file to securely provide your tracking ID.

```bash title=".env"
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```
