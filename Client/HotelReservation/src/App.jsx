import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import SignIn from "./components/SignIn";
import { Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Guest from "./components/GuestPanel/Guest";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/guest/*" element={<Guest />}></Route>
      </Routes>
    </>
  );
}

export default App;
