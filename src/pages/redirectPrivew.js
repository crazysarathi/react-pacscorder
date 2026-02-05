import React, { useRef } from "react";
import { Button, Image } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

export default function CameraView() {
  const navigate = useNavigate();
  const location = useLocation();

  // Get patientId
  const patientId =
    location.state?.patientId || localStorage.getItem("patientId");

  const imageRef = useRef(null);
  const canvasRef = useRef(null);

  // 🔹 CAPTURE IMAGE (C)
  const handleCapture = () => {
    const img = imageRef.current;
    const canvas = canvasRef.current;

    if (!img || !canvas) return;

    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    const imageBase64 = canvas.toDataURL("image/png");

    console.log("📸 CAPTURE CLICKED");
    console.log("Patient ID:", patientId);
    console.log("Captured Image (base64):", imageBase64);
    console.log("Capture Time:", new Date().toISOString());
  };

  // 🔹 VIDEO RECORD CLICK (V)
  const handleVideoRecord = () => {
    console.log("🎥 VIDEO CLICKED");
    console.log("Patient ID:", patientId);
    console.log("Video Action: RECORD");
    console.log("Click Time:", new Date().toISOString());
  };

  const goBack = () => {
    navigate("/newrecording/newrecordingfilled");
  };

  return (
    <>
      {/* 🔴 LIVE VIDEO STREAM */}
      <Image
        ref={imageRef}
        src="http://172.17.0.81:8000/video"
        alt="Live Camera Stream"
        style={{
          width: "100vw",
          height: "100vh",
          objectFit: "cover",
        }}
      />

      {/* Hidden canvas for capture */}
      <canvas ref={canvasRef} style={{ display: "none" }} />

      {/* 🎮 Controls */}
      <div
        style={{
          position: "fixed",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "12px",
        }}
      >
        <Button variant="warning" onClick={handleCapture}>
          C
        </Button>

        <Button variant="danger" onClick={handleVideoRecord}>
          V
        </Button>

        <Button variant="success" onClick={goBack}>
          Complete
        </Button>
      </div>
    </>
  );
}
