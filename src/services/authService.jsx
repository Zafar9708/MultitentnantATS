// // src/services/authService.js
// import axios from "axios";

// const API_URL = "https://your-api-url.com/api"; // replace with your actual API URL

// export const loginUser = async (email, password) => {
//   try {
//     const response = await axios.post(`${API_URL}/login`, { email, password });
//     return response.data;
//   } catch (error) {
//     throw error.response?.data || { message: "Login failed" };
//   }
// };


// src/services/authService.js
export const loginUser = async (credentials) => {
  try {
    const response = await fetch("http://localhost:5000/api/v1/auth/login", {
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
