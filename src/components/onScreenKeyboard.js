import { useState } from "react";

export default function OnScreenKeyboard({
  onKeyPress,
  onClose,
  activeField,
  activeLabel,
  value,
  showFilterTabs = false,
  onFilterChange, // ✅ ADD
}) {
  const [shift, setShift] = useState(false);
  const [caps, setCaps] = useState(false);
  const [keyboardMode, setKeyboardMode] = useState("abc"); // abc | num

  /* ---------- ABC KEYBOARD ---------- */
  const abcLayout = [
    ["CLOSE", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "BACK"],
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "Shift"],
    [".", "a", "s", "d", "f", "g", "h", "j", "k", "l", "Caps"],
    ["Clear", "123", "z", "x", "c", "v", "b", "n", "m", ",", "Enter"],
  ];

  /* ---------- NUMBER KEYPAD ---------- */
  const numberLayout = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["ABC", "0", "Enter"],
    ["CLOSE", "BACK"],
  ];

  const layout = keyboardMode === "abc" ? abcLayout : numberLayout;

  const transformKey = (k) => {
    if (k.length === 1 && /[a-z]/i.test(k)) {
      const upper = (caps && !shift) || (!caps && shift);
      return upper ? k.toUpperCase() : k.toLowerCase();
    }
    return k;
  };

  const handleClick = (key) => {
    if (key === "CLOSE") return onClose();
    if (key === "Shift") return setShift(!shift);
    if (key === "Caps") return setCaps(!caps);
    if (key === "Clear") return onKeyPress("Clear");
    if (key === "BACK") return onKeyPress("Back");
    if (key === "Enter") return onKeyPress("Enter");

    if (key === "123") return setKeyboardMode("num");
    if (key === "ABC") return setKeyboardMode("abc");

    onKeyPress(transformKey(key));
    if (shift) setShift(false);
  };

  const renderKeyContent = (key) => {
    if (key === "CLOSE") return <span className="icon icon-close" />;
    if (key === "BACK") return <span className="icon icon-backspace" />;
    return transformKey(key);
  };

  return (
    <div className="osk-overlay">
      <div
        className={`osk-keyboard ${keyboardMode === "num" ? "osk-number" : "osk-abc"}`}
      >
        <div className="osk-num">
          <div className="osk-input-wrapper ">
            {showFilterTabs ? (
              <div className="osk-filter-tabs">
                {[
                  { label: "IP Number", value: "visitId" },
                  { label: "Consultant", value: "consultant" },
                  { label: "Diagnosis", value: "diagnosis" },
                  { label: "Surgery", value: "surgery" },
                ].map(({ label, value }) => (
                  <button
                    key={value}
                    className={`osk-filter-btn ${
                      activeField === value ? "active" : ""
                    }`}
                    onClick={() => onFilterChange(value)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            ) : (
              <label className="osk-input-label">
                {activeField.charAt(0).toUpperCase() + activeField.slice(1)}
              </label>
            )}

            <input
              type="text"
              className="osk-input-field"
              value={value || ""}
              readOnly
            />
          </div>

          {layout.map((row, i) => (
            <div
              className={`osk-row ${
                keyboardMode === "num" ? "osk-num-row" : "osk-abc"
              }`}
              key={i}
            >
              {row.map((key) => (
                <button
                  key={key}
                  className={`osk-key
                  ${key === "CLOSE" ? "osk-close" : ""}
                  ${key === "BACK" ? "osk-back" : ""}
                  ${key === "Enter" ? "osk-enter" : ""}
                  ${
                    (key === "Shift" && shift) || (key === "Caps" && caps)
                      ? "osk-active"
                      : ""
                  }
                `}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => handleClick(key)}
                >
                  {renderKeyContent(key)}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
