---
sidebar_position: 3
---

# Configuration

React shop allows developers to customize their application using a ```shop.config.js``` file located at the root of the project. This file follows the ``CommonJS`` module format and is executed in a Next.js server runtimes.

### Overview

The ```shop.config.js``` file is a centralized place for storing site metadata, authentication settings, feature toggles, product and line items interface keys. While developers can still modify the codebase directly, we encourage consolidating this information in the configuration file for better maintainability.

```js title="Example""
module.exports = {
  logo: {
    src: '/images/logo.svg',
  },
  title: {
    default: 'My Store',
    template: 'My Store | %s',
  },
  description: 'E-commerce My Store',
  social: [
    {
      name: 'facebook',
      url: 'https://facebook.com',
    },
  ],
};  
```

:::info
Check [default configuration](https://github.com/react-shop-dev/react-shop/blob/main/packages/react-shop/src/config/defaultConfig.json) file, for available list of options.
:::

### Accessing Config settings

Use the provided hooks and functions to ensure consistent access to your configuration data throughout your application.

- **``getShopConfig``**: For accessing the configuration in server components.

```jsx
import { getShopConfig } from 'react-shop/functions';

function SiteTitle() {
  const { config } = getShopConfig();

  return <div>{config.title.default}</div>
}
```

- **``useShopConfig``**: For accessing the configuration in client components.

```jsx
'use client';

import { useShopConfig } from 'react-shop';

function SocialWidget() {
  const config = useShopConfig();
  const socialLinks = config?.social || [];

  return (
    <div>
      {socialLinks.map(link => (
        <a key={link.name} href={link.url} alt={link.name} target="_blank">{link.name}</a>
      ))}
    </div>
  ) 
}
```
