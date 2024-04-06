import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getAll = async () => {
      try {
        const res = await fetch(url);
        const data = await res.json();
        if (data && data.todos.length > 0) {
          setData(data.todos);
          setIsError(false);
        }
      } catch (error) {
        setIsError(true);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getAll();
  }, [url]);

  return { data, isLoading, isError, setData, setIsLoading };
};

export default useFetch;
