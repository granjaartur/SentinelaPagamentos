import { toast } from 'react-hot-toast';

export async function fetchApi<T>(url: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    // Handle 204 No Content
    if (response.status === 204) {
      return {} as T;
    }

    // Handle empty response
    const text = await response.text();
    if (!text) {
      return {} as T;
    }

    // Parse JSON response
    const data = JSON.parse(text);

    if (!response.ok) {
      throw new Error(data.message || 'An error occurred');
    }

    return data;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An error occurred';
    toast.error(message);
    throw error;
  }
}

export const api = {
  get: <T>(url: string) => fetchApi<T>(url),
  
  post: <T>(url: string, data: any) => fetchApi<T>(url, {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  put: <T>(url: string, data: any) => fetchApi<T>(url, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  
  delete: <T>(url: string) => fetchApi<T>(url, {
    method: 'DELETE',
  }),
};