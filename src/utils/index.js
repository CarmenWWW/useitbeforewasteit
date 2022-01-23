// TODO: replace API settings in json-server with real rest-api
export function isDev() {
  return !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
}

export function getApiUrl() {
  if (isDev()) {
    return 'http://localhost:3001/api/items'; // dev
  }

  return '/api/items'; // prod
}
