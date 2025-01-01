import { useShopConfig } from '../shop';

export const useBasepath = () => {
  const config = useShopConfig();
  return config?.paths?.baseUrl || '';
};
