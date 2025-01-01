import { TextInput, type TextInputProps } from 'react-shop-mui/TextInput';
import { InputHolder } from '../../common/InputHolder';

interface CheckoutInputProps extends Omit<TextInputProps, 'source'> {
  gridColumn?: number;
  source?: string;
}

export const CheckoutInput = ({ source, gridColumn, ...rest }: CheckoutInputProps) => {
  return (
    <InputHolder gridColumn={gridColumn}>
      <TextInput source={source as string} {...rest} />
    </InputHolder>
  );
};
