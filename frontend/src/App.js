// frontend/src/App.js
// Main app — sets up routing and Redux Provider

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store        from "./redux/store";
import Navbar       from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard    from "./pages/Dashboard";
import Users        from "./pages/Users";
import Products     from "./pages/Products";
import Login        from "./pages/Login";
import "./styles/App.css";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/"         element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/users"    element={<PrivateRoute><Users /></PrivateRoute>} />
          <Route path="/products" element={<PrivateRoute><Products /></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
