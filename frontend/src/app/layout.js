import { Cairo, Tajawal } from "next/font/google";
import { ChakraProvider } from "@chakra-ui/react";
import { AppProvider } from "@/src/context/AppContext";
import theme from "./theme/theme";
import "./globals.css";

const tajawal = Tajawal({ 
  subsets: ["arabic", "latin"],
  weight: ["400", "700"], // يمكنك اختيار الأوزان 
});

const cairo = Cairo({
  subsets: ["arabic"], // استدعاء نوع الخط الاساسي
  weight: ["200", "300", "400", "500", "600", "700", "800"], // الاوزان للخط
});

export const metadata = {
  title: "Sixty Challenge App", // عنوان الموقع
  description: // وصف الموقع
    "The Sixty Challenge app helps you achieve your goals and build positive habits in 60 consecutive days with more than 1,000 champions",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="icon" href="/sixty.png" /> 
      </head>
      <body className={`${cairo.className} ${tajawal.className}`} >
        <ChakraProvider theme={theme}>
          <AppProvider>
            {children}
          </AppProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}
