import { useState } from 'react';
import apiClient from '@/src/config/axios';

const useAddData = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); 

  const addItem = async (data) => {
    setLoading(true);
    setError(null); // إعادة تعيين الخطأ عند بدء الطلب

    try {
      const response = await apiClient.post(url, data);

      if (response.status === 201) {
        // console.log("Response Data: ", response.data);
        return response.data;
      } else {
        throw new Error('فشل في العملية.');
      }
    } catch (error) {
      console.error('خطأ أثناء العملية:', error);
      const errorMessage = error.response?.data?.message || 'حدث خطأ أثناء العملية.';
      setError(errorMessage); // حفظ رسالة الخطأ في الحالة
    } finally {
      setLoading(false);
    }
  };

  return { addItem, loading, error };
};

export default useAddData;
