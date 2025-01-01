import { DateInput } from 'react-shop-mui/DateInput';
import { TextInput } from 'react-shop-mui/TextInput';
import { PhoneInput } from '@/modules/common/PhoneInput';
import { format as formatDate } from 'date-fns';
import { StyledProfileInfo } from './ProfileInfo.styles';

export const EditProfileInfo = () => {
  return (
    <StyledProfileInfo>
      <TextInput label="Email" source="user_email" readOnly />
      <PhoneInput label="Phone" source="phone" />
      <DateInput
        label="Birth date"
        source="date_of_birth"
        helperText={false}
        slotProps={{ htmlInput: { max: formatDate(new Date(), 'yyyy-MM-dd') } }}
      />
    </StyledProfileInfo>
  );
};
