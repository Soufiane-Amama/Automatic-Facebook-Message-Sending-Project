"use client";
import { createContext, useContext, useState, useEffect } from "react";
import useAddData from "@/src/hooks/useAddData";
import useUpdateData from "@/src/hooks/useUpdateData";
import useDeleteData from "@/src/hooks/useDeleteData";
import { PROFILE_URL, LOGOUT_URL, } from "@/src/config/urls"; // مسار  LINK_URL فقط كمثال .. يمكنك استدعاء المسارات الحقيقية
import { useRouter } from "next/navigation";
import apiClient from "@/src/config/axios";

// إنشاء سياق موحّد
const AppContext = createContext();

// دالة مخصصة لاستخدام سياق التطبيق بسهولة في المكونات الأخرى.
export const useApp = () => useContext(AppContext);

// مزود سياق, الذي يحتفظ بالحالات ويقوم بتوزيعها على جميع المكونات الفرعية.
export const AppProvider = ({ children }) => {
  const [activePage, setActivePage] = useState("dashboard");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  // تحميل بيانات المستخدم من الجلسة (من خلال API) عند التهيئة و جلب بيانات السلة.
  const fetchUser = async () => {
    try {
      setLoading(true);
      // جلب بيانات المستخدم
      const { data: userData } = await apiClient.get(PROFILE_URL);
      console.log("User data fetched:", userData); // عرض بيانات المستخدم
      setUser(userData);
      setLoading(false);
    } catch (error) {
      console.error(
        "Error fetching user or cart data:",
        error.message || error
      );
      setUser(null);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser(); // جلب البيانات المستخدم
  }, []);


  // تسجيل الخروج.
  const logout = async () => {
    try {
      await apiClient.post(LOGOUT_URL);
      setUser(null);
      router.push("/"); // توجيه المستخدم الى صفحة الرئيسية
    } catch (error) {
      console.error("Failed to logout:", error);
      alert("حدث خطأ أثناء تسجيل الخروج. حاول مرة أخرى.");
    }
  };


  // تمرير القيم والدوال إلى المكونات الفرعية عبر سياق التطبيق.
  return (
    <AppContext.Provider
      value={{
        user,
        loading,
        setUser,
        activePage,
        setActivePage,
        logout,
      }}
    >
      {children} {/* عرض جميع المكونات الفرعية التي تستفيد من سياق التطبيق */}
    </AppContext.Provider>
  );
};
