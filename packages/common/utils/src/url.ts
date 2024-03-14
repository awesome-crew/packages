export function parseUrl(url: string) {
  const urlObject = new URL(url);

  return {
    originPath: urlObject.origin + urlObject.pathname,
    pathname: urlObject.pathname,
    query: parseSearch(urlObject),
  };
}

export function parseSearch(url: URL) {
  const search = url.search;

  if (search === '') {
    return {};
  }

  return search
    .slice(1, search.length)
    .split('&')
    .reduce<Record<string, string | string[]>>((result, chip) => {
      const [key, value] = chip.split('=');
      const queryKey = key.trim();
      const param = value.trim();

      const queryValue = result[queryKey];

      if (Array.isArray(queryValue)) {
        return {
          ...result,
          [queryKey]: [...queryValue, param],
        };
      }

      if (queryValue != null) {
        return {
          ...result,
          [queryKey]: [queryValue, param],
        };
      }

      return {
        ...result,
        [queryKey]: param,
      };
    }, {});
}
