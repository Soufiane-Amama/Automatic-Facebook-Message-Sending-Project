"use client";

import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: "light",  // الوضع الافتراضي هو الفاتح
    useSystemColorMode: false,  // تعطيل استخدام نظام التشغيل
  },

  colors: {
    brand: '#FEF250',
    yallow: "#F0B429",
    yallow1: "#F0B429",
    secondary: '#CEC7FE',  // اللون الثانوي
    primary: {
        100: '#FCFBFC',
        200: '#F8F8F8',
        300: '#5F5F86',
        400: '#30303D',
    },
    hover: {
      200: "#8b842a",
      100: "#968f33",
  },
    black: '#141414',
    gray: {
      100: "#edf2f7",
    },
    // purple: "#5F5F86",

    // ألوان للوضع الفاتح والداكن
    light: {
      bg: '#FCFBFC',
      text: "#141414",
      // cardBg: "#F0B429",
      // cardBg: "#fff131",
      cardBg: "#ecc94b",
      icon: "#fefcbf",
      // gold: '#ffd700',
      gold: '#FEF250',
      hover: "#f1ee7c",
    },
    dark: {
      bg: "#181a1b",
      text: "#E2E8F0",
      cardBg: "#756d01",
      icon: "#8b842a", 
      gold: '#998100',
      hover: "#968f33",
    },
  },

  fonts: {
    heading: 'Cairo, sans-serif',
    body: 'Cairo, sans-serif',
    arabic: 'Cairo, sans-serif',
  },

  breakpoints: {
    base: '0em', 
    sm: '30em', 
    md: '46.375em', 
    md2: '55.375em',
    lg: '62em',  
    sf: '70em',  
    xl: '80em',  
    '2xl': '96em',  
    ss: "25em",
  },
});

export default theme;
