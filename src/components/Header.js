import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useLocation, useNavigate } from "react-router-dom";

const Header = ({ dateTime, storage }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const getTitleForRoute = () => {
    switch (location.pathname) {
      case "/":
        return "PACSCORDER PRO";
      case "/newrecording":
        return "New Record";
      case "/newrecording/newrecordingfilled":
        return "New Record";
      case "/newrecording/newrecordingfilled/completedrecording":
        return "New Record";
      case "/uploadqueue":
        return "Uploadqueue";
      case "/uploadqueue/completedrecording":
        return "Uploadqueue";
      case "/storagemanagement":
        return "Storage management";
      case "/storagemanagement/completedrecording":
        return "Storage management";
      case "/devicesettings":
        return "Device settings";
      default:
        return "PACSCORDER PRO";
    }
  };

  useEffect(() => {
    if (location.pathname === "/") {
      localStorage.removeItem("newRecordingData");
      localStorage.removeItem("recordConfirmed");
      localStorage.removeItem("patientId");
    }
  }, [location.pathname]);

  const isRecordConfirmed = localStorage.getItem("recordConfirmed") === "true";

  return (
    <Container fluid className="header">
      <Row>
        <Col sm="auto">
          <span>{dateTime}</span>
        </Col>
        <Col className="text-center d-flex align-items-center justify-content-center">
          {/* {location.pathname !== "/" && location.pathname !== "/dashboard" && location.pathname !== "/privewpage" &&(
            <i
              className="icon icon-arrow-left"
              onClick={() => navigate(-1)}
              style={{ cursor: "pointer", marginRight: "10px" }}
            ></i>
          )} */}

          {location.pathname !== "/" &&
            location.pathname !== "/dashboard" &&
            location.pathname !==
              "/newrecording/newrecordingfilled/completedrecording" &&
            location.pathname !== "/privewpage" &&
            !(
              location.pathname === "/newrecording/newrecordingfilled" &&
              isRecordConfirmed
            ) && (
              <i
                className="icon icon-arrow-left"
                onClick={() => navigate(-1)}
                style={{ cursor: "pointer", marginRight: "10px" }}
              ></i>
            )}

          <span>{getTitleForRoute()}</span>
        </Col>
        <Col sm="auto">
          <span>{storage} used</span>
        </Col>
      </Row>
    </Container>
  );
};

export default Header;
