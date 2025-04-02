const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const { jwtSecret } = require('../config/keys');

// دالة الحماية 
const protect = asyncHandler(async (req, res, next) => {
    let token;

    // التحقق من وجود الكوكيز وقراءة التوكن
    if (req.cookies && req.cookies?.token) {
        try {
            //  console.log('Cookies Received:', req.cookies);

            token = req.cookies?.token;
            const decoded = jwt.verify(token, jwtSecret);
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error('غير مصرح، أعد المحاولة مرة أخرى.'); // 'غير مصرح، فشل التوكن'
        }
    } else {
        res.status(401);
        throw new Error('غير مصرح، لا يوجد توكن');
    }
});


//  Middleware اختياري الذي يتحقق من وجود رمز المصادقة (JWT) في الطلب، وإذا لم يكن موجودًا، يسمح بالمرور بدون خطأ.
const optionalProtect = async (req, res, next) => {
    try {
        // التحقق من وجود التوكن في الكوكيز
        const token = req.cookies?.token;

        if (token) {
            const decoded = jwt.verify(token, jwtSecret);
            req.user = await User.findById(decoded.id).select("-password");
        } else {
            req.user = null;
        }
    } catch (error) {
        req.user = null; // تجاهل الأخطاء وتعيين req.user كـ null
    }
    next(); // السماح بتمرير الطلب
};


// التحقق اذا كان المستخدم مشرف
const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error('غير مصرح كمشرف');
    }
};

module.exports = { protect, optionalProtect, admin };
