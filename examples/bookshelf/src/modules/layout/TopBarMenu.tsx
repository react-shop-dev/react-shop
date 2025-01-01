import { Navbar } from 'react-shop-mui/NavBar';

export const TopBarMenu = () => {
  return (
    <Navbar>
      <Navbar.Item to="/about" title="About" />
      <Navbar.Item to="/terms" title="Terms" />
      <Navbar.Item to="http://react-shop.dev" title="Site" />
    </Navbar>
  );
};
