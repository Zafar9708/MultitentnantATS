// // src/layouts/MainLayout.js

// import React, { useState } from 'react';
// import Sidebar from '../components/Sidebar';
// import Header from '../components/Header';
// import { Box, CssBaseline } from '@mui/material';
// import { ThemeProvider } from '@mui/material/styles';
// import { themes } from '../theme/themes';
// import { ThemeProvider as CustomThemeProvider, useAppTheme } from '../context/ThemeContext';
// import JobsPage from '../pages/JobsPage';

// const LayoutContent = ({ children, userName }) => {
//   const { currentThemeName } = useAppTheme();

//   return (
//     <ThemeProvider theme={themes[currentThemeName] || themes.default}>
//       <CssBaseline />
//       <Box sx={{ display: 'flex', height: '100vh' }}>
//         <Sidebar />
//         <Box sx={{ flexGrow: 1, ml: '200px' }}>
//           <Header userName={userName} getInitials={(name) => name.split(' ').map(n => n[0]).join('')} />
//           <Box component="main" sx={{ mt: '64px', p: 3,  height: 'calc(100vh - 64px)' }}>
//             {children}
            
//           </Box>
//         </Box>
//       </Box>
//     </ThemeProvider>
//   );
// };

// const MainLayout = ({ children, userName }) => (
//   <CustomThemeProvider>
//     <LayoutContent userName={userName} >
//       {children}
//     </LayoutContent>
//   </CustomThemeProvider>
// );

// export default MainLayout;


// src/layouts/MainLayout.js
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Box, CssBaseline, Drawer } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { themes } from '../theme/themes';
import { ThemeProvider as CustomThemeProvider, useAppTheme } from '../context/ThemeContext';

const drawerWidth = 100;

const LayoutContent = ({ children }) => {
  const { currentThemeName } = useAppTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  return (
    <ThemeProvider theme={themes[currentThemeName] || themes.default}>
      <CssBaseline />
      <Box sx={{ 
        display: 'flex', 
        height: '100vh',
        overflow: 'hidden'
      }}>
        {/* Desktop Sidebar */}
        <Box
          component="nav"
          sx={{
            width: { sm: drawerWidth },
            flexShrink: { sm: 0 },
          }}
        >
          {/* Mobile Drawer */}
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
          >
            <Sidebar />
          </Drawer>

          {/* Permanent Sidebar (Desktop) */}
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
            open
          >
            <Sidebar />
          </Drawer>
        </Box>

        {/* Main Content */}
        <Box sx={{ 
          flexGrow: 1, 
          ml: { sm: `${drawerWidth}px` },
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          overflow: 'hidden'
        }}>
          <Header onMenuClick={handleDrawerToggle} />
          <Box
            component="main"
            sx={{ 
              flex: 1,
              mt: '64px', 
              p: 3, 
              height: 'calc(100vh - 64px)', 
              overflow: 'auto',
              // Hide scrollbar but keep functionality
              scrollbarWidth: 'none',  // Firefox
              '&::-webkit-scrollbar': {
                display: 'none',  // Chrome, Safari, Edge
              },
              msOverflowStyle: 'none',  // IE and Edge
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

const MainLayout = ({ children }) => (
  <CustomThemeProvider>
    <LayoutContent>{children}</LayoutContent>
  </CustomThemeProvider>
);

export default MainLayout;