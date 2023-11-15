import React, { useEffect } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({});
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const userLogin = localStorage.getItem("userLogin");
  useEffect(() => {
    if (userLogin) {
      navigate("/guest");
    }
  }, []);
  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  console.log(form);
  const loginClick = (e) => {
    setMsg("Loading...");
    setLoading(true);
    e.preventDefault();
    axios
      .post("http://localhost:5000/signin", form)
      .then((response) => {
        setTimeout(() => {
          if (response.data === "Error") {
            setErrorMsg("No records existed!");
          } else if (response.data === "Success") {
            setErrorMsg("Login Successfully");
            localStorage.setItem("userLogin", true);
          }
          else if (response.data === "Invalid") {
            setErrorMsg("Invalid username or password");
          }
          setLoading(false);
          setMsg("");
        }, 2500);
        setTimeout(() => {
          navigate("/guest");
        }, 5000);
      })
      .catch((err) => console.log(err));

    console.log("clicked!");
  };
  return (
    <>
      <div className="login-container">
        <h1>Sign In</h1>
        <form onSubmit={(e) => loginClick(e)}>
          <div>
            <label id="Username" />
            Username:
            <br />
            <input
              name="Username"
              type="text"
              value={form.userName}
              required
              onChange={handleChange}
              placeholder="Enter your username"
              maxLength={30}
            />
          </div>
          <div>
            <label id="Password" />
            Password:
            <br />
            <input
              name="Password"
              type="password"
              value={form.password}
              required
              onChange={handleChange}
              placeholder="Enter your password"
              maxLength={30}
            />
          </div>
          <div>
            <button className="login-btn">Login</button>
            {!loading ? <h3>{errorMsg}</h3> : <h3>{msg}</h3>}
          </div>
        </form>
        <div>
          <h2>Doesn't have an account?</h2>
          <NavLink to="/register">Register</NavLink>
        </div>
      </div>
    </>
  );
};

export default Login;
