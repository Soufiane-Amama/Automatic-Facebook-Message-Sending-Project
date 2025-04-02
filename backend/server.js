require('dotenv').config();

const express = require('express');
const colors = require('colors');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const helmet = require('helmet'); // إضافة helmet لتعزيز الأمان
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');
const axios = require("axios");

const app = express(); 
const PORT = process.env.PORT || 8000;

// 🛠️ Connect to database
connectDB();

// 🛡️ Middlewares
app.use(helmet()); // تفعيل helmet لجميع المسارات
app.use(express.json()); 
app.use(cookieParser());
const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(",") : "*";
app.use(cors({
    origin: allowedOrigins,
    credentials: true, // السماح بإرسال الكوكيز
}));

if (process.env.NODE_ENV === 'development') { 
    app.use(morgan('dev'));
}


// 🌍 المسار الأساسي
app.get("/", (req, res) => res.send("Server is running successfully! 🚀"));

require("./tasks/cronJobs"); // تشغيل وظيفة التوثيق الأسبوعي تلقائيًا

// 📌 Routes

// رمز التحقق الذي ستستخدمه
const VERIFY_TOKEN = 'dOcIUyeamllqvPHgFvXkVrzHdIaWQEKIGq'; // اختر رمزًا خاصًا بك

// Webhook للتحقق
app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token) {
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('Webhook verified');
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  }
}); 

// استقبال الأحداث (مثل الرسائل الواردة)
app.post('/webhook', (req, res) => {
  const body = req.body;
  if (body.object === 'page') {
    body.entry.forEach(entry => {
      const webhookEvent = entry.messaging[0];
      console.log('Received message:', webhookEvent);
      // هنا يمكنك استخراج معرف المستخدم (sender.id) لاستخدامه لاحقًا
      const senderId = webhookEvent.sender.id;
      console.log('Sender ID:', senderId);
    });
    res.status(200).send('EVENT_RECEIVED');
  } else {
    res.sendStatus(404);
  }
});

// معالج طلب POST على المسار /api/sendMessage
app.post('/api/sendMessage', async (req, res) => {
  // استقبال البيانات من العميل
  const { message, accounts } = req.body;

  // التحقق من وجود البيانات
  if (!message || !accounts || !Array.isArray(accounts)) {
    return res.status(400).json({
      success: false,
      error: 'الرجاء إدخال الرسالة وقائمة الحسابات بشكل صحيح',
    });
  }

  try {
    // رمز الوصول الخاص بالصفحة
    const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

    // إرسال الرسالة إلى كل حساب في القائمة
    const results = await Promise.all(
      accounts.map(async (recipientId) => {
        try {
          const response = await axios.post(
            `https://graph.facebook.com/v20.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`,
            {
              recipient: { id: recipientId },
              message: { text: message },
            }
          );
          return { account: recipientId, status: 'success', data: response.data };
        } catch (error) {
          return {
            account: recipientId,
            status: 'failed',
            error: error.response?.data?.error?.message || 'خطأ غير معروف',
          };
        }
      })
    );

    // إرجاع النتائج
    res.status(200).json({
      success: true,
      data: results,
    });
  } catch (error) {
    console.error('Error sending messages:', error);
    res.status(500).json({
      success: false,
      error: 'فشل في إرسال الرسائل',
    });
  }
});


// 🛑 Error Handlers
app.use(notFound); 
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold);
});
