import React, { useState } from "react";
import Button from "react-bootstrap/Button";

const QuerySettings = () => {
  const [activeTab, setActiveTab] = useState("From Archive");
  const [version, setVersion] = useState("2.x");
  const [ipAddress, setIpAddress] = useState("172.16.7.10");
  const [port, setPort] = useState("2299");
  const [storageCommit, setStorageCommit] = useState(true);

  const handleSave = () => {
    const payload = {
      activeTab,
      version,
      ipAddress,
      port,
      storageCommit,
    };

    console.log("Query Settings Saved:", payload);
    // API call here
  };

  const tabs = ["From Archive", "DICOM Modality Worklist", "HL7 Query", "Manually"];

  return (
    <div className="query-settings">
      <div className="query-header">
        <h5>Query Settings</h5>
      </div>

      <div className="query-section">
        <div className="query-tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              className={`query-tab ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="query-divider" />

      <div className="query-section">
        <div className="query-row query-row-grid">
          <div className="query-field">
            <label>Version</label>
            <input
              type="text"
              className="query-input"
              value={version}
              onChange={(e) => setVersion(e.target.value)}
            />
          </div>

          <div className="query-field">
            <label>IP Address</label>
            <input
              type="text"
              className="query-input"
              value={ipAddress}
              onChange={(e) => setIpAddress(e.target.value)}
            />
          </div>

          <div className="query-field">
            <label>Port</label>
            <input
              type="text"
              className="query-input"
              value={port}
              onChange={(e) => setPort(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="query-divider" />

      <div className="query-section">
        <div className="query-row query-row-actions">
          <label className="query-radio">
            <input
              type="radio"
              name="queryStorageCommit"
              checked={storageCommit}
              onChange={() => setStorageCommit(!storageCommit)}
            />
            <span>Enable Storage Commitment</span>
          </label>

          <div className="query-actions">
            <Button variant="outline-light" className="query-outline-btn">
              IP Ping
            </Button>
          </div>
        </div>
      </div>

      <div className="query-save">
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default QuerySettings;
