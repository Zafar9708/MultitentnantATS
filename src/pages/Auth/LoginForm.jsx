
import React, { useState } from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Link,
  CircularProgress,
  Paper,
  Avatar,
  CssBaseline,
  ThemeProvider,
  createTheme,
  Container
} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";
import { useUser } from "../../contexts/UserContext";

const loginTheme = createTheme({
  palette: {
    primary: { main: '#4e54c8' },
    secondary: { main: '#f50057' },
    background: { default: '#f5f5f5' }
  },
});

const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { updateUser } = useUser();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const data = await loginUser(values);

      localStorage.setItem("token", data.token);
      updateUser(data.data.user);

      switch (data.data.user.role) {
        case "superadmin":
          navigate("/superadmin/dashboard");
          break;
        case "admin":
          navigate(`/tenant/${data.data.user.tenantId}/dashboard`);
          break;
        case "recruiter":
          navigate(`/recruiter/${data.data.user.tenantId}/dashboard`);
          break;
        default:
          navigate("/dashboard");
      }
    } catch (error) {
      setErrorMessage(error.message || "Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPasswordClick = (e) => {
    e.preventDefault();
    navigate("/forgot-password");
  };

  const handleRegisterClick = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  return (
    <ThemeProvider theme={loginTheme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          width: "100%",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 4,
          ml:42
        }}
      >
        <Container component="main" maxWidth="sm">
          <Paper
            elevation={24}
            sx={{
              p: 4,
              borderRadius: 3,
              bgcolor: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
            }}
          >
            <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
              <Avatar sx={{ bgcolor: "primary.main", width: 60, height: 60, mb: 2 }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" color="primary">
                Sign In
              </Typography>
              <Typography variant="body1" color="text.secondary" textAlign="center">
                Welcome back! Please login to continue.
              </Typography>
            </Box>

            {errorMessage && (
              <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                {errorMessage}
              </Alert>
            )}

            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form>
                  <Field
                    as={TextField}
                    name="email"
                    label="Email Address"
                    type="email"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    sx={{ mb: 2 }}
                  />

                  <Field
                    as={TextField}
                    name="password"
                    label="Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                    sx={{ mb: 3 }}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    sx={{ 
                      mt: 2, 
                      py: 1.5, 
                      fontSize: '1.1rem',
                      borderRadius: 2,
                      fontWeight: 'bold'
                    }}
                    disabled={isLoading}
                  >
                    {isLoading ? <CircularProgress size={24} /> : "Sign In"}
                  </Button>

                  <Box textAlign="center" mt={3}>
                    <Link 
                      href="/register" 
                      variant="body2" 
                      onClick={handleRegisterClick}
                      sx={{ 
                        mr: 3, 
                        color: 'primary.main', 
                        fontWeight: 'medium',
                        textDecoration: 'none',
                        '&:hover': { textDecoration: 'underline' }
                      }}
                    >
                      Create Superadmin Account
                    </Link>
                    <Link 
                      href="/forgot-password" 
                      variant="body2" 
                      onClick={handleForgotPasswordClick}
                      sx={{ 
                        color: 'secondary.main', 
                        fontWeight: 'medium',
                        textDecoration: 'none',
                        '&:hover': { textDecoration: 'underline' }
                      }}
                    >
                      Forgot Password?
                    </Link>
                  </Box>
                </Form>
              )}
            </Formik>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default LoginForm;
