// frontend/src/redux/slices/productsSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { productAPI } from "../../services/api";

export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async (params, { rejectWithValue }) => {
    try {
      const response = await productAPI.getAll(params);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch");
    }
  }
);

export const createProduct = createAsyncThunk(
  "products/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await productAPI.create(data);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to create");
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await productAPI.update(id, data);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to update");
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id, { rejectWithValue }) => {
    try {
      await productAPI.delete(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to delete");
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    list:    [],
    loading: false,
    error:   null,
    success: null,
  },
  reducers: {
    clearMessages: (state) => {
      state.error   = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending,   (state) => { state.loading = true; state.error = null; })
      .addCase(fetchProducts.fulfilled, (state, action) => { state.loading = false; state.list = action.payload; })
      .addCase(fetchProducts.rejected,  (state, action) => { state.loading = false; state.error = action.payload; })

      .addCase(createProduct.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
        state.success = "Product created!";
        state.loading = false;
      })
      .addCase(createProduct.rejected, (state, action) => { state.error = action.payload; state.loading = false; })

      .addCase(updateProduct.fulfilled, (state, action) => {
        const i = state.list.findIndex(p => p.id === action.payload.id);
        if (i !== -1) state.list[i] = action.payload;
        state.success = "Product updated!";
      })

      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.list    = state.list.filter(p => p.id !== action.payload);
        state.success = "Product deleted!";
      });
  },
});

export const { clearMessages } = productsSlice.actions;
export default productsSlice.reducer;
