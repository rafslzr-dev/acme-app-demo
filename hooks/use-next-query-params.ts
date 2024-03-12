import { useMemo } from 'react';
import { useRouter } from 'next/router';

/**
 *
 * @param key the query key
 * @returns the query value to the query key
 */
export const useNextQueryParams = (key: string): string | undefined => {
  const { asPath } = useRouter();

  const value = useMemo(() => {
    const match = asPath.match(new RegExp(`[&?]${key}=(.*?)(&|$)`))
    if (!match) return
    return decodeURIComponent(match[1])
  }, [asPath, key])

  return value
};
