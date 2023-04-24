import {
  useQuery,
  QueryKey,
  QueryClient,
  MutationFunction,
  UseQueryOptions,
  MutationOptions,
  useMutation,
} from '@tanstack/react-query';
import { ReactQueryOptions, ReactMutationOptions } from './interface';
import { fetchFn } from './fetch';

export * from '@tanstack/react-query';
export * from './interface';
export * from './fetch';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 10000,
    },
  },
});

export function useReactQuery<TQueryFnData = unknown, TError = unknown, TData = TQueryFnData>(
  options: ReactQueryOptions<TQueryFnData, TError, TData, QueryKey>,
) {
  const {
    url = '',
    cache,
    credentials = 'include',
    headers,
    integrity,
    keepalive,
    method = 'GET',
    mode,
    redirect,
    referrer,
    referrerPolicy,
    signal,
    window,
    contentType = 'json',
    ...opts
  } = options || {};
  const fetchOption: RequestInit = {
    cache,
    credentials,
    headers,
    integrity,
    keepalive,
    method,
    mode,
    redirect,
    referrer,
    referrerPolicy,
    signal,
    window,
  };
  const queryOptions: UseQueryOptions<TQueryFnData, TError, TData, QueryKey> = { ...opts };
  if (url) {
    const cusFn = () => fetchFn(url, { contentType, ...fetchOption });
    queryOptions.queryFn = queryOptions.queryFn || cusFn;
  }
  return useQuery({ ...queryOptions });
}

export function useReactMutation<TData = unknown, TError = unknown, TVariables = void, TContext = unknown>(
  options: ReactMutationOptions<TData, TError, TVariables, TContext>,
) {
  const {
    url,
    cache,
    credentials,
    headers,
    integrity,
    keepalive,
    method = 'POST',
    mode,
    redirect,
    referrer,
    referrerPolicy,
    signal,
    window,
    contentType = 'json',
    ...opts
  } = options || {};
  const fetchOption: RequestInit = {
    cache,
    credentials,
    headers,
    integrity,
    keepalive,
    method,
    mode,
    redirect,
    referrer,
    referrerPolicy,
    signal,
    window,
  };
  const mutationOptions: MutationOptions<TData, TError, TVariables, TContext> = { ...opts };
  if (url) {
    const cusFn: MutationFunction<TData, TVariables> = (newData: TVariables) => {
      let body: any = newData;
      if (Object.prototype.toString.call(newData).slice(8, -1) !== 'FormData') {
        body = JSON.stringify(newData);
      }
      return fetchFn(url, { contentType, ...fetchOption, body: body as BodyInit });
    };
    mutationOptions.mutationFn = mutationOptions.mutationFn || cusFn;
  }
  return useMutation(mutationOptions);
}
