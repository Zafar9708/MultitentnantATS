
// import React, { useState } from 'react';
// import { useLocation } from "react-router-dom";

// import Sidebar from '../components/Sidebar';
// import Header from '../components/Header';
// import { Box, CssBaseline, Drawer } from '@mui/material';
// import { ThemeProvider } from '@mui/material/styles';
// import { themes } from '../theme/themes';
// import { ThemeProvider as CustomThemeProvider, useAppTheme } from '../context/ThemeContext';
// // import AtsChatbot from '../components/AtsChatbot'; // Import the chatbot component
// import AtsChatbot from '../components/ChatBoat';

// const drawerWidth = 100;

// const LayoutContent = ({ children }) => {
//   const { currentThemeName } = useAppTheme();
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const location = useLocation();
//   const { user } = location.state || {};

//   const handleDrawerToggle = () => {
//     setMobileOpen((prev) => !prev);
//   };

//   return (
//     <ThemeProvider theme={themes[currentThemeName] || themes.default}>
//       <CssBaseline />
//       <Box sx={{ 
//         display: 'flex', 
//         height: '100vh',
//         overflow: 'hidden'
//       }}>
//         {/* Desktop Sidebar */}
//         <Box
//           component="nav"
//           sx={{
//             width: { sm: drawerWidth },
//             flexShrink: { sm: 0 },
//           }}
//         >
//           {/* Mobile Drawer */}
//           <Drawer
//             variant="temporary"
//             open={mobileOpen}
//             onClose={handleDrawerToggle}
//             ModalProps={{ keepMounted: true }}
//             sx={{
//               display: { xs: 'block', sm: 'none' },
//               '& .MuiDrawer-paper': {
//                 boxSizing: 'border-box',
//                 width: drawerWidth,
//               },
//             }}
//           >
//             <Sidebar />
//           </Drawer>

//           {/* Permanent Sidebar (Desktop) */}
//           <Drawer
//             variant="permanent"
//             sx={{
//               display: { xs: 'none', sm: 'block' },
//               '& .MuiDrawer-paper': {
//                 boxSizing: 'border-box',
//                 width: drawerWidth,
//               },
//             }}
//             open
//           >
//             <Sidebar />
//           </Drawer>
//         </Box>

//         {/* Main Content */}
//         <Box sx={{ 
//           flexGrow: 1, 
//           ml: { sm: `${drawerWidth}px` },
//           display: 'flex',
//           flexDirection: 'column',
//           height: '100vh',
//           overflow: 'hidden',
//           position: 'relative' // Added for positioning the chatbot
//         }}>
//           <Header onMenuClick={handleDrawerToggle} user={user} />
//           <Box
//             component="main"
//             sx={{ 
//               flex: 1,
//               mt: '64px', 
//               p: 3, 
//               height: 'calc(100vh - 64px)', 
//               overflow: 'auto',
//               // Hide scrollbar but keep functionality
//               scrollbarWidth: 'none',  // Firefox
//               '&::-webkit-scrollbar': {
//                 display: 'none',  // Chrome, Safari, Edge
//               },
//               msOverflowStyle: 'none',  // IE and Edge
//             }}
//           >
//             {children}
//           </Box>
          
//           {/* Chatbot positioned in the bottom right corner */}
//           <AtsChatbot />
//         </Box>
//       </Box>
//     </ThemeProvider>
//   );
// };

// const MainLayout = ({ children }) => (
//   <CustomThemeProvider>
//     <LayoutContent>{children}</LayoutContent>
//   </CustomThemeProvider>
// );

// export default MainLayout;

//------------


// src/layout/MainLayout.js
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Box, CssBaseline, Drawer } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { themes } from '../theme/themes';
import { ThemeProvider as CustomThemeProvider, useAppTheme } from '../context/ThemeContext';
import AtsChatbot from '../components/ChatBoat';

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
              display: { xs: 'none', sm: 'block', position: 'fixed' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
                position: 'fixed',
                top: 0,
                left: 0,

                height: '100vh',
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
          minHeight: '100vh',
          width: `calc(100% - ${drawerWidth}px)`,
          position: 'relative'
        }}>
          <Header onMenuClick={handleDrawerToggle} />
          <Box
            component="main"
            sx={{ 
              flex: 1,
              mt: '64px', 
              p: 0,
              minHeight: 'calc(100vh - 64px)',
              overflow: 'auto',
              scrollbarWidth: 'none',
              '&::-webkit-scrollbar': {
                display: 'none',
              },
              msOverflowStyle: 'none',
              width: '100%',
              maxWidth: '100%',
            }}
          >
            {children}
          </Box>
          
          {/* Chatbot positioned in the bottom right corner */}
          <AtsChatbot />
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