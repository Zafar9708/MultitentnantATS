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
  createTheme
} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";

const loginTheme = createTheme({
  palette: {
    primary: { main: '#4e54c8' },
    background: { default: '#000000' }
  },
});

const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email")
      .required("Required"),
    password: Yup.string()
      .min(6, "Minimum 6 characters")
      .required("Required"),
  });

  const handleSubmit = async (values) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const data = await loginUser(values);

      localStorage.setItem("token", data.token);
      localStorage.setItem("userData", JSON.stringify(data.data.user));

      switch (data.data.user.role) {
        case "superadmin":
          navigate("/superadmin/dashboard");
          break;
        case "admin":
          navigate(`/tenant/${data.data.user.tenantId}`);
          break;
        case "recruiter":
          navigate(`/recruiter/${data.data.user.tenantId}/dashboard`);
          break;
        default:
          navigate("/dashboard");
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider theme={loginTheme}>
      <CssBaseline />
      <Box
        sx={{
          height: "100vh",
          width: "400%",
          backgroundImage: "url('/images/ats-bg2.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Paper
          elevation={6}
          sx={{
            p: 4,
            maxWidth: 400,
            width: "100%",
            borderRadius: 3,
            bgcolor: "rgba(255, 255, 255, 0.2)", // More transparent
            backdropFilter: "blur(12px)", // Frosted glass effect
            boxShadow: "0 4px 30px rgba(0,0,0,0.3)",
          }}
        >
          <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
            <Avatar sx={{ bgcolor: "primary.main", width: 56, height: 56 }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5" mt={2}>
              Sign In
            </Typography>
          </Box>

          {errorMessage && (
            <Alert severity="error" sx={{ mb: 2 }}>
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
                  label="Email"
                  fullWidth
                  margin="normal"
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />

                <Field
                  as={TextField}
                  name="password"
                  label="Password"
                  type="password"
                  fullWidth
                  margin="normal"
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 3, py: 1.2 }}
                  disabled={isLoading}
                >
                  {isLoading ? <CircularProgress size={24} /> : "Sign In"}
                </Button>

                <Box textAlign="center" mt={2}>
                  <Link href="/register" variant="body2">
                    Create account
                  </Link>
                </Box>
              </Form>
            )}
          </Formik>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default LoginForm;
