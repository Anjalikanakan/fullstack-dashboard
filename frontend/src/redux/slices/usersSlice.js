// frontend/src/redux/slices/usersSlice.js
// Redux Toolkit slice for users state management

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userAPI } from "../../services/api";

// ── ASYNC THUNKS ──────────────────────────────────
// createAsyncThunk handles pending/fulfilled/rejected states automatically

// Fetch all users from API
export const fetchUsers = createAsyncThunk(
  "users/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userAPI.getAll();
      return response.data.data; // { success, data: [...] }
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch users");
    }
  }
);

// Create a new user
export const createUser = createAsyncThunk(
  "users/create",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await userAPI.create(userData);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to create user");
    }
  }
);

// Update a user
export const updateUser = createAsyncThunk(
  "users/update",
  async ({ id, userData }, { rejectWithValue }) => {
    try {
      const response = await userAPI.update(id, userData);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to update user");
    }
  }
);

// Delete a user
export const deleteUser = createAsyncThunk(
  "users/delete",
  async (id, { rejectWithValue }) => {
    try {
      await userAPI.delete(id);
      return id; // return id to remove from state
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to delete user");
    }
  }
);

// ── SLICE ─────────────────────────────────────────

const usersSlice = createSlice({
  name: "users",
  initialState: {
    list:    [],        // array of users
    loading: false,     // loading state
    error:   null,      // error message
    success: null,      // success message
  },

  reducers: {
    // Clear messages after showing them
    clearMessages: (state) => {
      state.error   = null;
      state.success = null;
    },
  },

  // Handle async thunk states
  extraReducers: (builder) => {
    builder
      // ── fetchUsers ──
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error   = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list    = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error   = action.payload;
      })

      // ── createUser ──
      .addCase(createUser.pending,   (state) => { state.loading = true; })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.list.unshift(action.payload);  // add to top of list
        state.success = "User created successfully!";
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error   = action.payload;
      })

      // ── updateUser ──
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.list.findIndex(u => u.id === action.payload.id);
        if (index !== -1) state.list[index] = action.payload;
        state.success = "User updated successfully!";
      })

      // ── deleteUser ──
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.list    = state.list.filter(u => u.id !== action.payload);
        state.success = "User deleted successfully!";
      });
  },
});

export const { clearMessages } = usersSlice.actions;
export default usersSlice.reducer;
