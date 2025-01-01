import { Aside, AsideProps } from 'react-shop-mui/Aside';
import { SideMenu } from 'react-shop-mui/SideMenu';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PaymentIcon from '@mui/icons-material/Payment';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { ACCOUNT_URL } from '@/lib/constants';

const menu = [
  {
    name: 'Profile',
    icon: PersonIcon,
    href: ACCOUNT_URL,
  },
  {
    name: 'Orders',
    href: `${ACCOUNT_URL}/orders`,
    icon: ShoppingBagIcon,
  },
  {
    name: 'Addresses',
    href: `${ACCOUNT_URL}/addresses`,
    icon: LocationOnIcon,
  },
  {
    name: 'Payment',
    href: `${ACCOUNT_URL}/payment`,
    icon: PaymentIcon,
  },
];

export const AccountSidebar = (props: AsideProps) => (
  <Aside {...props}>
    <SideMenu data={menu} />
  </Aside>
);
