import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserManagement from "./pages/UserManagement";
import "./App.css";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/user-management" element={<UserManagement />} />

        <Route path="*" element={<h1>404 Not Found Page</h1>} />
      </Routes>
    </div>
  );
};

export default App;
