import React, { useState } from "react";
import Button from "react-bootstrap/Button";

const StorageSettings = () => {
  const [manageMode, setManageMode] = useState("pacs");
  const [duration, setDuration] = useState(30);
  const [unit, setUnit] = useState("Days");

  const handleSave = () => {
    const payload = {
      manageMode,
      duration,
      unit,
    };

    console.log("Storage Settings Saved:", payload);
    // API call here
  };

  const unitOptions = ["Days", "Month", "Year"];

  return (
    <div className="storage-settings">
      <div className="storage-header">
        <h5>Storage Settings</h5>
      </div>

      <div className="storage-section">
        <div className="storage-row">
          <label className="storage-radio">
            <input
              type="radio"
              name="storageMode"
              checked={manageMode === "manual"}
              onChange={() => setManageMode("manual")}
            />
            <span>Manually manage storage</span>
          </label>
        </div>
      </div>

      <div className="storage-divider" />

      <div className="storage-section">
        <div className="storage-row">
          <label className="storage-radio">
            <input
              type="radio"
              name="storageMode"
              checked={manageMode === "auto"}
              onChange={() => setManageMode("auto")}
            />
            <span>Automatically free space older than</span>
          </label>

          <div className="storage-controls">
            <input
              type="number"
              className="storage-input"
              value={duration}
              disabled={manageMode !== "auto"}
              onChange={(e) => setDuration(e.target.value)}
            />

            <div className="storage-segment">
              {unitOptions.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={`storage-segment-btn ${
                    unit === item ? "active" : ""
                  }`}
                  disabled={manageMode !== "auto"}
                  onClick={() => setUnit(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="storage-divider" />

      <div className="storage-section">
        <div className="storage-row">
          <label className="storage-radio">
            <input
              type="radio"
              name="storageMode"
              checked={manageMode === "pacs"}
              onChange={() => setManageMode("pacs")}
            />
            <span>Delete After sending to PACS older than</span>
          </label>

          <div className="storage-controls">
            <input
              type="number"
              className="storage-input"
              value={duration}
              disabled={manageMode !== "pacs"}
              onChange={(e) => setDuration(e.target.value)}
            />

            <div className="storage-segment">
              {unitOptions.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={`storage-segment-btn ${
                    unit === item ? "active" : ""
                  }`}
                  disabled={manageMode !== "pacs"}
                  onClick={() => setUnit(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="storage-actions">
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default StorageSettings;
