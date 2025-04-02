import { useEffect, useState } from "react";
import apiClient from "@/src/config/axios";

// سياق لجلب بيانات من الباك اند
const useGetData = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
  
    const fetchData = async () => {
      setLoading(true);
  
      try {
        const response = await apiClient.get(url, { signal });
        setData(response.data);
        // console.log("Response Data: ", response.data);
        setLoading(false);
        setError(null);
      } catch (err) {
        if (signal.aborted) {
          console.log("Request canceled", err.message);
        } else {
          setLoading(false);
          setError(err.message);
        }
      }
    };
  
    fetchData();
  
    return () => {
      controller.abort();
    };
  }, [url]);
  
  return { setData, data, loading, error };
};

export default useGetData;