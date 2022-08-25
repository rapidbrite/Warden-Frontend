import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  
} from "react-router-dom";

// component
import Login from "./pages/Login.jsx";
import Main from "./pages/Main.jsx";
import Auth from "./pages/Auth.jsx";

// style
import "./scss/app.scss"


const App = () => {
  return (
    <Router >
      <Routes>
          <Route path="/auth" element = {<Auth />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/main/*" element={<Main />} />
          {/* <Route path="/" element={<Navigate to="/dashboard" />} /> */}
          
          {/* <Route path="*" element={<Navigate to="/login" />} /> */}
        </Routes>
      </Router>
  )
}

export default App