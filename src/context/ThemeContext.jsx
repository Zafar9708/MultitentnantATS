// src/context/ThemeContext.js

import React, { createContext, useState, useMemo, useContext } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { themes } from '../theme/themes';

const ThemeContext = createContext({
  currentThemeName: 'default',
  setThemeName: () => {},
});

export const useAppTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [currentThemeName, setCurrentThemeName] = useState('default');

  const theme = useMemo(() => themes[currentThemeName] || themes.default, [currentThemeName]);

  const contextValue = useMemo(() => ({
    currentThemeName,
    setThemeName: setCurrentThemeName,
  }), [currentThemeName]);

  return (
    <ThemeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={theme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
