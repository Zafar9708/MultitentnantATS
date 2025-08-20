
// import React, { useState, useEffect, useRef } from 'react';
// import {
//   Box,
//   Typography,
//   Avatar,
//   MenuItem,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   Grid,
//   IconButton,
//   Button,
// } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import { useNavigate } from 'react-router-dom';
// import * as jwtDecode from 'jwt-decode';
// import { useAppTheme } from '../context/ThemeContext';

// const themesList = [
//   { key: 'default', label: 'Purple', color: '#4e54c8' },
//   { key: 'green', label: 'Green', color: '#4caf50' },
//   { key: 'orange', label: 'Orange', color: '#ff9800' },
//   { key: 'purple', label: 'Purple Alt', color: '#9c27b0' },
//   { key: 'teal', label: 'Teal', color: '#009688' },
// ];

// const Header = ({ onMenuClick }) => {
//   const [userName, setUserName] = useState('User');
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isThemeDialogOpen, setIsThemeDialogOpen] = useState(false);
//   const dropdownRef = useRef(null);
//   const navigate = useNavigate();

//   const { currentThemeName, setThemeName } = useAppTheme();

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       try {
//         const decoded = jwtDecode(token);
//         const name = decoded.name || decoded.user || 'User';
//         setUserName(name);
//       } catch (e) {
//         setUserName('User');
//       }
//     }
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsDropdownOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const getInitials = (name) => {
//     if (!name) return '';
//     return name.split(' ').map((n) => n[0]).join('').toUpperCase();
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('userData');
//     navigate('/login');
//   };

//   const handleProfileClick = () => {
//     navigate('/profile');
//     setIsDropdownOpen(false);
//   };

//   const handleSettingsClick = () => {
//     setIsDropdownOpen(false);
//     setIsThemeDialogOpen(true);
//   };

//   const closeThemeDialog = () => {
//     setIsThemeDialogOpen(false);
//   };

//   const selectTheme = (key) => {
//     setThemeName(key);
//   };

//   return (
//     <Box
//       sx={{
//         position: 'fixed',
//         top: 0,
//         left: { xs: 0, sm: 180 },
//         right: 0,
//         height: 64,
//         backgroundColor: 'primary.main',
//         color: 'white',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         px: 2,
//         zIndex: 1100,
//         boxShadow: '0 2px 4px rgba(0,0,0,0.12)',
//       }}
//     >
//       {/* Hamburger for mobile */}
//       <IconButton
//         color="inherit"
//         edge="start"
//         onClick={onMenuClick}
//         sx={{ mr: 2, display: { sm: 'none' } }}
//       >
//         <MenuIcon />
//       </IconButton>

//       <Typography variant="h6" noWrap>
//         {userName}
//       </Typography>

//       <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }} ref={dropdownRef}>
//         <Avatar
//           sx={{ bgcolor: 'secondary.main', cursor: 'pointer', userSelect: 'none' }}
//           onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//         >
//           {getInitials(userName)}
//         </Avatar>

//         {isDropdownOpen && (
//           <Box
//             sx={{
//               position: 'absolute',
//               right: 16,
//               top: 'calc(100% + 8px)',
//               bgcolor: 'background.paper',
//               color: 'text.primary',
//               borderRadius: 1,
//               boxShadow: 3,
//               zIndex: 1300,
//               minWidth: 140,
//             }}
//           >
//             <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
//             <MenuItem onClick={handleSettingsClick}>Settings</MenuItem>
//             <MenuItem onClick={handleLogout}>Logout</MenuItem>
//           </Box>
//         )}
//       </Box>

//       {/* Theme dialog */}
//       <Dialog open={isThemeDialogOpen} onClose={closeThemeDialog}>
//         <DialogTitle>Select Application Theme</DialogTitle>
//         <DialogContent>
//           <Grid container spacing={2} justifyContent="center" sx={{ py: 1 }}>
//             {themesList.map(({ key, label, color }) => (
//               <Grid item key={key}>
//                 <Box
//                   onClick={() => selectTheme(key)}
//                   sx={{
//                     width: 40,
//                     height: 40,
//                     borderRadius: '50%',
//                     bgcolor: color,
//                     border: key === currentThemeName ? '3px solid black' : '2px solid #ccc',
//                     cursor: 'pointer',
//                     boxShadow: '0 0 6px rgba(0,0,0,0.3)',
//                   }}
//                   title={label}
//                 />
//               </Grid>
//             ))}
//           </Grid>
//           <Box sx={{ textAlign: 'center', mt: 2 }}>
//             <Button onClick={closeThemeDialog} variant="contained" color="primary">
//               Close
//             </Button>
//           </Box>
//         </DialogContent>
//       </Dialog>
//     </Box>
//   );
// };

// export default Header;


import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  Avatar,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  IconButton,
  Button,
  CircularProgress,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { useAppTheme } from '../context/ThemeContext';
import userService from '../services/userService'; // Import the service

const themesList = [
  { key: 'default', label: 'Purple', color: '#4e54c8' },
  { key: 'green', label: 'Green', color: '#4caf50' },
  { key: 'orange', label: 'Orange', color: '#ff9800' },
  { key: 'purple', label: 'Purple Alt', color: '#9c27b0' },
  { key: 'teal', label: 'Teal', color: '#009688' },
];

const Header = ({ onMenuClick }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isThemeDialogOpen, setIsThemeDialogOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const { currentThemeName, setThemeName } = useAppTheme();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await userService.getUserDetails();
        setUserData(response.data.user);
      } catch (error) {
        console.error('Failed to fetch user details:', error);
        // Handle error (e.g., redirect to login if unauthorized)
        if (error.message.includes('401')) {
          handleLogout();
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const getInitials = (name) => {
    if (!name) return '';
    return name.split(' ').map((n) => n[0]).join('').toUpperCase();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    navigate('/login');
  };

  const handleProfileClick = () => {
    navigate('/profile');
    setIsDropdownOpen(false);
  };

  const handleSettingsClick = () => {
    setIsDropdownOpen(false);
    setIsThemeDialogOpen(true);
  };

  const closeThemeDialog = () => {
    setIsThemeDialogOpen(false);
  };

  const selectTheme = (key) => {
    setThemeName(key);
  };

  if (loading) {
    return (
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: { xs: 0, sm: 180 },
          right: 0,
          height: 64,
          backgroundColor: 'primary.main',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1100,
        }}
      >
        <CircularProgress size={24} color="inherit" />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: { xs: 0, sm: 180 },
        right: 0,
        height: 64,
        backgroundColor: 'primary.main',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 2,
        zIndex: 1100,
        boxShadow: '0 2px 4px rgba(0,0,0,0.12)',
      }}
    >
      {/* Hamburger for mobile */}
      <IconButton
        color="inherit"
        edge="start"
        onClick={onMenuClick}
        sx={{ mr: 2, display: { sm: 'none' } }}
      >
        <MenuIcon />
      </IconButton>

      <Typography variant="h6" noWrap>
        {userData?.username || 'User'}
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }} ref={dropdownRef}>
        <Avatar
          sx={{ bgcolor: 'secondary.main', cursor: 'pointer', userSelect: 'none' }}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          {getInitials(userData?.username)}
        </Avatar>

        {isDropdownOpen && (
          <Box
            sx={{
              position: 'absolute',
              right: 16,
              top: 'calc(100% + 8px)',
              bgcolor: 'background.paper',
              color: 'text.primary',
              borderRadius: 1,
              boxShadow: 3,
              zIndex: 1300,
              minWidth: 140,
            }}
          >
            <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
            <MenuItem onClick={handleSettingsClick}>Settings</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Box>
        )}
      </Box>

      {/* Theme dialog */}
      <Dialog open={isThemeDialogOpen} onClose={closeThemeDialog}>
        <DialogTitle>Select Application Theme</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} justifyContent="center" sx={{ py: 1 }}>
            {themesList.map(({ key, label, color }) => (
              <Grid item key={key}>
                <Box
                  onClick={() => selectTheme(key)}
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    bgcolor: color,
                    border: key === currentThemeName ? '3px solid black' : '2px solid #ccc',
                    cursor: 'pointer',
                    boxShadow: '0 0 6px rgba(0,0,0,0.3)',
                  }}
                  title={label}
                />
              </Grid>
            ))}
          </Grid>
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Button onClick={closeThemeDialog} variant="contained" color="primary">
              Close
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Header;