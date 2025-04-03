import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import config from "../config";

import Loader from "../component/Loader";
import "../scss/auth.scss";

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    // First, check if we have a token in localStorage
    const storedToken = localStorage.getItem("token");
    
    // Next, check if we have a token in URL (from redirect)
    const params = new URLSearchParams(location.search);
    const tokenFromUrl = params.get("token");
    
    if (storedToken) {
      // Already authenticated
      navigate("/main");
      return;
    }
    
    if (tokenFromUrl) {
      // Got token from OAuth redirect, save it
      localStorage.setItem("token", tokenFromUrl);
      navigate("/main");
      return;
    }
    
    // If no token available, try the original fetch method
    const getUser = () => {
      console.log("Attempting fetch authentication");
      fetch(`${config.Backend}/auth/login/success`, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          console.log('response', response);
          if (response.status === 200) return response.json();
          throw new Error("Authentication failed!");
        })
        .then((data) => {
          localStorage.setItem("token", data.data.token);
          navigate("/main");
        })
        .catch((err) => {
          console.log("Authentication error:", err.message);
          navigate("/login");
        });
    };
    
    getUser();
  }, [navigate, location]);
  
  return (
    <div className="auth">
      <Loader />
    </div>
  );
};

export default Auth;