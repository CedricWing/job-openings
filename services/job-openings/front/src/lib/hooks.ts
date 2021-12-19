import { useCallback, useState } from 'react';

export const useCb = <T, S, R extends Array<S>>(fn: (...args: R) => T) =>
  useCallback(fn, []);

export const useLoading = <T, S, R extends Array<S>>(
  fn: (...args: R) => Promise<T>,
  initialLoadingState = false,
): [boolean, (...args: R) => Promise<T>] => {
  const [loading, setLoading] = useState(initialLoadingState);
  const wrappedFunction = useCallback(
    (...args: R) => {
      const call = fn(...args);
      setLoading(true);
      return call
        .then((res) => {
          setLoading(false);
          return res;
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
          throw error;
        });
    },
    [fn],
  );
  return [loading, wrappedFunction];
};
