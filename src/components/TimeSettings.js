import React, { useState } from "react";
import Button from "react-bootstrap/Button";

const TimeSettings = () => {
  const [autoDateTime, setAutoDateTime] = useState(true);
  const [dateTime, setDateTime] = useState("2025-01-17T17:45");
  const [use24Hour, setUse24Hour] = useState(true);
  const [showOnLock, setShowOnLock] = useState(true);
  const [autoTimeZone, setAutoTimeZone] = useState(true);

  const handleSave = () => {
    const payload = {
      autoDateTime,
      dateTime,
      use24Hour,
      showOnLock,
      autoTimeZone,
      timeZone: "GMT +05:30 India Standard Time",
    };

    console.log("Time Settings Saved:", payload);
    // API call here if needed
  };

  return (
    <div className="time-settings">
      <div className="time-header">
        <h5>Time Settings</h5>
      </div>

      <div className="time-section">
        <div className="time-row">
          <label className="time-radio">
            <input
              type="radio"
              name="dateTimeMode"
              checked={autoDateTime}
              onChange={() => setAutoDateTime(true)}
            />
            <span>Set Date / Time automatically</span>
          </label>

          <div className="time-input-wrap">
            <input
              type="datetime-local"
              className="time-input"
              value={dateTime}
              disabled={autoDateTime}
              onChange={(e) => setDateTime(e.target.value)}
            />
            <span className="time-input-icon">
              <i className="icon icon-calendar-today"></i>
            </span>
          </div>
        </div>
      </div>

      <div className="time-divider" />

      <div className="time-section">
        <div className="time-row time-row-inline">
          <label className="time-radio">
            <input
              type="radio"
              name="hourFormat"
              checked={use24Hour}
              onChange={() => setUse24Hour(true)}
            />
            <span>Use 24 Hour Format</span>
          </label>

          <label className="time-radio">
            <input
              type="radio"
              name="lockFormat"
              checked={showOnLock}
              onChange={() => setShowOnLock(!showOnLock)}
            />
            <span>Show 24 hour format on lock screen</span>
          </label>
        </div>
      </div>

      <div className="time-divider" />

      <div className="time-section">
        <div className="time-row">
          <label className="time-radio">
            <input
              type="radio"
              name="timeZoneMode"
              checked={autoTimeZone}
              onChange={() => setAutoTimeZone(true)}
            />
            <span>Set time zone automatically using current location</span>
          </label>
        </div>

        <div className="time-row">
          <input
            type="text"
            className="time-input time-input-wide"
            value="GMT +05:30 India Standard Time"
            disabled
          />
        </div>
      </div>

      <div className="time-actions">
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default TimeSettings;
