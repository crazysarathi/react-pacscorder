import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import OnScreenKeyboard from "../components/onScreenKeyboard";
import DobKeyboard from "../components/DobKeyboard";

const Newrecording = () => {
  const navigate = useNavigate();
  const storedData = localStorage.getItem("newRecordingData");
  const [radioValue, setRadioValue] = useState(
    storedData ? JSON.parse(storedData).gender || "" : "",
  );
  const [errors, setErrors] = useState({});

  const [showKeyboard, setShowKeyboard] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [keyboardType, setKeyboardType] = useState(null);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const [formData, setFormData] = useState(
    storedData
      ? JSON.parse(storedData)
      : {
          uhid: "",
          name: "",
          gender: "",
          DOB: "",
          ipno: "",
          roomno: "",
          bedno: "",
          consultant: "",
          diagnosis: "",
          surgery: "",
        },
  );

  const radios = [
    { name: "Male", value: "1" },
    { name: "Female", value: "2" },
    { name: "Others", value: "3" },
  ];
  const handleReset = () => {
    localStorage.removeItem("newRecordingData");

    setFormData({
      uhid: "",
      name: "",
      gender: "",
      DOB: "",
      ipno: "",
      roomno: "",
      bedno: "",
      consultant: "",
      diagnosis: "",
      surgery: "",
    });

    setRadioValue("");
  };
  const handleFocus = (field) => {
    setActiveField(field);

    if (field === "DOB") {
      setKeyboardType("dob");
    } else {
      setKeyboardType("text");
    }

    setShowKeyboard(true);
  };

  const handleKeyPress = (key) => {
    if (!activeField) return;

    if (key === "Clear") {
      setFormData({ ...formData, [activeField]: "" });
      return;
    }

    if (key === "Back") {
      setFormData({
        ...formData,
        [activeField]: formData[activeField].slice(0, -1),
      });
      return;
    }

    if (key === "Enter") {
      handleCloseKeyboard();
      return;
    }

    setFormData({
      ...formData,
      [activeField]: (formData[activeField] || "") + key,
    });
  };

  const handleCloseKeyboard = () => {
    setShowKeyboard(false);
    setActiveField(null);
  };


  const redirectnewrecordingfilled = () => {
    if (!validateForm()) {
      showToast("Please fill all required fields", "danger");
      return;
    }

    localStorage.setItem("newRecordingData", JSON.stringify(formData));
    navigate("/newrecording/newrecordingfilled");
  };

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type });
    }, 2000);
  };
  const handleUhidSearch = async () => {
    if (!formData.uhid.trim()) {
      showToast("Please enter UHID", "warning");
      return;
    }

    try {
      const apiBaseUrl = process.env.REACT_APP_API_URL || "";
      const res = await fetch(
        `${apiBaseUrl}/api/patient/${formData.uhid}`,
      );

      if (!res.ok) throw new Error("Not found");

      const data = await res.json();

      setFormData({
        ...formData,
        name: data.name || "",
        gender: data.gender || "",
        DOB: data.DOB || "",
        ipno: data.ipno || "",
        roomno: data.roomno || "",
        bedno: data.bedno || "",
        consultant: data.consultant || "",
        diagnosis: data.diagnosis || "",
        surgery: data.surgery || "",
      });

      setRadioValue(data.gender);
      showToast("Patient data loaded", "success");
    } catch (err) {
      showToast("Patient data not found", "danger");
    }
  };

  const handleDobChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      DOB: value,
    }));
  };

  const requiredFields = [
    "uhid",
   
  ];
  const validateForm = () => {
    let newErrors = {};

    requiredFields.forEach((field) => {
      if (!formData[field] || !formData[field].toString().trim()) {
        newErrors[field] = true;
      }
    });

    if (!radioValue) {
      newErrors.gender = true;
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (!Object.keys(errors).length) return;

    let clearedErrors = { ...errors };

    Object.keys(errors).forEach((field) => {
      if (formData[field] && formData[field].toString().trim() !== "") {
        delete clearedErrors[field];
      }
    });

    if (radioValue) {
      delete clearedErrors.gender;
    }

    setErrors(clearedErrors);
  }, [formData, radioValue]);

  return (
    <Container
      fluid
      className="flex-fill d-flex align-items-stretch flex-column"
    >
      <Row>
        <Col className="align-items-stretch">
          <h5 className="mt-3 mb-2"> Patient Details </h5>
        </Col>
      </Row>

      <Row className="my-1">
        <Col sm="4">
          <Row>
            <Col>
              {" "}
              <label className="form-label w-100">
                UHID <span className="text-danger">*</span>
              </label>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex flex-row">
              <input
                type="text"
                className={`form-control input me-2 ${
                  errors.uhid ? "border border-danger" : ""
                }`}
                placeholder="UHID"
                value={formData.uhid}
                onFocus={() => handleFocus("uhid")}
                onChange={(e) =>
                  setFormData({ ...formData, uhid: e.target.value })
                }
              />

              <Button
                variant="outline-light"
                className="icobtn"
                onClick={handleUhidSearch}
              >
                <i className="icon icon-magnify"></i>
              </Button>
            </Col>
          </Row>
        </Col>

        <Col sm="4">
          <Row>
            <Col>
              <label className="form-label w-100">
                {" "}
                Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={`form-control input me-2 ${
                  errors.name ? "border border-danger" : ""
                }`}
                id=""
                placeholder="Patient Name"
                value={formData.name}
                onFocus={() => handleFocus("name")}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              ></input>
            </Col>
          </Row>
        </Col>

        <Col sm="4">
          <Row>
            <Col className="text-start">
              <label className="form-label w-100">
                {" "}
                Gender <span className="text-danger">*</span>
              </label>
              <ButtonGroup
                className={errors.gender ? "border border-danger rounded" : ""}
              >
                {radios.map((radio, idx) => (
                  <ToggleButton
                    key={idx}
                    id={`radio-${idx}`}
                    type="radio"
                    variant={idx % 2 ? "outline-light" : "outline-light"}
                    name="radio"
                    value={radio.value}
                    checked={radioValue === radio.value}
                    onChange={(e) => {
                      setRadioValue(e.currentTarget.value);
                      setFormData({
                        ...formData,
                        gender: e.currentTarget.value,
                      });
                    }}
                  >
                    {radio.name}
                  </ToggleButton>
                ))}
              </ButtonGroup>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row className="my-1">
        <Col sm="4">
          <Row>
            <Col>
              <label className="form-label w-100">
                {" "}
                DOB/Age <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={`form-control input me-2 ${
                  errors.DOB ? "border border-danger" : ""
                }`}
                id=""
                placeholder="DOB/Age"
                value={formData.DOB}
                onFocus={() => handleFocus("DOB")}
                onChange={(e) =>
                  setFormData({ ...formData, DOB: e.target.value })
                }
              ></input>
            </Col>
          </Row>
        </Col>

        <Col sm="4">
          <Row>
            <Col>
              <label className="form-label w-100">
                {" "}
                IP No. <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={`form-control input me-2 ${
                  errors.ipno ? "border border-danger" : ""
                }`}
                id=""
                placeholder="IP No."
                value={formData.ipno}
                onFocus={() => handleFocus("ipno")}
                onChange={(e) =>
                  setFormData({ ...formData, ipno: e.target.value })
                }
              ></input>
            </Col>
          </Row>
        </Col>

        <Col sm="4">
          <Row>
            <Col>
              <label className="form-label w-100"> Room No. </label>
              <input
                type="text"
                class="form-control input me-2"
                id=""
                placeholder="Room No."
                value={formData.roomno}
                onFocus={() => handleFocus("roomno")}
                onChange={(e) =>
                  setFormData({ ...formData, roomno: e.target.value })
                }
              ></input>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row className="my-1">
        <Col sm="4">
          <Row>
            <Col>
              <label className="form-label w-100"> Bed No. </label>
              <input
                type="text"
                class="form-control input me-2"
                id=""
                placeholder="Bed No."
                value={formData.bedno}
                onFocus={() => handleFocus("bedno")}
                onChange={(e) =>
                  setFormData({ ...formData, bedno: e.target.value })
                }
              ></input>
            </Col>
          </Row>
        </Col>

        <Col sm="4">
          <Row>
            <Col>
              <label className="form-label w-100">
                {" "}
                Consultant <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={`form-control input me-2 ${
                  errors.consultant ? "border border-danger" : ""
                }`}
                id=""
                placeholder="Consultant"
                value={formData.consultant}
                onFocus={() => handleFocus("consultant")}
                onChange={(e) =>
                  setFormData({ ...formData, consultant: e.target.value })
                }
              ></input>
            </Col>
          </Row>
        </Col>

        <Col sm="4">
          <Row>
            <Col>
              <label className="form-label w-100">
                {" "}
                Diagnosis <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={`form-control input me-2 ${
                  errors.diagnosis ? "border border-danger" : ""
                }`}
                id=""
                placeholder="Diagnosis"
                value={formData.diagnosis}
                onFocus={() => handleFocus("diagnosis")}
                onChange={(e) =>
                  setFormData({ ...formData, diagnosis: e.target.value })
                }
              ></input>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row className="my-1">
        <Col sm="8">
          <Row>
            <Col>
              <label className="form-label w-100">
                {" "}
                Surgery <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={`form-control input me-2 ${
                  errors.surgery ? "border border-danger" : ""
                }`}
                id=""
                placeholder="Surgery"
                value={formData.surgery}
                onFocus={() => handleFocus("surgery")}
                onChange={(e) =>
                  setFormData({ ...formData, surgery: e.target.value })
                }
              ></input>
            </Col>
          </Row>
        </Col>

        <Col sm="4" className="d-flex align-items-end justify-content-end">
          <Row>
            <Col>
              <Button variant="outline-light" onClick={handleReset}>
                Reset
              </Button>
              <Button
                onClick={redirectnewrecordingfilled}
                variant="primary"
                className="ms-2"
              >
                {" "}
                Next{" "}
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      {showKeyboard && keyboardType === "text" && (
        <OnScreenKeyboard
          activeField={activeField}
          value={formData[activeField]}
          onKeyPress={handleKeyPress}
          onClose={handleCloseKeyboard}
        />
      )}

      {showKeyboard && keyboardType === "dob" && (
        <DobKeyboard
          value={formData.DOB}
          onChange={handleDobChange}
          onClose={handleCloseKeyboard}
        />
      )}
      {toast.show && (
        <div
          className="position-fixed top-0 start-50 translate-middle-x mt-2"
          style={{ zIndex: 1055 }}
        >
          <div className={`toast show text-bg-${toast.type}`}>
            <div className="toast-body text-center fw-semibold px-4 py-2">
              {toast.message}
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default Newrecording;
