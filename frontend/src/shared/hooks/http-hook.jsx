import { useState, useCallback } from "react";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const sendRequest = useCallback(async (
    url,
    method = "GET",
    body = null,
    headers = {}
  ) => {
    setIsLoading(true);

    try {
      const response = await fetch(url, {
        method,
        headers,
        body,
      });

      const responseData = await response.json();

      if (!response.ok) {
        console.log(responseData.message);
        throw new Error(responseData.message);
      }

      return responseData;

    } catch (err) {
      console.log(err);
      setError(
        err.message || "Oops! Something went wrong! Please try again later!"
      );
    }
    setIsLoading(false);
  }, []);

  return { isLoading: isLoading, error: error, sendRequest: sendRequest};
};
