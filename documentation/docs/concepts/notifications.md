# Notifications

## useNotify

Return a function, which shows notification at the top right corner of the page. This hook emits ``notify`` event which listening by ``NotificationProvider`` under the hood.

### Example

```jsx
import { useNotify } from 'react-shop';

const AddReview = () => {
  const notify = useNotify();

  const handleClick = () => {
     notify('Your feedback was added');
  }
  return <button onClick={handleClick}>Submit</button>;
};
```

### Parameters

The hook does not accept any arguments and returns a callback. This callback expects two arguments. <br />
First argument is the message to display. Type: ``string | ReactNode``.
```js
notify('Notification message');

notify(<div className="custom-content">Notification message</div>);
```

Second argument are the options object with available keys:

- **``type``**: Specifies the notification type (``info``, ``success``, ``error``, or ``warning``). The default is ``info``.

```js
notify('Your order has been send', { type: 'success' });
notify('Something went wrong', { type: 'error' });
notify('Are you sure you want to perform this action?', { type: 'warning' });
``` 

- **``autoHideDuration``**: The duration in milliseconds after which the notification is automatically hidden. Default is ``4000ms``.
```js
notify("I'm not in a hurry", { autoHideDuration: 8000 });
```

- **``multiline``**: Enable this option to display the notification message across multiple lines. Default is ``false``.
```js
notify("This message is quite lengthy and will appear across multiple lines", { multiLine: true });
```
- **``messageArgs``**: Options for the translate function, useful for injecting variables into translations.
```js
notify('Http error', { type: 'error', messageArgs: { _: error.message  }});
```
