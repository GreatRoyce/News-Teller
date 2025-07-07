// src/App.jsx
import React from "react";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import { NewsProvider } from "./context/NewsContext"; // ✅ import your provider

function App() {
  return (
    <NewsProvider> 
      <div>
        <Navbar />
        <Dashboard />
      </div>
    </NewsProvider>
  );
}

export default App;
