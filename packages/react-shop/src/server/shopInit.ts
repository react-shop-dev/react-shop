import getHeaders, { GetHeadersResult } from './helpers/getHeaders';
import { GetCookieResult, getCookies } from './helpers/getCookies';
import { getShopVersion } from './helpers/getShopVersion';

type ShopInitResult = {
  cookies: GetCookieResult;
  headers: GetHeadersResult;
  version: string;
};

export const shopInit = async (): Promise<ShopInitResult> => {
  const [cookiesResult, headersResult, shopVersionResult] = await Promise.allSettled([
    await getCookies(),
    await getHeaders(),
    await getShopVersion(),
  ]);

  const cookies = getPromiseValue(cookiesResult, {});
  const headers = getPromiseValue(headersResult, {});
  const version = getPromiseValue(shopVersionResult);

  return {
    cookies,
    headers,
    version,
  };
};

function getPromiseValue<T>(promiseResult: PromiseSettledResult<T>, defaultValue?: any): T {
  if (promiseResult.status === 'fulfilled') {
    return promiseResult.value;
  }
  console.warn('Promise is not fulfilled');
  return defaultValue;
}
