import { useProductOptions } from 'react-shop';
import type { ProductOption } from 'react-shop-types';
import get from 'lodash/get';
import { ToggleOptions, ToggleOptionsProps } from 'src/lib/widgets';
import { FlexBox } from '@views/FlexBox';

export type ProductOptionsProps = { data?: ProductOption[] } & Partial<
  ToggleOptionsProps<ProductOption>
>;

export const ProductOptions = (props: ProductOptionsProps) => {
  const { data = [], sx, className, ...rest } = props;

  const [options, updateOptions] = useProductOptions();

  return data?.length ? (
    <FlexBox className={className} gap={1.5} flexDirection="column" sx={sx}>
      {data.map((option: ProductOption) => (
        <ToggleOptions
          key={option.id}
          label={`${option.title}:`}
          option={option}
          value={option.id ? get(options, option.id) : null}
          onHandleChange={value => updateOptions({ [option.id]: value })}
          {...rest}
        />
      ))}
    </FlexBox>
  ) : null;
};
