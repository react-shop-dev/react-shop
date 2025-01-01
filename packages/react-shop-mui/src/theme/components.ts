import type { Components } from '@mui/material/styles';
import { typography } from './typography';
import { onyx } from './colors';

export const components: Components = {
  MuiCssBaseline: {
    styleOverrides: {
      '*': {
        boxSizing: 'border-box',
        margin: 0,
        padding: 0,
      },
      p: {
        lineHeight: 1.75,
      },
      button: {
        fontSize: typography.fontSize,
      },
      ul: {
        listStyle: 'none',
      },
      a: {
        color: 'inherit',
        textDecoration: 'none',
      },
    },
  },
  MuiMenuItem: {
    styleOverrides: {
      root: {
        paddingTop: 8,
        paddingBottom: 8,
      },
    },
  },
  MuiPagination: {
    defaultProps: {
      variant: 'outlined',
      color: 'primary',
    },
  },
  MuiDialog: {
    styleOverrides: {
      paper: {
        borderRadius: 8,
      },
    },
  },
  MuiSvgIcon: {
    styleOverrides: {
      root: {
        '& .secondary': {
          opacity: 0.4,
        },
      },
    },
  },
  MuiAutocomplete: {
    defaultProps: {
      fullWidth: true,
    },
  },
  MuiFormControl: {
    defaultProps: {
      variant: 'outlined',
      size: 'small',
      margin: 'dense',
      fullWidth: true,
    },
  },
  MuiTextField: {
    defaultProps: {
      variant: 'outlined',
      size: 'small',
      margin: 'none',
      fullWidth: true,
    },
  },
  MuiInputLabel: {
    styleOverrides: {
      root: {
        zIndex: 0,
      },
    },
  },
  MuiButton: {
    defaultProps: {
      color: 'inherit',
    },
    styleOverrides: {
      root: ({ ownerState }: Record<string, any>) => ({
        fontWeight: 600,
        borderRadius: 0,
        '[data-theme="light"] &': {
          color: ownerState.color || '#000',
        },
        textTransform: 'capitalize' as const,
        ...(ownerState.color === 'dark' && {
          color: '#fff',
          backgroundColor: onyx.main,
          ':hover': {
            backgroundColor: '#343434',
          },
        }),
        ...(ownerState.color === 'dark' &&
          ownerState.variant === 'outlined' && {
            color: onyx.main,
            borderRadius: '3px',
            backgroundColor: 'white',
            ':hover': {
              backgroundColor: onyx.main,
              color: 'white',
            },
          }),
      }),
    },
  },
  MuiChip: {
    defaultProps: {
      color: 'primary',
    },
    styleOverrides: {
      labelSmall: {
        paddingInline: 12,
      },
      colorSuccess: {
        backgroundColor: 'var(--shop-palette-success-main)',
      },
      colorInfo: {
        backgroundColor: 'var(--shop-palette-info-main)',
      },
      colorError: {
        backgroundColor: 'var(--shop-palette-error-main)',
      },
      colorSecondary: {
        color: 'var(--shop-palette-secondary-main)',
        backgroundColor: 'var(--shop-palette-secondary-light)',
      },
    },
  },
} as const;
