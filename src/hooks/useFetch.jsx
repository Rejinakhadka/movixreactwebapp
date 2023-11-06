import { useEffect, useState } from "react";
import { fetchDataFromApi } from "../utils/api";

// Custom hook to fetch data from an API
const useFetch = (url) => {
  // State variables to manage data, loading state, and errors
  const [data, setData] = useState(null); // Store the fetched data
  const [loading, setLoading] = useState(null); // Indicates whether data is being fetched
  const [error, setError] = useState(null); // Store error messages if any

  // useEffect is used to execute side effects (like data fetching) in a functional component
  useEffect(() => {
    // Set loading state while data is being fetched
    setLoading("loading...");

    // Reset data and error states to null
    setData(null);
    setError(null);

    // Fetch data from the API using the provided URL
    fetchDataFromApi(url)
      .then((res) => {
        // Data fetching was successful
        setLoading(false); // Set loading state to false
        setData(res); // Store the fetched data
      })
      .catch((err) => {
        // Data fetching encountered an error
        setLoading(false); // Set loading state to false
        setError("Something went wrong!"); // Store the error message
      });
  }, [url]); // The effect runs whenever the 'url' dependency changes

  // Return an object containing data, loading state, and error state
  return { data, loading, error };
};


export default useFetch;
