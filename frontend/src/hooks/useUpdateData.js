import { useState } from "react";
import apiClient from "@/src/config/axios";

// سياق لتعديل بيانات من الباك اند
const useUpdateData = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const updateData = async (updatedData) => {
    setLoading(true);

    try {
      const response = await apiClient.put(url, updatedData);
      setData(response.data);
      setError(null);
      return response.data; // تأكد من إرجاع البيانات
    } catch (err) {
      console.error("Error in updateData:", err);
      setError(err.message);
      throw err; // إعادة رمي الخطأ للتعامل معه في مكان آخر إذا لزم الأمر
    } finally {
      setLoading(false);
    }
  };

  return { updateData, data, loading, error };
};

export default useUpdateData;