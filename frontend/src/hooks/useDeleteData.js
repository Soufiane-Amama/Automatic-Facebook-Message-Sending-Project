import { useState } from "react";
import apiClient from "@/src/config/axios";

// سياق لحذف بيانات في الباك اند
const useDeleteData = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const deleteData = async (id) => {
    setLoading(true);
    try {
      const response = await apiClient.delete(url, {
        data: { id }, // إرسال الـ id في body
      });
      setData(response.data);
      setError(null);
      return response.data; // تأكد من إرجاع البيانات
    } catch (err) {
      console.error("Error in deleteData:", err);
      
      // التحقق من جميع المسارات الممكنة للخطأ
      const errorMessage = 
        err?.response?.data?.error ||  // المسار الأول
        err?.data?.error ||            // المسار الثاني
        err?.message ||                // مسار إضافي يحتوي على الرسالة العامة
        "حدث خطأ غير معروف.";         // رسالة افتراضية إذا لم يتم العثور على أي خطأ

      setError(errorMessage);
      throw err; // إعادة رمي الخطأ للتعامل معه في مكان آخر إذا لزم الأمر
    } finally {
      setLoading(false);
    }
  };

  return { deleteData, data, loading, error };
};

export default useDeleteData;