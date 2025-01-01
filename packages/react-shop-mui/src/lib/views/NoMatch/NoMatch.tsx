'use client';

import { type ComponentType, Fragment } from 'react';
import { useTranslate, Title } from 'react-shop';
import type { SxProps } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import type { SvgIconProps } from '@mui/material/SvgIcon';
import ExploreOffIcon from '@mui/icons-material/ExploreOff';
import { Centered } from '../Centered';
import { Button, type ButtonProps } from '@button/Button';
import History from '@mui/icons-material/History';
import { NotMatchClasses, StyledNoMatch } from './NoMatch.styles';

export interface NoMatchProps {
  title?: string;
  message?: string | false;
  icon?: ComponentType<SvgIconProps>;
  button?: ComponentType<ButtonProps & { onClick?: () => void }>;
  sx?: SxProps;
}

export const NoMatch = ({
  title: titleProp = 'pages.not_found',
  message = 'rs.message.not_found',
  icon: Icon = ExploreOffIcon,
  button: GoBackButton = Button,
  sx,
}: NoMatchProps) => {
  const translate = useTranslate();

  const title = translate(titleProp, { _: titleProp });

  return (
    <Fragment>
      <Title title={title} />
      <StyledNoMatch sx={sx}>
        <Centered>
          <Icon color="info" className={NotMatchClasses.icon} />
          <Typography component="h1" variant="h5" gutterBottom>
            404 {title}
          </Typography>
          {message !== false ? (
            <Typography className={NotMatchClasses.message} gutterBottom>
              {translate(message, { _: message })}
            </Typography>
          ) : null}
          <Box className={NotMatchClasses.toolbar}>
            <GoBackButton label="rs.navigation.back" onClick={goBack}>
              <History />
            </GoBackButton>
          </Box>
        </Centered>
      </StyledNoMatch>
    </Fragment>
  );
};

function goBack() {
  window.history.go(-1);
}
