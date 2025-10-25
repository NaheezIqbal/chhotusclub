import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  mockAdminUser,
  mockRegularUser,
  simulateAsyncOperation,
} from "@/mock/mockData";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

// Mock register user
export const registerUser = createAsyncThunk(
  "/auth/register",
  async (formData) => {
    // Simulate API call
    await simulateAsyncOperation(null, 500);

    // Always return success for mock
    return {
      success: true,
      message: "Registration successful! Please login.",
    };
  }
);

// Mock login user
export const loginUser = createAsyncThunk("/auth/login", async (formData) => {
  // Simulate API call
  await simulateAsyncOperation(null, 500);

  const { email, password } = formData;

  // Check if admin credentials
  if (email === "admin@gmail.com" && password === "password123") {
    // Store auth info in localStorage
    localStorage.setItem("mockUser", JSON.stringify(mockAdminUser));
    return {
      success: true,
      message: "Login successful!",
      user: mockAdminUser,
    };
  }

  // Any other credentials work for regular user
  const regularUser = {
    ...mockRegularUser,
    email: email,
    userName: email.split("@")[0],
  };

  localStorage.setItem("mockUser", JSON.stringify(regularUser));
  return {
    success: true,
    message: "Login successful!",
    user: regularUser,
  };
});

// Mock logout user
export const logoutUser = createAsyncThunk("/auth/logout", async () => {
  // Simulate API call
  await simulateAsyncOperation(null, 300);

  // Clear localStorage
  localStorage.removeItem("mockUser");

  return {
    success: true,
    message: "Logged out successfully!",
  };
});

// Mock check auth
export const checkAuth = createAsyncThunk("/auth/checkauth", async () => {
  // Simulate API call
  await simulateAsyncOperation(null, 300);

  // Check localStorage for user
  const storedUser = localStorage.getItem("mockUser");

  if (storedUser) {
    return {
      success: true,
      user: JSON.parse(storedUser),
    };
  }

  return {
    success: false,
    message: "Not authenticated",
  };
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log(action);

        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
