'use client';
import { useIntlContext } from 'react-shop';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import LanguageIcon from '@mui/icons-material/Language';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import type { SxProps } from '@mui/material/styles';
import { ActionsButtonMenu } from '../ActionsButtonMenu';

export interface LocalesButtonProps {
  sx?: SxProps;
}

const languages: Record<string, string> = {
  en: 'English',
  ua: 'Українська',
};

export const LocalesButton = (props: LocalesButtonProps) => {
  const { sx } = props;

  const { locale, availableLocales = [], changeLocale } = useIntlContext();

  const setLocale = (locale: string): void => {
    changeLocale && changeLocale(locale);
  };

  return (
    <Box component="span" sx={sx}>
      <ActionsButtonMenu
        id="simple-menu"
        keepMounted
        icon={({ handleOpenMenu }) => (
          <Button
            color="inherit"
            aria-label=""
            aria-controls="simple-menu"
            startIcon={<LanguageIcon sx={{ fontSize: 10 }} />}
            endIcon={<ExpandMoreIcon fontSize="inherit" />}
            onClick={handleOpenMenu}
            sx={{ fontSize: 12, py: 0 }}
          >
            {locale}
          </Button>
        )}
      >
        {availableLocales.map((language: string) => (
          <MenuItem
            key={language}
            onClick={() => setLocale(language)}
            selected={language === locale}
          >
            {languages[language] || language}
          </MenuItem>
        ))}
      </ActionsButtonMenu>
    </Box>
  );
};
