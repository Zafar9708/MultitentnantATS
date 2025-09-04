import React, { useState } from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Paper,
  CircularProgress,
  Box,
  Alert,
  Link,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Divider,
  Avatar
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import BusinessIcon from '@mui/icons-material/Business';
import PersonIcon from '@mui/icons-material/Person';

const RegisterForm = ({ userRole, tenantId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Determine which fields to show based on who is registering
  const isSuperAdminRegistering = userRole === "superadmin";
  const isAdminRegistering = userRole === "admin";

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
    ...(isSuperAdminRegistering && {
      tenantName: Yup.string().required("Tenant name is required"),
      tenantDomain: Yup.string().required("Tenant domain is required"),
    }),
    ...(isAdminRegistering && {
      username: Yup.string()
        .min(3, "Username must be at least 3 characters")
        .required("Username is required"),
    }),
  });

  const handleSubmit = async (values) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      let endpoint = "";
      let payload = {};

      if (isSuperAdminRegistering) {
        endpoint = "/api/v1/tenants";
        payload = {
          name: values.tenantName,
          domain: values.tenantDomain,
          adminEmail: values.email,
          adminPassword: values.password
        };
      } else if (isAdminRegistering) {
        endpoint = "/api/v1/tenants/recruiters";
        payload = {
          email: values.email,
          password: values.password,
          username: values.username,
          tenantId: tenantId
        };
      } else {
        // Default registration (shouldn't happen in your flow)
        endpoint = "/user/register";
        payload = values;
      }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
          'ngrok-skip-browser-warning': 'true'

        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          navigate(isSuperAdminRegistering ? "/tenants" : "/recruiters");
        }, 2000);
      } else {
        setErrorMessage(data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#f5f7fa'
    }}>
      {/* Left Side - Image */}
      <Box sx={{
        width: '50%',
        backgroundImage: 'url(https://source.unsplash.com/random/800x600/?office,recruitment)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: { xs: 'none', md: 'block' }
      }} />

      {/* Right Side - Form */}
      <Box sx={{
        width: { xs: '100%', md: '50%' },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 4
      }}>
        <Paper elevation={3} sx={{
          width: '100%',
          maxWidth: 500,
          p: 4,
          borderRadius: 2
        }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              {isSuperAdminRegistering ? <BusinessIcon /> : <PersonIcon />}
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ mt: 1 }}>
              {isSuperAdminRegistering ? "Create New Tenant" : 
               isAdminRegistering ? "Add New Recruiter" : "Register Account"}
            </Typography>
          </Box>

          {isSuccess ? (
            <Box textAlign="center" sx={{ mt: 3 }}>
              <Alert severity="success" sx={{ mb: 2 }}>
                {isSuperAdminRegistering ? "Tenant created successfully!" : 
                 isAdminRegistering ? "Recruiter added successfully!" : "Registration successful!"}
              </Alert>
              <CircularProgress />
              <Typography variant="body2" sx={{ mt: 2 }}>
                Redirecting...
              </Typography>
            </Box>
          ) : (
            <Formik
              initialValues={{
                email: "",
                password: "",
                confirmPassword: "",
                ...(isSuperAdminRegistering && {
                  tenantName: "",
                  tenantDomain: ""
                }),
                ...(isAdminRegistering && {
                  username: ""
                })
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form>
                  <Box sx={{ mt: 3 }}>
                    {errorMessage && (
                      <Alert severity="error" sx={{ mb: 3 }}>
                        {errorMessage}
                      </Alert>
                    )}

                    {isSuperAdminRegistering && (
                      <>
                        <TextField
                          fullWidth
                          margin="normal"
                          id="tenantName"
                          name="tenantName"
                          label="Tenant Name"
                          variant="outlined"
                          error={touched.tenantName && Boolean(errors.tenantName)}
                          helperText={touched.tenantName && errors.tenantName}
                        />
                        <TextField
                          fullWidth
                          margin="normal"
                          id="tenantDomain"
                          name="tenantDomain"
                          label="Tenant Domain"
                          variant="outlined"
                          error={touched.tenantDomain && Boolean(errors.tenantDomain)}
                          helperText={touched.tenantDomain && errors.tenantDomain}
                        />
                      </>
                    )}

                    {isAdminRegistering && (
                      <TextField
                        fullWidth
                        margin="normal"
                        id="username"
                        name="username"
                        label="Username"
                        variant="outlined"
                        error={touched.username && Boolean(errors.username)}
                        helperText={touched.username && errors.username}
                      />
                    )}

                    <TextField
                      fullWidth
                      margin="normal"
                      id="email"
                      name="email"
                      label="Email Address"
                      variant="outlined"
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                    />

                    <TextField
                      fullWidth
                      margin="normal"
                      id="password"
                      name="password"
                      label="Password"
                      type="password"
                      variant="outlined"
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                    />

                    <TextField
                      fullWidth
                      margin="normal"
                      id="confirmPassword"
                      name="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      variant="outlined"
                      error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                      helperText={touched.confirmPassword && errors.confirmPassword}
                    />

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2, py: 1.5 }}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        isSuperAdminRegistering ? "Create Tenant" : 
                        isAdminRegistering ? "Add Recruiter" : "Register"
                      )}
                    </Button>

                    {!isAdminRegistering && !isSuperAdminRegistering && (
                      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                        Already have an account?{' '}
                        <Link href="/login" underline="hover">
                          Sign in
                        </Link>
                      </Typography>
                    )}
                  </Box>
                </Form>
              )}
            </Formik>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default RegisterForm;