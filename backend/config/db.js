const mongoose = require('mongoose');
const { mongoURI } = require('./keys');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`); // رسالة نجاح الاتصال
    } catch (error) {
        console.error(`❌ Database connection failed: ${error.message}`); // رسالة فشل الاتصال
        process.exit(1); // يتم إنهاء العملية باستخدام process.exit(1)
    }
};

module.exports = connectDB;