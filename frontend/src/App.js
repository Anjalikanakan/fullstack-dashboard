// frontend/src/App.js
// Main app — sets up routing and Redux Provider

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store      from "./redux/store";
import Navbar     from "./components/Navbar";
import Dashboard  from "./pages/Dashboard";
import Users      from "./pages/Users";
import Products   from "./pages/Products";
import "./styles/App.css";

function App() {
  return (
    // Provider — makes Redux store available to ALL child components
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/"         element={<Dashboard />} />
          <Route path="/users"    element={<Users />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
