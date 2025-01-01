import { FormDataConsumer } from 'react-shop';
import { PasswordInput } from 'react-shop-mui/PasswordInput';
import Typography from '@mui/material/Typography';
import { demoUserCheck } from '@/lib/customer/getCustomerFromDB';

export const ProfilePassword = () => {
  return (
    <FormDataConsumer>
      {({ formData }) =>
        formData.has_account && !demoUserCheck(formData.email) ? (
          <>
            <PasswordInput label="Password *" source="old_password" />
            <PasswordInput label="New Password" source="new_password" />
            <Typography variant="caption" sx={{ px: 1 }}>
              * The current password is hidden for security reasons.
            </Typography>
          </>
        ) : null
      }
    </FormDataConsumer>
  );
};
