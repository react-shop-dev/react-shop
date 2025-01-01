export const fetchUtil = async (url: string, data: any, method = 'POST') => {
  const body = JSON.stringify({
    ...data,
  });

  const requestOptions = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  };

  const response = await fetch(url, requestOptions);
  const text = await response.text();
  const { status, message, headers } = {
    headers: response.headers,
    status: response.status,
    message: text,
  };
  if (status < 200 || status >= 300) {
    return Promise.reject({ message });
  }
  return await Promise.resolve({ message, headers });
};
