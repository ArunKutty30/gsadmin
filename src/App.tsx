import React from "react";
import { Route, Routes } from "react-router-dom";
import Navigation from "./components/Nav";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tokens" element={<Home />} />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
