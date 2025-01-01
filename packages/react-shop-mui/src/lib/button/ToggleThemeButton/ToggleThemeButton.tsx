'use client';
import { useTranslate } from 'react-shop/translate';
import { useColorScheme } from '@mui/material/styles';
import { SwitchProps } from '@mui/material/Switch';
import { COLOR_SCHEME_DARK, COLOR_SCHEME_LIGHT } from 'src/theme/constants';
import { StyledSwitch } from './ToggleThemeButton.styles';

export type ToggleThemeButtonProps = SwitchProps;

export const ToggleThemeButton = (props: ToggleThemeButtonProps) => {
  const { color = 'default', sx = {}, ...rest } = props;

  const { mode, setMode } = useColorScheme();
  const translate = useTranslate();

  const handleToggleMode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMode(event.target.checked ? COLOR_SCHEME_DARK : COLOR_SCHEME_LIGHT);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute('content', event.target.checked ? 'black' : 'white');
    }
  };

  const checkMode =
    mode === COLOR_SCHEME_DARK ? translate('rs.view.light') : translate('rs.view.dark');
  const title = translate('rs.view.switch', { mode: checkMode });

  return (
    <StyledSwitch
      size="small"
      checked={mode === COLOR_SCHEME_DARK}
      color={color}
      title={title}
      onChange={handleToggleMode}
      sx={sx}
      inputProps={{ 'aria-label': 'Toggle theme' }}
      {...rest}
    />
  );
};
