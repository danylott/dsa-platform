import process from 'process';

interface Headers {
    [key: string]: any;
}

interface requestParams {
  url: string;
  fullUrl?: boolean;
}

interface headersRequestParams extends requestParams {
    headers?: Headers | undefined;
}

interface dataRequestParams extends requestParams {
  data: any;
  token?: string;
}

function getApiUrl(url: string, fullUrl: boolean) {
  return fullUrl
    ? url
    : `${process.env.NEXT_PUBLIC_BACKEND_API_URL || ''}${url}`;
}

export function get(
  { url, headers = undefined, fullUrl = false }: headersRequestParams,
) {
  const apiUrl = getApiUrl(url, fullUrl);

  return fetch(apiUrl, { cache: 'no-store', headers });
}

export function post({
  url, data, token = undefined, fullUrl = false,
} : dataRequestParams) {
  const apiUrl = getApiUrl(url, fullUrl);

  return fetch(apiUrl, {
    headers: {
      'content-type': 'application/json',
      ...(token && { authorization: `Bearer ${token}` }),
    },
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function patch({
  url, data, token = undefined, fullUrl = false,
} : dataRequestParams) {
  const apiUrl = getApiUrl(url, fullUrl);

  return fetch(apiUrl, {
    headers: {
      'content-type': 'application/json',
      ...(token && { authorization: `Bearer ${token}` }),
    },
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export function destroy({
  url, token = undefined, fullUrl = false,
} : dataRequestParams) {
  const apiUrl = getApiUrl(url, fullUrl);

  return fetch(apiUrl, {
    headers: {
      ...(token && { authorization: `Bearer ${token}` }),
    },
    method: 'DELETE',
  });
}
