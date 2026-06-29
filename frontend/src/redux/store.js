// frontend/src/redux/store.js
// Redux store — combines all slices

import { configureStore } from "@reduxjs/toolkit";
import authReducer     from "./slices/authSlice";
import usersReducer    from "./slices/usersSlice";
import productsReducer from "./slices/productsSlice";

const store = configureStore({
  reducer: {
    auth:     authReducer,
    users:    usersReducer,
    products: productsReducer,
  },
});

export default store;
