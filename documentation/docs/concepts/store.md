# Global state

Managing state efficiently is crucial in building scalable e-commerce applications. Our library provides a lightweight atomic state management system inspired by [Jotai](https://jotai.org/). This approach addresses common issues with traditional state management solutions like React context, offering a more flexible and performant way to manage shared state.


### Why Atomic State Management?

When building client-side applications, developers often face challenges such as:

- **Unnecessary Re-renders**: React context can trigger excessive re-renders when state updates, even if only a small part of the app depends on that state.
- **Complex Memoization**: Managing performance through memoization becomes cumbersome when state changes frequently.
- **Scattered State Logic**: As applications grow, maintaining and scaling shared state can become difficult

Our atomic approach solves these problems by allowing developers to manage small, isolated pieces of state called atoms — that are directly accessible in any component. This minimizes re-renders and simplifies state logic.

### Key Utilities and Hooks

- **``atom``**: Small, isolated state definition, which can be any type: booleans, numbers, strings, objects, arrays, sets, maps.
```jsx title="src/store.js"
import { atom } from 'react-shop';

export const searchValue = atom('');
```
- **``useAtom``**: A simple hook for both reading and updating atom values, similar to React's useState.


```jsx title="src/Products.js"
'use client';

import { useAtom } from 'react-shop';
import { searchValue } from './store.js';

const products = ['Apple', 'Banana', 'Orange', 'Grape', 'Mango'];

function SearchWithList() {
  const [search, setSearch] = useAtom(searchAtom);

  const filteredProducts = products.filter((product) =>
    product.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search products..."
      />
      <ul >
        {filteredProducts.map((product) => (
          <li key={product}>{product}</li>
        ))}
      </ul>
    </div>
  );
}
```

- **``useSetAtom``**: A dedicated hook for updating atom values only, useful for separating read and write logic.

```jsx title="src/SearchInput.js"
'use client';

import { useSetAtom } from 'react-shop';
import { searchAtom } from './store';

function SearchInput() {
  const setSearch = useSetAtom(searchAtom);

  return (
    <input
      type="text"
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search products..."
    />
  );
}
```

- **``useAtomValue``**: A dedicated hook for reading atom values only, reducing re-renders when updates are unnecessary.

```jsx title="src/Products.js"
'use client';

import { useAtomValue } from 'jotai';
import { searchAtom } from './store';

const products = ['Apple', 'Banana', 'Orange', 'Grape', 'Mango'];

function ProductList() {
  const search = useAtomValue(searchAtom);

  const filteredProducts = products.filter((product) =>
    product.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ul>
      {filteredProducts.map((product) => (
        <li key={product}>{product}</li>
      ))}
    </ul>
  );
}
```
- **``atomWithReset``**: An atom that can be reset to its initial value using the **``useResetAtom``** hook.

```jsx title="src/store.js"

import { atomWithReset } from 'react-shop';

const getInitialSearch = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get('search') || '';
};

export const searchAtom = atomWithReset(getInitialSearch());
```

```jsx title="src/SearchInput.js"
'use client';

import { useSetAtom, useResetAtom } from 'react-shop';
import { searchAtom } from './store';

function SearchInput() {
  const setSearch = useSetAtom(searchAtom);
  const resetSearch = useResetAtom(searchAtom);

  return (
    <div>
      <input
        type="text"
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search products..."
      />
      <button onClick={resetSearch}>Reset</button>
    </div>
  );
}
```

- **``atomWithStorage``**: An atom that automatically syncs with localStorage, ideal for persisting UI states like user preferences.
```jsx title="src/store.js"
import { atomWithStorage } from 'react-shop';

export const themeAtom = atomWithStorage('theme', 'light'); // where 'theme' is a local storage key

```

### Internal atoms

Our atomic store simplifies state management for common e-commerce scenarios. Here ready-to-use atoms using by react shop components, which you can use too:

- **``cartOpenState``**: Manages cart dialog visibility. Type: ``Boolean``
- **``drawerState``**: Manages the sidebar’s open/closed state. Type: ``Boolean``
- **``authPopupState``**: Controls visibility and state of login/sign-up modals. Type: ``Boolean``
- **``viewModeState``**: Persists product display preferences across sessions. Type: ``'grid' | 'list'``
- **``listParamsState``**: Persists pagination, sorting and filtering  settings for products list pages. Type: ``Object``

```jsx title="Example""
'use client';

import { useAtom, viewModeState } from 'react-shop';

const SwitchProductViewButton = () => {
  const [mode, setMode] = useAtom(viewModeState);

  <button onClick={() => setMode(mode === ViewMode.grid ? 'list' : 'grid')}>
    {mode === 'grid' ? 'Switch to list' : 'Switch to grid'}
  <button>
}
```

:::note
While built-in store hooks and utils does not support derived atoms, async read, or async actions, developers are free to integrate libraries like [Jotai](https://jotai.org), [Zustand](https://zustand-demo.pmnd.rs) or [Recoil](https://recoiljs.org) to cover these needs.
:::
