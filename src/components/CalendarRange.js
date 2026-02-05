import { useState } from "react";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const getMonthMatrix = (year, month) => {
  const firstDay = new Date(year, month, 1).getDay();
  const matrix = [];
  let date = 1 - firstDay;

  for (let i = 0; i < 5; i++) {
    const row = [];
    for (let j = 0; j < 7; j++) {
      row.push(new Date(year, month, date));
      date++;
    }
    matrix.push(row);
  }
  return matrix;
};

export default function CalendarRange({ onClose, onSubmit }) {
  const today = new Date();
  const years = Array.from(
    { length: 21 },
    (_, i) => today.getFullYear() - 10 + i,
  );
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [activeTab, setActiveTab] = useState("Today");

  const [left, setLeft] = useState(
    new Date(today.getFullYear(), today.getMonth() - 1, 1),
  );
  const [right, setRight] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const [showYearDropdown, setShowYearDropdown] = useState(null);
  // values: "left" | "right" | null

  const selectDate = (date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else if (date >= startDate) {
      setEndDate(date);
    } else {
      setStartDate(date);
      setEndDate(null);
    }
  };

  const inRange = (date) =>
    startDate && endDate && date > startDate && date < endDate;

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    const now = new Date();

    switch (tab) {
      case "Today":
        setStartDate(now);
        setEndDate(now);
        break;
      case "Yesterday":
        const yesterday = new Date(now);
        yesterday.setDate(yesterday.getDate() - 1);
        setStartDate(yesterday);
        setEndDate(yesterday);
        break;
      case "This Week":
        const weekStart = new Date(now);
        weekStart.setDate(weekStart.getDate() - weekStart.getDay());
        setStartDate(weekStart);
        setEndDate(now);
        break;
      case "This Month":
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        setStartDate(monthStart);
        setEndDate(now);
        break;
      case "Last Month":
        const lastMonthStart = new Date(
          now.getFullYear(),
          now.getMonth() - 1,
          1,
        );
        const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
        setStartDate(lastMonthStart);
        setEndDate(lastMonthEnd);
        break;
      default:
        break;
    }
  };

  const changeMonth = (current, direction, setter, isLeft) => {
    const newDate = new Date(
      current.getFullYear(),
      current.getMonth() + direction,
      1,
    );
    setter(newDate);

    if (isLeft) {
      setRight(new Date(newDate.getFullYear(), newDate.getMonth() + 1, 1));
    }
  };

  const changeYear = (current, year, setter, isLeft) => {
    const newDate = new Date(year, current.getMonth(), 1);
    setter(newDate);

    if (isLeft) {
      setRight(new Date(newDate.getFullYear(), newDate.getMonth() + 1, 1));
    }
  };

  const renderCalendar = (current, isLeft) => {
    const matrix = getMonthMatrix(current.getFullYear(), current.getMonth());

    return (
      <div style={styles.calBox}>
        <div style={styles.calHeader}>
          <div style={styles.yearWrapper}>
            <div
              style={styles.yearButton}
              onClick={() => {
                const key = isLeft ? "left" : "right";
                setShowYearDropdown((prev) => (prev === key ? null : key));
              }}
            >
              {current.getFullYear()} <span className="icon icon-menu-down"></span>
            </div>

            {showYearDropdown === (isLeft ? "left" : "right") && (
              <div style={styles.yearDropdown}>
                {years.map((year) => (
                  <div
                    key={year}
                    style={{
                      ...styles.yearOption,
                      ...(year === current.getFullYear() &&
                        styles.yearOptionActive),
                    }}
                    onClick={() => {
                      changeYear(
                        current,
                        year,
                        isLeft ? setLeft : setRight,
                        isLeft,
                      );
                      setShowYearDropdown(null);
                    }}
                  >
                    {year}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={styles.monthNav}>
            <span
              style={styles.navBtn}
              onClick={() =>
                changeMonth(current, -1, isLeft ? setLeft : setRight, isLeft)
              }
            >
              ‹
            </span>
            <strong style={styles.monthName}>
              {current.toLocaleString("default", { month: "long" })}
            </strong>
            <span
              style={styles.navBtn}
              onClick={() =>
                changeMonth(current, 1, isLeft ? setLeft : setRight, isLeft)
              }
            >
              ›
            </span>
          </div>
        </div>

        <div style={styles.calDays}>
          {days.map((d) => (
            <div key={d} style={styles.dayHeader}>
              {d}
            </div>
          ))}
        </div>

        {matrix.map((row, i) => (
          <div style={styles.calRow} key={i}>
            {row.map((date, j) => {
              const muted = date.getMonth() !== current.getMonth();
              const isStart = date.toDateString() === startDate?.toDateString();
              const isEnd = date.toDateString() === endDate?.toDateString();
              const selected = isStart || isEnd;
              const isSingle = isStart && isEnd;

              return (
                <div
                  key={j}
                  style={{
                    ...styles.calDate,
                    ...(muted && styles.dateMuted),
                    ...(inRange(date) && styles.dateRange),
                    ...(isStart && !isSingle && styles.dateRangeStart),
                    ...(isEnd && !isSingle && styles.dateRangeEnd),
                    ...(isSingle && styles.dateSelected),
                    ...(selected && !isSingle && styles.dateRangeCap),
                  }}
                  onClick={() => !muted && selectDate(date)}
                >
                  {date.getDate()}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.container} onClick={(e) => e.stopPropagation()}>
        <div style={styles.top}>
          <div style={styles.tabsGroup}>
            {[
              "Today",
              "Yesterday",
              "This Week",
              "This Month",
              "Last Month",
              "Custom Range",
            ].map((tab, idx) => (
              <button
                key={tab}
                style={{
                  ...styles.tab,
                  ...(idx === 0 && styles.tabFirst),
                  ...(idx === 4 && styles.tabFifth),
                  ...(idx === 5 && styles.tabLast),
                  ...(activeTab === tab && styles.tabActive),
                }}
                onClick={() => handleTabClick(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <button
            style={styles.submitBtn}
            onClick={() => onSubmit({ startDate, endDate })}
          >
            Submit
          </button>
        </div>

        <div style={styles.body}>
          {renderCalendar(left, true)}
          {renderCalendar(right, false)}
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background:
      "radial-gradient(circle, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.9))",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  container: {
    background: "linear-gradient(180deg, #0a2847 0%, #030b1a 100%)",
    padding: "16px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    color: "#ffffff",
  },
  top: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
    marginBottom: "16px",
    justifyContent: "space-between",
  },
  tabsGroup: {
    display: "flex",
    gap: "0",
    flex: 1,
  },
  tab: {
    background: "transparent",
    border: "1px solid rgba(255, 255, 255, 0.89)",
    borderRight: "1px",
    color: "#ffffff",
    padding: "10px 16px",
    fontSize: "13px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s ease",
    whiteSpace: "nowrap",
  },
  tabFifth: {
    borderRight: "1px solid rgba(255, 255, 255, 0.2)",
  },
  tabLast: {
    borderRight: "1px solid rgba(255, 255, 255, 0.2)",
  },
  tabActive: {
    background: "#0066ff",
    borderColor: "#0066ff",
    color: "#ffffff",
  },
  submitBtn: {
    background: "#0066ff",
    border: "none",
    color: "#ffffff",
    padding: "10px 32px",
    fontSize: "14px",
    fontWeight: "600",
    borderRadius: "4px",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  body: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "24px",
  },
  calBox: {
    color: "#ffffff",
    background: "rgba(255, 255, 255, 0.08)",
    overflow: "hidden",
  },
  calHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "5px",
  },
  yearSelector: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  yearSelect: {
    background: "transparent",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    color: "#ffffff",
    fontSize: "15px",
    fontWeight: "600",
    padding: "4px 8px",
    borderRadius: "4px",
    cursor: "pointer",
  },
  monthNav: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  monthName: {
    fontSize: "15px",
    fontWeight: "600",
    minWidth: "90px",
    textAlign: "center",
  },
  navBtn: {
    cursor: "pointer",
    fontSize: "24px",
    lineHeight: 1,
    width: "28px",
    height: "28px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    userSelect: "none",
  },
  calDays: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: "0",
    marginBottom: "0",
  },
  dayHeader: {
    textAlign: "center",
    fontSize: "12px",
    fontWeight: "500",
    padding: "8px 0",
    border: "1px solid rgba(0, 0, 0, 0.35)",
    color: "#ffffff",
  },
  calRow: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: "0",
  },
  calDate: {
    aspectRatio: "1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "500",
    transition: "all 0.15s ease",
    border: "1px solid rgba(0, 0, 0, 0.35)",
  },
  dateMuted: {
    color: "#ffffff5b",
    cursor: "default",
  },
  dateRange: {
    background: "rgba(0, 102, 255, 0.55)",
    color: "#ffffff",
  },
  dateRangeStart: {
    background:
      "linear-gradient(90deg, rgba(10, 16, 26, 0.75) 0%, rgba(0, 102, 255, 0.55) 60%)",
  },
  dateRangeEnd: {
    background:
      "linear-gradient(90deg, rgba(0, 102, 255, 0.55) 40%, rgba(10, 16, 26, 0.75) 100%)",
  },
  dateRangeCap: {
    background: "#0d6efd",
    color: "#ffffff",
    borderRadius: "50%",
    borderColor: "transparent",
  },
  dateSelected: {
    background: "#0d6efd",
    color: "#ffffff",
    borderRadius: "50%",
    borderColor: "transparent",
    fontWeight: "600",
  },
  yearWrapper: {
    position: "relative",
  },

  yearButton: {
    color: "#ffffff",
    padding: "6px 12px",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    userSelect: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    lineHeight: 1,
  },

  yearDropdown: {
    position: "absolute",
    top: "110%",
    left: 0,
    width: "100%",
    maxHeight: "180px",
    overflowY: "auto",
    background: "#081a2f",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    borderRadius: "6px",
    zIndex: 100,
    boxShadow: "0 8px 20px rgba(0,0,0,0.6)",
  },

  yearOption: {
    padding: "8px 12px",
    fontSize: "13px",
    cursor: "pointer",
    transition: "background 0.2s",
  },

  yearOptionActive: {
    background: "#0066ff",
    fontWeight: "600",
  },
};
