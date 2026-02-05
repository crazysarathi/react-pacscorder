import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const DashboardLayout = () => {
  const apiBaseUrl = process.env.REACT_APP_API_URL || "";
  const [dateTime, setDateTime] = useState("");
  const [storage, setStorage] = useState("Loading...");
  const [version, setVersion] = useState("Loading...");
  const [builder, setBuilder] = useState("Loading...");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    axios
      .get(`${apiBaseUrl}/pacsproinit/1`)
      .then((res) => {
        setStorage(res.data.memory);
        setVersion(res.data.version);
        setBuilder(res.data.builder);
      })
      .catch(() => {
        setStorage("N/A");
        setVersion("N/A");
        setBuilder("N/A");
      });

    const timer = setInterval(() => {
      const now = new Date();
      setDateTime(now.toLocaleString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  return (
    <div className="App d-flex flex-column min-vh-100">
      <Header dateTime={dateTime} storage={storage} />

      <Container fluid className="flex-fill d-flex flex-column">
        <Outlet />
      </Container>
      {location.pathname !== "/uploadqueue" &&
        location.pathname !== "/storagemanagement" && 
        location.pathname !== "/devicesettings" && (
          <Footer version={version} builder={builder} />
        )}
    </div>
  );
};

export default DashboardLayout;
