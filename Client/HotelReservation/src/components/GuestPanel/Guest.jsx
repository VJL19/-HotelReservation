import Nav from "./Nav";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Reservation from "./Reservation";
import Services from "./Services";
import AboutUs from "./AboutUs";
import Footer from "./Footer";
import "../GuestPanel/index.css";
import Protected from "../routes/Protected";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Guest = () => {
  const userLogin = localStorage.getItem("userLogin");
  const navigate = useNavigate();

  useEffect(() => {
    if (userLogin) {
      navigate("/guest", { replace: true });
    }
  }, []);
  return (
    <>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<Protected Component={Home} />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<AboutUs />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default Guest;
