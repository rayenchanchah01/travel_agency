import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for API calls with loading and error states
 * @param {Function} apiCall - The API service function to call
 * @param {Array} dependencies - Dependencies array for useEffect
 * @param {boolean} immediate - Whether to call API immediately on mount
 */
export function useApi(apiCall, dependencies = [], immediate = true) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (...args) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiCall(...args);
      setData(response.data);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'An error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiCall]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return { data, loading, error, execute, setData };
}

export default useApi;

