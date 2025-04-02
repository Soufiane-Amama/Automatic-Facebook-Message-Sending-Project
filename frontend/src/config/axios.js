import axios from 'axios';
// الملف المسؤول عن ارسال الطلبات للخادم باستخدام axios

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // الرابط الاساسي للخادم يأتي من ملف .env
    withCredentials: true // التأكد من إرسال الكوكيز الذي يحتوي على التوكن مع الطلبات
});

export default apiClient;