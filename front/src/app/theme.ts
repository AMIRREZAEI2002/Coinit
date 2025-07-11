import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2ef', // آبی کلاسیک MUI
      contrastText: '#fff',
    },
    secondary: {
      main: '#9c27b0', // بنفش
      contrastText: '#fff',
    },
    background: {
      default: '#eeeff2',  // پس‌زمینه روشن و ملایم
      paper: '#ffffff',    // کارت‌ها و باکس‌ها
    },
    text: {
      primary: '#222222',  // رنگ متن اصلی
      secondary: '#555555',// رنگ متن فرعی
    },
  },
  typography: {
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9', // آبی روشن برای دارک مود
      contrastText: '#000',
    },
    secondary: {
      main: '#ce93d8', // بنفش روشن‌تر
      contrastText: '#000',
    },
    background: {
      default: '#121212',  // پس‌زمینه تاریک اصلی
      paper: '#1e1e1e',    // کارت‌ها و باکس‌ها در حالت تاریک
    },
    text: {
      primary: '#ffffff',  // متن روشن برای پس‌زمینه تاریک
      secondary: '#bbbbbb',
    },
  },
  typography: {
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
});
