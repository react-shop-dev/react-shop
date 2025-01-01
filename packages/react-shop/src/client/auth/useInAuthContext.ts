import { useContext } from 'react';
import { AuthContext } from './AuthContext';

export const useInAuthContext = () => {
  const context = useContext(AuthContext);

  return !!context;
};
