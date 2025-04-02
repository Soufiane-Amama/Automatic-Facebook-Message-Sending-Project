"use client"

import { useState } from 'react';
import { Box, Input, Button, Textarea, VStack, Heading } from '@chakra-ui/react';
import apiClient from '@/src/config/axios';

export default function Home() {
  const [message, setMessage] = useState('');
  const [accounts, setAccounts] = useState('');

  const handleSubmit = async () => {
    console.log('Message:', message);
    console.log('Accounts:', accounts.split(',')); // تقسيم الحسابات إذا كانت مفصولة بفواصل
  
    const accountList = accounts.split(',').map((acc) => acc.trim()); // تنظيف الحسابات
  
    try {
      // استخدام apiClient بدلاً من fetch
      const response = await apiClient.post('/api/sendMessage', {
        message,
        accounts: accountList,
      });
  
      // التحقق من نجاح الطلب
      if (response.data.success) {
        alert('تم إرسال الرسالة بنجاح!');
      } else {
        alert('حدث خطأ أثناء الإرسال');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('فشل الإرسال');
    }
  };

  
  return (
    <Box p={5} maxW="600px" mx="auto" mt={10}>
      <Heading mb={5}>Messenger App</Heading>
      <VStack spacing={4}>
        <Textarea
          placeholder="اكتب رسالتك هنا"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Input
          placeholder="أدخل حسابات فيسبوك (مفصولة بفواصل)"
          value={accounts}
          onChange={(e) => setAccounts(e.target.value)}
        />
        <Button colorScheme="teal" onClick={handleSubmit}>
          إرسال الرسالة
        </Button>
      </VStack>
    </Box>
  );
}
