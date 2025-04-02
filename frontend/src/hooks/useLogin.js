"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/src/context/AppContext';
import apiClient from '@/src/config/axios';
import { LOGIN_URL } from '@/src/config/urls';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { setUser } = useApp(); // تحديث سياق المستخدم
  const router = useRouter();
  
  
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    setFieldErrors({}); // تنظيف الأخطاء الحقلية القديمة

    try {
      const response = await apiClient.post(LOGIN_URL, { email, password });
      const { user } = response.data;

      // تحديث سياق المستخدم
      setUser(user);

      // إعادة التوجيه إلى لوحة التحكم بعد تسجيل الدخول الناجح
      router.push('/dashboard');
      return true; // تسجيل الدخول ناجح

    } catch (error) {
      if (error.response?.data?.errors) {
        setFieldErrors(error.response.data.errors);
      } else if (error.response?.data?.error) {
        console.log(error.response.data);
        setError(error.response?.data?.error || "فشل في تسجيل الدخول، أعد مرة أخرى");
      } else {
        setError(error.response?.data?.message || "فشل في تسجيل الدخول، أعد مرة أخرى.");
      }
      return false; // تسجيل الدخول فشل
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, fieldErrors, error };
};