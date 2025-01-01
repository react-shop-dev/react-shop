function prefixPathname(prefix: string, pathname: string) {
  let localizedHref = prefix;

  // Avoid trailing slashes
  if (/^\/(\?.*)?$/.test(pathname)) {
    pathname = pathname.slice(1);
  }

  localizedHref += pathname;

  return localizedHref;
}

export function formatPathname(
  pathname: string,
  prefix: string | undefined,
  search: string | undefined,
) {
  let result = pathname;

  if (prefix) {
    result = prefixPathname(prefix, result);
  }

  if (search) {
    result += search;
  }

  return result;
}

export function normalizeTrailingSlash(pathname: string) {
  if (pathname !== '/') {
    const pathnameEndsWithSlash = pathname.endsWith('/');
    if (pathnameEndsWithSlash) {
      pathname = pathname.slice(0, -1);
    } else {
      pathname += '/';
    }
  }

  return pathname;
}

export function normalizePathname(pathname: string) {
  if (!pathname.endsWith('/')) {
    pathname += '/';
  }
  let result = pathname;
  if (result !== '/') {
    result = normalizeTrailingSlash(result);
  }

  return result;
}

export function applyBasePath(pathname: string, basePath: string) {
  return normalizeTrailingSlash(basePath + pathname);
}

export function sanitizePathname(pathname: string) {
  return pathname.replace(/\\/g, '%5C').replace(/\/+/g, '/');
}
