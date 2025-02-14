import type { ReactNode, ComponentType } from 'react';
import { useState, Children, Fragment } from 'react';
import { useIntlContext, useThemesContext } from 'react-shop';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Add from '@mui/icons-material/Add';
import Remove from '@mui/icons-material/Remove';
import { FlexBetween } from '@views/FlexBetween';
import { Social as DefaultSocial, SocialProps } from 'src/lib/widgets/Social';
import { LocalesButton } from 'src/lib/button/LocalesButton';
import { ToggleThemeButton } from 'src/lib/button/ToggleThemeButton';
import { FlexBox } from '@views/FlexBox';
import { IconTooltipButton } from '@button/IconTooltipButton';
import { StyledTopBar, TopBarClasses } from './TopBar.styles';

export type TopBarProps = {
  navbar?: ReactNode;
  social?: ComponentType<SocialProps>;
  children?: ReactNode;
};

export const TopBar = (props: TopBarProps) => {
  const { navbar, social: Social = DefaultSocial, children } = props;

  const [expand, setExpand] = useState(false);

  const { availableLocales = [] } = useIntlContext();
  const { theme } = useThemesContext();

  const toggleExpand = () => {
    setExpand(state => !state);
  };

  return (
    <StyledTopBar id="shop-back-to-top-anchor" expand={expand}>
      <Container>
        <FlexBetween className={TopBarClasses.container}>
          {Children.count(children) ? (
            children
          ) : (
            <Fragment>
              {navbar ? (
                <Fragment>
                  <Box className={TopBarClasses.navbar}>{navbar}</Box>
                  <ExpandIcon expand={expand} clickHandler={toggleExpand} />
                </Fragment>
              ) : null}
              <FlexBox alignItems="center" gap={3} sx={{ ml: navbar ? 0 : 'auto' }}>
                {availableLocales.length > 0 ? <LocalesButton /> : null}
                <Social />
                {theme?.colorSchemes?.dark ? <ToggleThemeButton /> : null}
              </FlexBox>
            </Fragment>
          )}
        </FlexBetween>
      </Container>
    </StyledTopBar>
  );
};

const ExpandIcon = ({ expand, clickHandler }: { expand: boolean; clickHandler: () => void }) => (
  <IconTooltipButton
    label="Show Menu"
    disableRipple
    className={TopBarClasses.expand}
    color="inherit"
    onClick={clickHandler}
  >
    {expand ? <Remove /> : <Add />}
  </IconTooltipButton>
);
