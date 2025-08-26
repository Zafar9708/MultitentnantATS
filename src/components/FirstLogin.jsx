// import React, { useState } from 'react';
// import {
//   Box,
//   Container,
//   Paper,
//   Typography,
//   TextField,
//   Button,
//   Alert,
//   CircularProgress,
//   useTheme
// } from '@mui/material';
// import { Lock as LockIcon } from '@mui/icons-material';
// import { useSearchParams, useNavigate } from 'react-router-dom';

// import { firstLogin } from '../services/authService';


// const FirstLogin = () => {
//   const theme = useTheme();
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   const token = searchParams.get('token');
//   const email = searchParams.get('email');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');

//     if (!password || !confirmPassword) {
//       setError('Please fill in all fields');
//       return;
//     }

//     if (password !== confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }

//     if (password.length < 8) {
//       setError('Password must be at least 8 characters long');
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await firstLogin({ token, email, password });
//       if (response.token) {
//         // Save token and redirect to dashboard
//         localStorage.setItem('token', response.token);
//         setSuccess('Password set successfully! Redirecting to dashboard...');
//         setTimeout(() => {
//           navigate('/recruiter/dashboard');
//         }, 2000);
//       }
//     } catch (err) {
//       setError(err.message || 'Failed to set password');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!token || !email) {
//     return (
//       <Container component="main" maxWidth="sm" sx={{ mt: 8 }}>
//         <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//           <Alert severity="error">
//             Invalid or missing token/email. Please use the link provided in your welcome email.
//           </Alert>
//         </Paper>
//       </Container>
//     );
//   }

//   return (
//     <Container component="main" maxWidth="sm" sx={{ mt: 8 }}>
//       <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//         <Box
//           sx={{
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             width: 60,
//             height: 60,
//             borderRadius: '50%',
//             backgroundColor: theme.palette.primary.main,
//             color: 'white',
//             mb: 2
//           }}
//         >
//           <LockIcon fontSize="large" />
//         </Box>
        
//         <Typography component="h1" variant="h5" gutterBottom>
//           Set Your Password
//         </Typography>
        
//         <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mb: 3 }}>
//           Welcome to HireOnboard! Please set a password for your account.
//         </Typography>

//         {error && (
//           <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
//             {error}
//           </Alert>
//         )}

//         {success && (
//           <Alert severity="success" sx={{ width: '100%', mb: 2 }}>
//             {success}
//           </Alert>
//         )}

//         <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             name="password"
//             label="New Password"
//             type="password"
//             id="password"
//             autoComplete="new-password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             disabled={loading}
//           />
          
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             name="confirmPassword"
//             label="Confirm Password"
//             type="password"
//             id="confirmPassword"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             disabled={loading}
//           />
          
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             sx={{ mt: 3, mb: 2, py: 1.5 }}
//             disabled={loading}
//           >
//             {loading ? <CircularProgress size={24} /> : 'Set Password'}
//           </Button>
//         </Box>
//       </Paper>
//     </Container>
//   );
// };

// export default FirstLogin;


///----------


import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  useTheme
} from '@mui/material';
import { Lock as LockIcon } from '@mui/icons-material';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { firstLogin, validateFirstLoginToken } from '../services/authService';

const FirstLogin = () => {
  const theme = useTheme();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [validating, setValidating] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [tokenValid, setTokenValid] = useState(false);

  const token = searchParams.get('token');
  const email = searchParams.get('email');

  useEffect(() => {
    // Validate token when component mounts
    const validateToken = async () => {
      if (!token || !email) {
        setError('Invalid or missing token/email');
        setValidating(false);
        return;
      }

      try {
        setValidating(true);
        const response = await validateFirstLoginToken({ token, email });
        
        if (response.status === 'success') {
          setTokenValid(true);
        }
      } catch (err) {
        setError(err.message || 'Token is invalid or has expired');
      } finally {
        setValidating(false);
      }
    };

    validateToken();
  }, [token, email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!password || !confirmPassword) {
      setError('Please Fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    setLoading(true);

    try {
      const response = await firstLogin({ token, email, password });
      
      if (response.token) {
        // Save token and redirect to dashboard
        localStorage.setItem('token', response.token);
        localStorage.setItem('userData', JSON.stringify(response.data.user));
        
        setSuccess('Password set successfully! Redirecting to dashboard...');
        
        setTimeout(() => {
          // Redirect based on user role
          if (response.data.user.role === 'recruiter') {
            navigate('/recruiter/dashboard');
          } else if (response.data.user.role === 'admin' || response.data.user.role === 'superadmin') {
            navigate('/admin/dashboard');
          } else {
            navigate('/dashboard');
          }
        }, 2000);
      }
    } catch (err) {
      setError(err.message || 'Failed to set password');
    } finally {
      setLoading(false);
    }
  };

  if (validating) {
    return (
      <Container component="main" maxWidth="sm" sx={{ mt: 8 }}>
        <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <CircularProgress />
          <Typography variant="body1" sx={{ mt: 2 }}>
            Validating your link...
          </Typography>
        </Paper>
      </Container>
    );
  }

  if (!token || !email) {
    return (
      <Container component="main" maxWidth="sm" sx={{ mt: 8 }}>
        <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Alert severity="error">
            Invalid or missing token/email. Please use the link provided in your welcome email.
          </Alert>
        </Paper>
      </Container>
    );
  }

  if (!tokenValid) {
    return (
      <Container component="main" maxWidth="sm" sx={{ mt: 8 }}>
        <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Alert severity="error">
            {error || 'This link is invalid or has expired. Please request a new one.'}
          </Alert>
          <Button 
            variant="contained" 
            sx={{ mt: 2 }}
            onClick={() => navigate('/login')}
          >
            Go to Login
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container component="main" maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 60,
            height: 60,
            borderRadius: '50%',
            backgroundColor: theme.palette.primary.main,
            color: 'white',
            mb: 2
          }}
        >
          <LockIcon fontSize="large" />
        </Box>
        
        <Typography component="h1" variant="h5" gutterBottom>
          Set Your Password
        </Typography>
        
        <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mb: 3 }}>
          Welcome to HireOnboard! Please set a password for your account ({email}).
        </Typography>

        {error && (
          <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ width: '100%', mb: 2 }}>
            {success}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="New Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
          
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={loading}
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, py: 1.5 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Set Password'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default FirstLogin;