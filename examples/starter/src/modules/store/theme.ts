import { lightTheme, darkTheme } from 'react-shop-mui';

/**
 * @see https://mui.com/material-ui/customization/default-theme/
 */

const themeConfig = {
  theme: {
    colorSchemes: {
      ...lightTheme,
      ...darkTheme,
    },
  },
};

export default themeConfig;
