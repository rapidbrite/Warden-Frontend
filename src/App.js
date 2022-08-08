import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// component
import Login from "./pages/Login.jsx";
import Main from "./pages/Main.jsx";

// style
import "./scss/app.scss"


const App = () => {
  return (
    <Router >
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard/*" element={<Main />} />
          {/* <Route path="/" element={<Navigate to="/dashboard" />} /> */}
          
          {/* <Route path="*" element={<Navigate to="/login" />} /> */}
        </Routes>
      </Router>
  )
}

export default App