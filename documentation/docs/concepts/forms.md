# Forms

React shop leverages a third-party form library called [react-hook-form](https://react-hook-form.com), designed to simplify the creation of fully-featured forms.

## Usage

The ``Form`` component is a headless component that handles form state and validation. It's ideal for creating custom form layouts with full control over the design and structure.

```jsx title="Example"
import { Form, required, email, minLength } from 'react-shop';
import { TextInput } from 'react-shop-mui/TextInput';
import { PasswordInput } from 'react-shop-mui/PasswordInput';
import { SubmitButton } from 'react-shop-mui/SubmitButton';

export default function LoginForm {
  const handleSubmit = (formData) => {
    // Send Data
  };

  return (
     <Form onSubmit={handleSubmit}>
        <TextInput source="email" label="Email" validate={[required(), email()]} />
        <PasswordInput source="password" label="Password" validate={required(), minLength(8)} />
        <SubmitButton label="Submit" />
     </Form>
  )
} 
```

:::tip
You can use ``Form`` with ``EditBase`` or ``CreateBase`` components, when working with creating or editing records. This allows you to easily fetch and save data.
:::

## Validation

There are multiple ways to add validation rules to your form inputs:

- **Input validators**
```jsx
<TextInput source="email" label="Email" validate={[required(), email()]} />
```

- **Global Form validation**
```jsx
  const validateForm = (values) => {
    const errors = {};
    if (!values.email) {
        errors.email = 'The Email is required';
    }
    return errors;
  }

  <Form validate={validateForm}>
    ... 
  </Form>
```

- **Validation schema** powered by ``yup`` or ``zod``
```jsx
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const Schema = z.object({
  email: z.string().email({
    message: 'Enter correct value',
  }),
  password: z.string().min(8, {
    message: 'At least 8 characters',
  }),
});

<Form resolver={zodResolver(Schema)}>
  ... 
</Form>
```

- **Server-side validation**
```js
  {
    "body": {
      "errors": {
        "email": "Account with this email already exists",
      }
    }
  }
```


## Default values
``Form`` components initialize the form based on the current ``RecordContext`` values. If the ``RecordContext`` is empty, the form will be empty. <br />
You can set default values in two ways: 

- Set default values for the entire **form**:
```jsx
<Form defaultValues={{ country_code: "us" }}>
  <SelectInput
    source="country_code"
    label="Country"
    choices={[{id: 1, name: "us"}, {id: 2, name: "ca"}]}
  />
</Form>
```

- Set default values for specific **inputs**:
```jsx
<Form>
  <SelectInput
    source="country_code"
    label="Country"
    choices={[{id: 1, name: "us"}, {id: 2, name: "ca"}]}
    defaultValue="us"
  />
</Form>
```

:::note
React shop will ignore input specific default values if the ``Form`` already defines a global defaultValues.
:::

## Transform Data 

This example demonstrates how to use the transform function to modify the form data before submitting it.
This transformation is passed to the ``SubmitButton`` component via the ``transform`` prop. The function takes the original form data and reshapes it into a format compatible with your API.

```jsx
import { CreateBase, Form } from 'react-shop';
import { SubmitButton } from 'react-shop-mui/SubmitButton';

const transformDataBeforeSubmit = (data: Record<string, any>) => ({
  ...data,
  address: {
    city: data.address.city,
    postal_code: data.address.postal_code,
    country: data.address?.country_code,
    line1: data.address?.address_1,
  },
});

export const OrderCreate = () => {
  return (
    <CreateBase>
      <Form>
        ...
        <SubmitButton transform={transformDataBeforeSubmit} />
      </Form>
    </CreateBase>
  )
}
```