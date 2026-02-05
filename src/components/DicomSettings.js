import React, { useState } from "react";
import Button from "react-bootstrap/Button";

const DicomSettings = () => {
  const [localAeTitle, setLocalAeTitle] = useState("pynetdicom");
  const [localPort, setLocalPort] = useState("11112");
  const [storeTypes, setStoreTypes] = useState(["CX"]);
  const [name, setName] = useState("rasteripacs");
  const [aeTitle, setAeTitle] = useState("TEAMPACS");
  const [ipAddress, setIpAddress] = useState("172.171.200");
  const [port, setPort] = useState("11112");
  const [storageCommit, setStorageCommit] = useState(true);

  const toggleStoreType = (type) => {
    setStoreTypes((prev) =>
      prev.includes(type) ? prev.filter((item) => item !== type) : [...prev, type],
    );
  };

  const handleSave = () => {
    const payload = {
      localAeTitle,
      localPort,
      storeTypes,
      name,
      aeTitle,
      ipAddress,
      port,
      storageCommit,
    };

    console.log("DICOM Settings Saved:", payload);
    // API call here
  };

  const storeOptions = ["CX", "CT", "MR"];

  return (
    <div className="dicom-settings">
      <div className="dicom-header">
        <h5>DICOM Settings</h5>
      </div>

      <div className="dicom-section">
        <div className="dicom-row dicom-row-grid">
          <div className="dicom-field">
            <label>Local AE Title</label>
            <input
              type="text"
              className="dicom-input"
              value={localAeTitle}
              onChange={(e) => setLocalAeTitle(e.target.value)}
            />
          </div>

          <div className="dicom-field">
            <label>Local Port</label>
            <input
              type="text"
              className="dicom-input"
              value={localPort}
              onChange={(e) => setLocalPort(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="dicom-divider" />

      <div className="dicom-section">
        <div className="dicom-row">
          <label className="dicom-label">Store DICOM Image/Video</label>
          <div className="dicom-segment">
            {storeOptions.map((item) => (
              <button
                key={item}
                type="button"
                className={`dicom-segment-btn ${
                  storeTypes.includes(item) ? "active" : ""
                }`}
                onClick={() => toggleStoreType(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="dicom-divider" />

      <div className="dicom-section">
        <div className="dicom-row dicom-row-grid dicom-row-four">
          <div className="dicom-field">
            <label>Name</label>
            <input
              type="text"
              className="dicom-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="dicom-field">
            <label>AE Title</label>
            <input
              type="text"
              className="dicom-input"
              value={aeTitle}
              onChange={(e) => setAeTitle(e.target.value)}
            />
          </div>

          <div className="dicom-field">
            <label>IP Address</label>
            <input
              type="text"
              className="dicom-input"
              value={ipAddress}
              onChange={(e) => setIpAddress(e.target.value)}
            />
          </div>

          <div className="dicom-field">
            <label>Port</label>
            <input
              type="text"
              className="dicom-input"
              value={port}
              onChange={(e) => setPort(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="dicom-divider" />

      <div className="dicom-section">
        <div className="dicom-row dicom-row-actions">
          <label className="dicom-radio">
            <input
              type="radio"
              name="storageCommit"
              checked={storageCommit}
              onChange={() => setStorageCommit(!storageCommit)}
            />
            <span>Enable Storage Commitment</span>
          </label>

          <div className="dicom-actions">
            <Button variant="outline-light" className="dicom-outline-btn">
              Echo
            </Button>
            <Button variant="outline-light" className="dicom-outline-btn">
              DICOM Convert
            </Button>
          </div>
        </div>
      </div>

      <div className="dicom-save">
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default DicomSettings;
