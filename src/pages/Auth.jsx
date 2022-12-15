import React, { useEffect } from "react";
import { useNavigate } from "react-router";

import Loader from "../component/Loader";
import "../scss/auth.scss";

const Auth = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/main");
    }
    const getUser = () => {
      fetch("http://3.108.252.9:3333/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          //console.log('response',response);
          if (response.status === 200) return response.json();

          throw new Error("authentication has been failed!");
        })
        .then((data) => {
          //console.log("inside:", data);
          localStorage.setItem("token", data.data.token);
          navigate("/main");
        })
        .catch((err) => {
          //console.log(err);
          navigate("/login");
        });
    };
    getUser();
  }, [navigate]);
  return (
    <div className="auth">
      <Loader />
    </div>
  );
};

export default Auth;
