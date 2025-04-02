"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import apiClient from '@/src/config/axios';
import { REGISTER_URL } from '@/src/config/urls';


export const useRegister = () => {
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const register = async (data) => {
    setLoading(true);
    setError(null);
    setFieldErrors({}); // تنظيف الأخطاء الحقلية القديمة

    try {
      const response = await apiClient.post(REGISTER_URL, data);
      const { message } = response.data;

      console.log(message);
      

      // إعادة التوجيه إلى الصفحة الرئيسية بعد التسجيل الناجح
      router.push('/login');
      return true; // التسجيل ناجح

    } catch (error) {
      if (error.response?.data?.errors) {
        setFieldErrors(error.response.data.errors);
      } else if (error.response?.data?.error) {
        console.log(error.response.data);
        setError(error.response?.data?.error);
      } else {
        setError(error.response?.data?.message || "فشل في التسجيل، أعد مرة أخرى.");
      }
      return false; // التسجيل فشل
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, fieldErrors, error };
};