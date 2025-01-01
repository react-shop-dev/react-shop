'use client';
import { useInAuthContext } from 'react-shop';
import { BasketButton } from './BasketButton';
import { AccountButton } from './AccountButton';
import { FlexRowCenter } from '@views/FlexRowCenter';

export const AppBarButtons = () => {
  const isAuthSetuped = useInAuthContext();

  return (
    <FlexRowCenter gap={1.5} className="mui-shop-app-bar-buttons">
      <BasketButton />
      {isAuthSetuped ? <AccountButton /> : null}
    </FlexRowCenter>
  );
};
