import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

const Newrecordingfilled = () => {
  const apiBaseUrl = process.env.REACT_APP_API_URL || "";
  const navigate = useNavigate();
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });
  const [isConfirmed, setIsConfirmed] = useState(() => {
    return localStorage.getItem("recordConfirmed") === "true";
  });

  const storedData = localStorage.getItem("newRecordingData");
  const formData = storedData ? JSON.parse(storedData) : null;

  const redirectCompletedrecording = async () => {
    localStorage.removeItem("newRecordingData");
    localStorage.removeItem("recordConfirmed"); // ✅ reset
    navigate("/newrecording/newrecordingfilled/completedrecording");
  };

  // const redirectPrivew = () => {
  //   navigate("/privewpage");
  // };

  const redirectPrivew = () => {
    const patientId = localStorage.getItem("patientId");
    navigate("/privewpage", { state: { patientId } });
  };

  const redirectHome = () => {
    navigate("/");
  };

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type });
    }, 2000);
  };
  if (!formData) {
    navigate("/newrecording");
    return null;
  }

  const handleConfirm = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/pacspro/addpatient/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorText = await response.text(); // 👈 backend error message
        console.error("Server error:", errorText);
        throw new Error("Request failed");
      }

      const responseData = await response.json(); // ✅ get response body

      console.log("API Response:", responseData); // ✅ HERE is what you want

      showToast("Patient record added successfully", "success");
      const patientId = responseData.id?.[0]; // ✅ 0th index

      localStorage.setItem("patientId", patientId); // store it
      localStorage.setItem("recordConfirmed", "true");
      setIsConfirmed(true);
    } catch (err) {
      console.error("Submit error:", err);
      showToast("Error submitting record", "danger");

      localStorage.setItem("recordConfirmed", "true");
      setIsConfirmed(true);
    }
  };

  const redirectEdit = () => {
    navigate("/newrecording");
  };

  return (
    <Container
      fluid
      className="flex-fill d-flex align-items-stretch flex-column"
    >
      <Row>
        <Col className="align-items-stretch">
          <h5 className="mt-3 mb-3"> Patient Details </h5>
        </Col>
      </Row>

      <Row className="my-1">
        <Col sm="6">
          <div className="filledRow">
            <Row>
              <Col sm="auto" className="d-flex">
                {" "}
                <label className="txtlbl"> UHID </label>{" "}
              </Col>
              <Col className="d-flex justify-content-end">
                {" "}
                <label>{formData.uhid}</label>
              </Col>
            </Row>
          </div>
        </Col>

        <Col sm="6">
          <div className="filledRow">
            <Row>
              <Col sm="auto" className="d-flex">
                {" "}
                <label className="txtlbl"> Name </label>{" "}
              </Col>
              <Col className="d-flex justify-content-end">
                {" "}
                <label>{formData.name}</label>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      <Row className="my-1">
        <Col sm="6">
          <div className="filledRow">
            <Row>
              <Col sm="auto" className="d-flex">
                {" "}
                <label className="txtlbl"> Gender </label>{" "}
              </Col>
              <Col className="d-flex justify-content-end">
                {" "}
                <label>
                  {formData.gender === "1"
                    ? "Male"
                    : formData.gender === "2"
                      ? "Female"
                      : formData.gender === "3"
                        ? "Others"
                        : ""}
                </label>
              </Col>
            </Row>
          </div>
        </Col>

        <Col sm="6">
          <div className="filledRow">
            <Row>
              <Col sm="auto" className="d-flex">
                {" "}
                <label className="txtlbl"> DOB/Age </label>{" "}
              </Col>
              <Col className="d-flex justify-content-end">
                {" "}
                <label>{formData.DOB}</label>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      <Row className="my-1">
        <Col sm="6">
          <div className="filledRow">
            <Row>
              <Col sm="auto" className="d-flex">
                {" "}
                <label className="txtlbl"> IP No. </label>{" "}
              </Col>
              <Col className="d-flex justify-content-end">
                {" "}
                <label>{formData.ipno}</label>
              </Col>
            </Row>
          </div>
        </Col>

        <Col sm="6">
          <div className="filledRow">
            <Row>
              <Col sm="auto" className="d-flex">
                {" "}
                <label className="txtlbl"> Room No. </label>{" "}
              </Col>
              <Col className="d-flex justify-content-end">
                {" "}
                <label>{formData.roomno}</label>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      <Row className="my-1">
        <Col sm="6">
          <div className="filledRow">
            <Row>
              <Col sm="auto" className="d-flex">
                {" "}
                <label className="txtlbl"> Bed No. </label>{" "}
              </Col>
              <Col className="d-flex justify-content-end">
                {" "}
                <label>{formData.bedno}</label>
              </Col>
            </Row>
          </div>
        </Col>

        <Col sm="6">
          <div className="filledRow">
            <Row>
              <Col sm="auto" className="d-flex">
                {" "}
                <label className="txtlbl"> Consultant </label>{" "}
              </Col>
              <Col className="d-flex justify-content-end">
                {" "}
                <label>{formData.consultant}</label>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      <Row className="my-1">
        <Col sm="6">
          <div className="filledRow">
            <Row>
              <Col sm="auto" className="d-flex">
                {" "}
                <label className="txtlbl"> Diagnosis </label>{" "}
              </Col>
              <Col className="d-flex justify-content-end">
                {" "}
                <label>{formData.diagnosis}</label>
              </Col>
            </Row>
          </div>
        </Col>

        <Col sm="6">
          <div className="filledRow">
            <Row>
              <Col sm="auto" className="d-flex">
                {" "}
                <label className="txtlbl"> Surgery </label>{" "}
              </Col>
              <Col className="d-flex justify-content-end">
                {" "}
                <label>{formData.surgery}</label>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col className="d-flex align-items-end justify-content-end">
          {!isConfirmed ? (
            <>
              <Button variant="outline-light" onClick={redirectEdit}>
                Edit
              </Button>
              <Button
                variant="primary"
                className="ms-2"
                onClick={handleConfirm}
              >
                Confirm
              </Button>
            </>
          ) : (
            <>
              <Button variant="primary" onClick={redirectPrivew}>
                Preview
              </Button>
              <Button
                onClick={redirectCompletedrecording}
                variant="success"
                className="ms-2"
              >
                Operation Completed
              </Button>
              <Button variant="danger" className="ms-2" onClick={redirectHome}>
                Cancel
              </Button>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Newrecordingfilled;
