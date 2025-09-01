// // src/components/ProtectedRoute.js
// import { Navigate } from 'react-router-dom';

// const ProtectedRoute = ({ children, allowedRoles }) => {
//   const token = localStorage.getItem('token');
//   const userData = JSON.parse(localStorage.getItem('userData'));
  
//   if (!token || !userData) {
//     return <Navigate to="/login" replace />;
//   }
  
//   if (allowedRoles && !allowedRoles.includes(userData.role)) {
//     return <Navigate to="/unauthorized" replace />;
//   }
  
//   return children;
// };

// export default ProtectedRoute;

//---------

// src/components/ProtectedRoute.js
import { Navigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { CircularProgress, Box } from '@mui/material';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useUser();
  const token = localStorage.getItem('token');

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;