import type { UseFetchOptions } from 'nuxt/app'
import { useRequestHeaders } from "nuxt/app";


const headers = () => {

  let headers: any = {
    accept: "application/json",
    // "Content-Type": "application/json"
  }

  const token = useCookie('XSRF-TOKEN');

  if (token.value) {
    headers['X-XSRF-TOKEN'] = token.value as string;
  }

  if (process.server) {
    headers = {
      ...headers,
      ...useRequestHeaders(["cookie"]),
    }
  }
  return headers
}

export function useApiFetch<T>(path: string, options: UseFetchOptions<T> = {}, maxRetries: number = 1) {

  const config = useRuntimeConfig()
const apiUrl = config.public.API_URL || 'http://127.0.0.1:8000'

  const fetchWithRetry = async (retryCount: number): Promise<any> => {
    try {

      // Handle query parameters
      let queryString = '';
      if (options.params && Array.isArray(options.params)) {
        const searchParams = new URLSearchParams();
        // Loop over array of key-value pairs
        options.params.forEach((param: { key: string, value: string }) => {
          searchParams.append(param.key, param.value);
        });

        queryString = `?${searchParams.toString()}`;
      }

      const fullUrl = `${apiUrl}${path}${queryString}`;


      const response = await useFetch(fullUrl, {
        credentials: 'include',
        watch: false,
        ...options,
        headers: {
          ...headers(),
          ...options?.headers,
        },
        signal: options.signal, 

        onResponseError: async ({ response }) => {
          // Intercept the response error
          if (response.status === 419) { // Check if the response status is 419 (CSRF mismatch)
            if (retryCount < maxRetries) {
              return fetchWithRetry(retryCount + 1);
            }
          }
        },

      });
      return response;
    } catch (error: any) {
      throw error; // Handle any other errors
    }
  };

  return fetchWithRetry(0);
}