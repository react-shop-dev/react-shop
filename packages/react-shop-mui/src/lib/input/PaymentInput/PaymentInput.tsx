import { FC, Fragment, useMemo, memo, useRef, forwardRef } from 'react';
import { FieldTitle } from 'react-shop';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import FormHelperText from '@mui/material/FormHelperText';
import { useCardComplete } from '@hooks/useCardComplete';
import type { PaymentInputEvent, PaymentInputProps } from 'src/types';

// eslint-disable-next-line react/display-name
export const PaymentInput: FC<PaymentInputProps> = memo(
  ({ label, component: Component, options, elementType, ...rest }) => {
    const theme = useTheme();
    const elementRef = useRef<HTMLDivElement | null>(null);

    const completeCardInput = useCardComplete(elementType);

    const finalOptions = useMemo(
      () => ({
        style: {
          base: {
            fontSize: `${theme.typography.htmlFontSize}px`,
            letterSpacing: '0.025em',
            color: theme.palette.text.primary,
            '::placeholder': {
              color: theme.palette.text.disabled,
            },
          },
          invalid: {
            color: theme.palette.error.main,
          },
        },
        ...options,
      }),
      [options],
    );

    const handleChange = (event: PaymentInputEvent) => {
      if (event.error) {
        // use ref to prevent rerender and reset value
        elementRef.current!.textContent = event.error.message;
      } else {
        elementRef.current!.textContent = '';
      }
      if (event.complete) {
        completeCardInput(event.elementType);
      }
    };

    return (
      <Fragment>
        {typeof label === 'string' ? <FieldTitle label={label} /> : null}
        <OutlinedInput
          {...rest}
          fullWidth
          slots={{
            // eslint-disable-next-line react/display-name
            input: forwardRef((_props, ref) => (
              <Box ref={ref} sx={{ width: '100%', padding: '8px 14px' }}>
                <Component options={finalOptions} onChange={handleChange} />
              </Box>
            )),
          }}
        />
        <FormHelperText
          ref={elementRef}
          component="div"
          dangerouslySetInnerHTML={{ __html: '&#8203;' }}
          error
        />
      </Fragment>
    );
  },
);
