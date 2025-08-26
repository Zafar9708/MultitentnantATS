
// export const loginUser = async (credentials) => {
//   try {
//     const response = await fetch("http://localhost:5000/api/v1/auth/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(credentials),
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       throw new Error(data.message || "Login failed");
//     }

//     return data;
//   } catch (error) {
//     throw error;
//   }
// };


//---------

// src/services/authService.js
const API_BASE_URL = "http://localhost:5000/api/v1";

export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const forgotPassword = async (emailData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to send OTP");
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const verifyOTP = async (otpData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(otpData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "OTP verification failed");
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (token, passwords) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/reset-password/${token}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(passwords),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Password reset failed");
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    // Get token from localStorage for authorization
    const token = localStorage.getItem("token");
    
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Registration failed");
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const getUserDetails = async () => {
  try {
    // Get token from localStorage for authorization
    const token = localStorage.getItem("token");
    
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch user details");
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const validateFirstLoginToken = async (tokenData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/validate-first-login-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tokenData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Token validation failed");
    }

    return data;
  } catch (error) {
    throw error;
  }
};

// Update the firstLogin function
export const firstLogin = async (data) => {
  try {
    // Determine the endpoint based on whether password is provided
    const endpoint = data.password 
      ? `${API_BASE_URL}/auth/first-login` 
      : `${API_BASE_URL}/auth/validate-first-login-token`;
    
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "First login process failed");
    }

    return result;
  } catch (error) {
    throw error;
  }
};