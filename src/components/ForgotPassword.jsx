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
  Stepper,
  Step,
  StepLabel,
  Container
} from "@mui/material";
import LockResetIcon from '@mui/icons-material/LockReset';
import { useNavigate } from "react-router-dom";
import { forgotPassword, verifyOTP, resetPassword } from "../services/authService";

const forgotPasswordTheme = createTheme({
  palette: {
    primary: { main: '#4e54c8' },
    secondary: { main: '#f50057' }
  },
});

const steps = ['Enter Email', 'Verify OTP', 'Reset Password'];

const ForgotPasswordForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [email, setEmail] = useState("");
  const [resetToken, setResetToken] = useState("");
  const navigate = useNavigate();

  const handleEmailSubmit = async (values) => {
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await forgotPassword({ email: values.email });
      setEmail(values.email);
      setSuccessMessage("OTP sent to your email!");
      setActiveStep(1);
    } catch (error) {
      setErrorMessage(error.message || "Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPSubmit = async (values) => {
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const data = await verifyOTP({ email, otp: values.otp });
      setResetToken(data.resetToken);
      setActiveStep(2);
    } catch (error) {
      setErrorMessage(error.message || "Invalid OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = async (values) => {
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await resetPassword(resetToken, {
        password: values.password,
        passwordConfirm: values.passwordConfirm
      });
      setSuccessMessage("Password reset successfully! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setErrorMessage(error.message || "Password reset failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await forgotPassword({ email });
      setSuccessMessage("OTP resent to your email!");
    } catch (error) {
      setErrorMessage(error.message || "Failed to resend OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const emailValidationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const otpValidationSchema = Yup.object({
    otp: Yup.string()
      .length(6, "OTP must be 6 digits")
      .matches(/^\d+$/, "OTP must contain only numbers")
      .required("OTP is required"),
  });

  const passwordValidationSchema = Yup.object({
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required("Please confirm your password"),
  });

  const handleBackToLogin = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <ThemeProvider theme={forgotPasswordTheme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          width: "320%",
        //   backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/ats-bg2.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 4
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
                <LockResetIcon />
              </Avatar>
              <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" color="primary">
                Reset Password
              </Typography>

              <Stepper activeStep={activeStep} sx={{ width: '100%', mt: 2, mb: 3 }}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>

            {errorMessage && (
              <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                {errorMessage}
              </Alert>
            )}

            {successMessage && (
              <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
                {successMessage}
              </Alert>
            )}

            {activeStep === 0 && (
              <Formik
                initialValues={{ email: "" }}
                validationSchema={emailValidationSchema}
                onSubmit={handleEmailSubmit}
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
                      {isLoading ? <CircularProgress size={24} /> : "Send OTP"}
                    </Button>

                    <Box textAlign="center" mt={3}>
                      <Link 
                        href="/login" 
                        variant="body2" 
                        onClick={handleBackToLogin}
                        sx={{ 
                          color: 'primary.main', 
                          fontWeight: 'medium',
                          textDecoration: 'none',
                          '&:hover': { textDecoration: 'underline' }
                        }}
                      >
                        Back to Login
                      </Link>
                    </Box>
                  </Form>
                )}
              </Formik>
            )}

            {activeStep === 1 && (
              <Formik
                initialValues={{ otp: "" }}
                validationSchema={otpValidationSchema}
                onSubmit={handleOTPSubmit}
              >
                {({ errors, touched }) => (
                  <Form>
                    <Field
                      as={TextField}
                      name="otp"
                      label="Enter OTP Code"
                      type="text"
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      placeholder="Enter 6-digit OTP"
                      error={touched.otp && Boolean(errors.otp)}
                      helperText={touched.otp && errors.otp}
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
                      {isLoading ? <CircularProgress size={24} /> : "Verify OTP"}
                    </Button>

                    <Box textAlign="center" mt={2}>
                      <Link 
                        href="#" 
                        variant="body2" 
                        onClick={handleResendOTP}
                        sx={{ 
                          color: 'secondary.main', 
                          fontWeight: 'medium',
                          textDecoration: 'none',
                          '&:hover': { textDecoration: 'underline' }
                        }}
                      >
                        Resend OTP
                      </Link>
                    </Box>

                    <Box textAlign="center" mt={1}>
                      <Link 
                        href="/login" 
                        variant="body2" 
                        onClick={handleBackToLogin}
                        sx={{ 
                          color: 'primary.main', 
                          fontWeight: 'medium',
                          textDecoration: 'none',
                          '&:hover': { textDecoration: 'underline' }
                        }}
                      >
                        Back to Login
                      </Link>
                    </Box>
                  </Form>
                )}
              </Formik>
            )}

            {activeStep === 2 && (
              <Formik
                initialValues={{ password: "", passwordConfirm: "" }}
                validationSchema={passwordValidationSchema}
                onSubmit={handlePasswordSubmit}
              >
                {({ errors, touched }) => (
                  <Form>
                    <Field
                      as={TextField}
                      name="password"
                      label="New Password"
                      type="password"
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                      sx={{ mb: 2 }}
                    />

                    <Field
                      as={TextField}
                      name="passwordConfirm"
                      label="Confirm New Password"
                      type="password"
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      error={touched.passwordConfirm && Boolean(errors.passwordConfirm)}
                      helperText={touched.passwordConfirm && errors.passwordConfirm}
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
                      {isLoading ? <CircularProgress size={24} /> : "Reset Password"}
                    </Button>
                  </Form>
                )}
              </Formik>
            )}
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default ForgotPasswordForm;