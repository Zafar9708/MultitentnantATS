// src/theme/themes.js

import { createTheme } from '@mui/material/styles';

export const themes = {
  default: createTheme({
    palette: {
      primary: { main: '#1976d2' },
      background: { default: '#f8f9fa', paper: '#fff' },
      text: { primary: '#000' },
    },
    typography: { fontFamily: '"Poppins", "Helvetica", "Arial", sans-serif' },
  }),
  green: createTheme({
    palette: {
      primary: { main: '#4caf50' },
      background: { default: '#f0fdf4', paper: '#fff' },
      text: { primary: '#000' },
    },
  }),
  orange: createTheme({
    palette: {
      primary: { main: '#ff9800' },
      background: { default: '#fff8e1', paper: '#fff' },
      text: { primary: '#000' },
    },
  }),
  purple: createTheme({
    palette: {
      primary: { main: '#9c27b0' },
      background: { default: '#f3e5f5', paper: '#fff' },
      text: { primary: '#000' },
    },
  }),
  teal: createTheme({
    palette: {
      primary: { main: '#009688' },
      background: { default: '#e0f2f1', paper: '#fff' },
      text: { primary: '#000' },
    },
  }),
};
