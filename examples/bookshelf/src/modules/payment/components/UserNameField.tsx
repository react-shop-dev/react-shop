import { useInput } from 'react-shop';
import { TextField } from 'react-shop-mui/TextField';
import { TextInput, type TextInputProps } from 'react-shop-mui/TextInput';

type PropsWithViewMode = TextInputProps & { viewMode?: boolean };

export const UserNameField = (props: PropsWithViewMode) => {
  const { viewMode, source, ...rest } = props;

  const { field } = useInput({ source });

  return viewMode ? (
    <TextField fontSize={14} fontWeight={600} whiteSpace="nowrap" value={field.value} />
  ) : (
    <TextInput source={source} helperText={false} {...rest} />
  );
};
