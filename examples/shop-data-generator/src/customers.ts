import type { CardPayment, Customer } from 'react-shop-types';
import {
  MOCK_CUSTOMER_ID,
  MOCK_CUSTOMER_EMAIL,
  MOCK_CUSTOMER_FIRST_NAME,
  MOCK_CUSTOMER_LAST_NAME,
} from './constants';
import { faker } from './faker';
import { DEFAULT_REGION } from './regions';

export const generateCustomers = (): Customer[] => {
  const id = MOCK_CUSTOMER_ID || `cus_${faker.string.uuid()}`;
  const phone = faker.phone.number();
  const address = generateAddress(id, phone);

  return [
    {
      id,
      name: `${MOCK_CUSTOMER_FIRST_NAME} ${MOCK_CUSTOMER_LAST_NAME}`,
      first_name: MOCK_CUSTOMER_FIRST_NAME,
      last_name: MOCK_CUSTOMER_LAST_NAME,
      has_account: true,
      image: faker.image.avatar(),
      phone: faker.phone.imei(),
      email: MOCK_CUSTOMER_EMAIL,
      date_of_birth: faker.date.birthdate({ min: 18, max: 81, mode: 'age' }),
      billing_address_id: address.id,
      billing_address: address,
      shipping_addresses: [address],
      payments,
    },
  ];
};

const generateAddress = (id: string, phone: string) => {
  const country_code = faker.location.countryCode();
  const country = faker.location.country();
  return {
    id: `addr_${faker.string.uuid()}`,
    first_name: MOCK_CUSTOMER_FIRST_NAME,
    last_name: MOCK_CUSTOMER_LAST_NAME,
    country_code,
    phone,
    customer_id: id,
    company: faker.company.name(),
    city: faker.location.city(),
    postal_code: faker.location.zipCode(),
    province: faker.location.state(),
    address_1: faker.location.street(),
    address_2: faker.location.secondaryAddress(),
    country: {
      id: country,
      iso_2: country_code,
      iso_3: faker.location.countryCode('alpha-3'),
      num_code: Number(faker.location.countryCode('numeric')),
      name: country,
      region_id: DEFAULT_REGION,
      display_name: country,
    },
    created_at: faker.date.past({ years: 1 }),
  };
};

const payments: CardPayment[] = [
  {
    cvc: faker.finance.creditCardCVV(),
    card_number: faker.finance.creditCardNumber({
      issuer: '[3-6]##############L',
    }),
    expire_at: {
      expYear: new Date().getFullYear() + faker.number.int({ min: 1, max: 5 }),
      expMonth: faker.number.int({ min: 1, max: 12 }),
    },
  },
  {
    cvc: faker.finance.creditCardCVV(),
    card_number: faker.finance.creditCardNumber({
      issuer: '[3-6]###-####-####-###L',
    }),
    expire_at: {
      expYear: new Date().getFullYear() + faker.number.int({ min: 1, max: 5 }),
      expMonth: faker.number.int({ min: 1, max: 12 }),
    },
  },
];
