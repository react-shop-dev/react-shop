import type { PropsWithChildren } from 'react';
import { PageView } from 'react-shop-mui/PageView';
import { AccountSidebar } from '@/modules/account/components/AccountSidebar';

const AccountLayout = async ({ children }: PropsWithChildren) => {
  return (
    <PageView
      aside={<AccountSidebar sticky />}
      drawer={<AccountSidebar />}
      sx={{ bgcolor: 'grey.100' }}
    >
      {children}
    </PageView>
  );
};

export default AccountLayout;
