import { useState } from "react";

export default function DobKeyboard({ value, onChange, onClose }) {
  const [mode, setMode] = useState("DOB");
  const [input, setInput] = useState(value || "");

  const dobLayout = [
    ["7", "8", "9", "CLOSE"],
    ["4", "5", "6", "BACK"],
    ["1", "2", "3", "Clear"],
    ["0", "/", "Enter"],
  ];

  const ageLayout = [
    ["7", "8", "9", "CLOSE"],
    ["4", "5", "6", "BACK"],
    ["1", "2", "3", "Clear"],
    ["0", "Enter"],
  ];

const handleClick = (key) => {
  if (key === "CLOSE") return onClose();

  if (key === "Clear") {
    setInput("");
    onChange("");
    return;
  }

  if (key === "BACK") {
    const newInput = input.slice(0, -1);
    setInput(newInput);
    onChange(newInput);
    return;
  }

  if (key === "Enter") {
    if (mode === "DOB") {
      onChange(input); // ✅ final formatted DOB
    } else {
      const age = parseInt(input);
      if (!isNaN(age)) {
        const today = new Date();
        const dob = new Date(
          today.getFullYear() - age,
          today.getMonth(),
          today.getDate()
        );
        const formattedDob = `${String(dob.getDate()).padStart(2, "0")}/${String(
          dob.getMonth() + 1
        ).padStart(2, "0")}/${dob.getFullYear()}`;

        onChange(formattedDob); // ✅ age → DOB
      }
    }
    setInput("");
    onClose();
    return;
  }

  if (mode === "DOB") {
    if (/\d|\//.test(key)) {
      let newInput = input + key;

      if (newInput.length === 2 || newInput.length === 5) {
        newInput += "/";
      }

      newInput = newInput.slice(0, 10);
      setInput(newInput);
      onChange(newInput);
    }
  } else {
    if (/\d/.test(key)) {
      const newInput = input + key;
      setInput(newInput);
      onChange(newInput);
    }
  }
};

   const renderKeyContent = (key) => {
    if (key === "BACK") return <span className="icon icon-backspace" />;
    if (key === "CLOSE") return <span className="icon icon-close" />;
    return key;
  };

  const layout = mode === "DOB" ? dobLayout : ageLayout;

  return (
    <div className="osk-overlay">
      <div className="osk-keyboard dob-keyboard">
        <div>
          <div className="dob-header">
            <div className="dob-tabs">
              <button
                className={`dob-tab ${mode === "DOB" ? "active" : ""}`}
                onClick={() => { setMode("DOB"); setInput(""); }}
              >
                DOB
              </button>
              <button
                className={`dob-tab ${mode === "AGE" ? "active" : ""}`}
                onClick={() => { setMode("AGE"); setInput(""); }}
              >
                Age
              </button>
            </div>

            <input className="dob-input" value={input} readOnly />
          </div>

          {layout.map((row, i) => (
            <div className="dob-row" key={i}>
              {row.map((key) => (
                <button
                  key={key}
                  className={`dob-key
                    ${key === "Enter" ? "enter" : ""}
                    ${key === "CLOSE" ? "close" : ""}
                    ${key === "Clear" ? "clear" : ""}
                    ${key === "BACK" ? "back" : ""}
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
