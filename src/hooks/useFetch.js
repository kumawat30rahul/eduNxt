import { useEffect, useRef, useState } from "react";

export const useFetch = (serviceFunction, params) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const useFetchRef = useRef();

  useEffect(() => {
    if (useFetchRef.current) {
      return; // Prevents multiple calls if the component re-renders
    }
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await serviceFunction(params);
        useFetchRef.current = true; // Set the ref to true to prevent further calls
        if (response.status === 200) {
          setData(response.data);
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
        useFetchRef.current = false;
      }
    };

    fetchData();
  }, [serviceFunction, params]);

  return { data, error, loading };
};
