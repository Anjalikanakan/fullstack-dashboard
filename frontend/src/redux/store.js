// frontend/src/redux/store.js
// Redux store — combines all slices

import { configureStore } from "@reduxjs/toolkit";
import usersReducer    from "./slices/usersSlice";
import productsReducer from "./slices/productsSlice";

const store = configureStore({
  reducer: {
    users:    usersReducer,    // state.users
    products: productsReducer, // state.products
  },
});

export default store;
