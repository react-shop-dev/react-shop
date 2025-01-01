import { ReactElement, ReactNode, Children, ElementType, Fragment } from 'react';
import { useShopConfig } from 'react-shop';
import type { SxProps } from '@mui/material/styles';
import Container from '@mui/material/Container';
import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { Logo } from 'src/layout/header/Logo';
import { SearchBar as DefaultSearchBar } from 'src/layout/header/SearchBar';
import { AppBarButtons } from 'src/layout/header/AppBarButtons';
import { Sticky } from 'src/lib/layout/Sticky';
import { BottomActions } from 'src/layout/header/BottomActions';
import { FlexBetween } from '@views/FlexBetween';
import { HeaderClasses, StyledHeader, StyledShopButton } from './Header.styles';

export const Header = (props: HeaderProps) => {
  const {
    sx,
    fixedOn = true,
    wrapper: Wrapper = fixedOn ? Sticky : Noop,
    logo,
    shopButton = defaultShopButton,
    catalogMenu,
    searchBar = defaultSearchBar,
    actions = defaultActionsElement,
    showBottomActions = true,
    children,
  } = props;

  const config = useShopConfig();

  return (
    <Fragment>
      <Wrapper>
        <StyledHeader position="relative" enableColorOnDark sx={sx}>
          <Container>
            {Children.count(children) === 0 ? (
              <FlexBetween className={HeaderClasses.row}>
                {shopButton}
                <Logo logo={logo} />
                {catalogMenu}
                {config?.feature?.search ? searchBar : null}
                {actions}
              </FlexBetween>
            ) : (
              children
            )}
          </Container>
        </StyledHeader>
      </Wrapper>
      {showBottomActions ? <BottomActions>{actions}</BottomActions> : null}
    </Fragment>
  );
};

const Noop = ({ children }: { children: ReactNode }) => <>{children}</>;

Header.displayName = 'ShopHeader';

const defaultShopButton = <StyledShopButton id="shop-button" />;
const defaultActionsElement = <AppBarButtons />;
const defaultSearchBar = <DefaultSearchBar />;

export type HeaderProps = MuiAppBarProps & {
  actions?: ReactElement;
  searchBar?: ReactNode;
  shopButton?: ReactNode;
  catalogMenu?: ReactNode;
  button?: ReactNode | false;
  logo?: ReactElement;
  sx?: SxProps;
  fixedOn?: boolean;
  showBottomActions?: boolean;
  wrapper?: ElementType<any>;
  children?: ReactNode;
};
