import { useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import settings from '../Settings';
import { toast } from 'react-toastify';
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface HttpRequestOptions {
  url: string;
  method?: HttpMethod;
  body?: unknown;
  headers?: HeadersInit;
  showSuccessToast?: boolean;
}

// Custom hook for HTTP requests
const useHttp = () => {
  const { token } = useAuth();
  const request = useCallback(
    async ({
      url,
      method = 'GET',
      body = null,
      headers = {},
      showSuccessToast = false,
    }: HttpRequestOptions) => {
      try {
        headers = { ...headers, 'Content-Type': 'application/json' };
        const configHeaders = new Headers(headers);

        if (token) {
          configHeaders.append('Authorization', `Bearer ${token}`);
        }

        const response = await fetch(settings.API_BASE_PATH + url, {
          method,
          body: body ? JSON.stringify(body) : null,
          headers: configHeaders,
        });

        if (!response.ok) {
          const errorData = (await response.json()) as {
            status: string;
            message: string;
          };
          toast.error(errorData.message);
          throw new Error(errorData.message);
        }
        if (showSuccessToast) {
          toast.success('Operation successful');
        }

        return response;
      } catch (error) {
        console.error('HTTP request failed:', error);
        throw error;
      }
    },
    [token] // Dependencies array
  );

  return { request };
};

export default useHttp;
