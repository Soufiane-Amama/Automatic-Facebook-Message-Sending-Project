// إنشاء خطأ جديد عند عدم العثور على المورد المطلوب (Not Found) ويضبط حالة الاستجابة إلى 404.
const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

// يقوم بمعالجة الأخطاء العامة في التطبيق. يضبط حالة الاستجابة إلى 500 إذا لم تكن محددة ويعيد رسالة الخطأ مع كومة الأخطاء (stack trace) إذا كان التطبيق في وضع التطوير.  
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
};

module.exports = { notFound, errorHandler };