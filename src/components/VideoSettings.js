import React, { useState } from "react";
import Button from "react-bootstrap/Button";

const VideoSettings = () => {
  const options = [
    "1080p23.98",
    "1080p24",
    "1080p25",
    "1080p29.97",
    "1080p30",
    "1080p50",
    "1080p59.94",
    "1080p60",
  ];

  const [selected, setSelected] = useState("1080p30");

  const handleSave = () => {
    const payload = { selected };
    console.log("Video Settings Saved:", payload);
    // API call here
  };

  return (
    <div className="video-settings">
      <div className="video-header">
        <h5>Video Settings</h5>
      </div>

      <div className="video-grid">
        {options.map((item) => (
          <button
            key={item}
            type="button"
            className={`video-tile ${selected === item ? "active" : ""}`}
            onClick={() => setSelected(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="video-actions">
        <Button variant="outline-light" className="video-outline-btn">
          Video Preview
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default VideoSettings;
