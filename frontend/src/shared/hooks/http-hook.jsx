import { useState, useCallback, useRef, useEffect } from "react";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const activeHttpRequests = useRef([]);

  const sendRequest = useCallback(async (
    url,
    method = "GET",
    body = null,
    headers = {}
  ) => {
    setIsLoading(true);

    // Create a new AbortController object.
    // This will allow us to abort the request if the user navigates away from the page before the request is complete.
    const httpAbortController = new AbortController();

    activeHttpRequests.current.push(httpAbortController); // Add the AbortController object to the activeHttpRequests array so we can access it later.

    try {
      const response = await fetch(url, {
        method,
        body,
        headers,
        // Pass the AbortController's signal to the fetch request so we can abort the request if the user navigates away from the page before the request is complete.
        signal: httpAbortController.signal,
      });

      const responseData = await response.json();

      activeHttpRequests.current = activeHttpRequests.current.filter(reqCtrl => reqCtrl !== httpAbortController) // Filter out the AbortController object from the activeHttpRequests array.

      if (!response.ok) {
        console.log(responseData.message);
        throw new Error(responseData.message);
      }

      setIsLoading(false);
      return responseData;
    } catch (err) {
      console.log(err);
      setError(
        err.message || "Oops! Something went wrong! Please try again later!"
      );
      setIsLoading(false);
      throw err;
    }
  }, []);

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    return () => { // This will run when the component using this hook unmounts.
      activeHttpRequests.current.forEach(abortController => // Loop through the activeHttpRequests array and abort each request.
        abortController.abort() // Abort the request using the AbortController object.
      );
    };
  }, []);

  return { isLoading: isLoading, error: error, sendRequest: sendRequest, clearError: clearError};
};
