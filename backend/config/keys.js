// يحتوي على المفاتيح السرية والتكوينات الخاصة بالتطبيق.

module.exports = {
    jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret',
    mongoURI: process.env.MONGO_URI || 'your_mongo_uri',
};