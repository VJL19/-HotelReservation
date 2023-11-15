import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";

const Register = () => {
  const [form, setForm] = useState({});
  const [errorMsg, setErrorMsg] = useState();
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
  const register = (e) => {
    e.preventDefault();
    console.log(form);
    setMsg("Loading...");
    setLoading(true);
    axios
      .post("http://localhost:5000/register", form)
      .then((response) => {
        setTimeout(() => {
          if (response.data === "Password error!") {
            setErrorMsg("Password do not match!");
          } else if (response.data === "Invalid format!") {
            setErrorMsg("Invalid email format!");
          } else if (response.data === "user exist!") {
            setErrorMsg("This account is already registered");
          } else {
            setErrorMsg("Register Successfully!");
          }
          setLoading(false);
          setMsg("");
        }, 2500);
        console.log(response);
      })
      .catch((err) => console.log(err));
    console.log("clicked!");
  };
  console.log(form);
  return (
    <>
      <div className="register-container">
        <h1>Sign Up</h1>
        <form onSubmit={(e) => register(e)}>
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <div>
              <label id="Lastname" />
              Last Name *
              <br />
              <input
                name="Lastname"
                type="text"
                value={form.Lastname}
                required
                onChange={handleChange}
                placeholder="Enter your last name"
                style={{ width: 250 }}
                maxLength={30}
              />
            </div>
            <div>
              <label id="Firstname" />
              First Name *
              <br />
              <input
                name="Firstname"
                type="text"
                value={form.Firstname}
                required
                onChange={handleChange}
                placeholder="Enter your first name"
                style={{ width: 250 }}
                maxLength={30}
              />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            <div>
              <label id="Username" />
              Username *
              <br />
              <input
                name="Username"
                type="text"
                value={form.Username}
                required
                onChange={handleChange}
                placeholder="Enter your username"
                style={{ width: 250 }}
                maxLength={30}
              />
            </div>
            <div>
              <label id="Contactnum" />
              Contact Number *
              <br />
              <input
                name="Contactnum"
                type="number"
                value={form.Contactnum}
                required
                onChange={handleChange}
                placeholder="Enter your Contact no."
                style={{ width: 250 }}
              />
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <div>
              <label id="Password" />
              Password *
              <br />
              <input
                name="Password"
                type="password"
                value={form.Password}
                required
                onChange={handleChange}
                placeholder="Enter your password"
                style={{ width: 250 }}
                maxLength={30}
              />
            </div>
            <div>
              <label id="ConfirmPassword" />
              Confirm Password *
              <br />
              <input
                name="ConfirmPassword"
                type="password"
                value={form.ConfirmPassword}
                required
                onChange={handleChange}
                placeholder="Enter your confirm password"
                style={{ width: 250 }}
                maxLength={30}
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <div>
              <label id="Email" />
              Email *
              <br />
              <input
                name="Email"
                type="email"
                value={form.Email}
                required
                onChange={handleChange}
                placeholder="Enter your email"
                maxLength={30}
              />
            </div>
          </div>
          <button className="login-btn">Register</button>
          {!loading ? <h3>{errorMsg}</h3> : <h3>{msg}</h3>}
        </form>
        <div>
          <h2>Already have an account?</h2>
          <NavLink to="/signin">Sign In</NavLink>
        </div>
      </div>
    </>
  );
};

export default Register;
