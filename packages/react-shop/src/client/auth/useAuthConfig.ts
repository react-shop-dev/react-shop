import { useShopConfig } from '../shop';

export const useAuthConfig = () => {
  const config = useShopConfig();
  return config?.auth;
};
