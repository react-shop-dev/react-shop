import { ArrayInputControl, ArrayInputControlProps } from '../ArrayInputControl';
import { SimpleFormIterator, SimpleFormIteratorProps } from '../SimpleFormIterator';

export const FormIterator = ({
  source,
  isRequired,
  resource,
  label,
  helperText,
  margin,
  isDirty,
  isSubmitted,
  className,
  error,
  children,
  ...rest
}: SimpleFormIteratorProps & ArrayInputControlProps) => {
  return (
    <ArrayInputControl
      source={source}
      label={label}
      helperText={helperText}
      isRequired={isRequired}
      resource={resource}
      error={error}
      isDirty={isDirty}
      isSubmitted={isSubmitted}
      margin={margin}
      className={className}
    >
      <SimpleFormIterator source={source} resource={resource} {...rest}>
        {children}
      </SimpleFormIterator>
    </ArrayInputControl>
  );
};
