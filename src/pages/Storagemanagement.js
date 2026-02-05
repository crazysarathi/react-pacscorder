import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Pagination from "react-bootstrap/Pagination";
import CalendarRange from "../components/CalendarRange";
import OnScreenKeyboard from "../components/onScreenKeyboard";
import uploadQueueData from "../data/uploadQueuData.json";

const Storagemanagement = () => {
  const navigate = useNavigate();
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedRange, setSelectedRange] = useState(null);

  const redirectCompletedrecording = () => {
    navigate("/storagemanagement/completedrecording");
  };

  const [data] = useState(uploadQueueData.uploadQueueData);
  const [searchFilter, setSearchFilter] = useState("visitId");
  const searchFilters = [
    { label: "IP Number", value: "visitId" },
    { label: "Consultant", value: "consultant" },
    { label: "Diagnosis", value: "diagnosis" },
    { label: "Surgery", value: "surgery" },
  ];

  const handleFilterChange = (value) => {
    setSearchFilter(value);
    setSearchTerm("");
    setCurrentPage(1);
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [radioValue, setRadioValue] = useState("0");

  const itemsPerPage = 4;
  const normalize = (value) =>
    value === null || value === undefined ? "" : value.toString().toLowerCase();

  const sameDay = (a, b) => a.toDateString() === b.toDateString();

  const startOfWeek = (date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - d.getDay());
    return d;
  };

  const endOfDay = (date) => {
    const d = new Date(date);
    d.setHours(23, 59, 59, 999);
    return d;
  };

  const getRangeFromRadio = () => {
    const today = new Date();
    const todayStart = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );
    const todayEnd = endOfDay(todayStart);

    switch (radioValue) {
      case "0":
        return { start: null, end: null };

      case "1":
        return { start: todayStart, end: todayEnd };

      case "2": {
        const yesterday = new Date(todayStart);
        yesterday.setDate(yesterday.getDate() - 1);
        return { start: yesterday, end: endOfDay(yesterday) };
      }

      case "3": {
        const weekStart = startOfWeek(todayStart);
        return { start: weekStart, end: todayEnd };
      }

      case "4": {
        const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
        return { start: monthStart, end: todayEnd };
      }

      case "5": {
        const lastMonthStart = new Date(
          today.getFullYear(),
          today.getMonth() - 1,
          1,
        );
        const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);
        return { start: lastMonthStart, end: endOfDay(lastMonthEnd) };
      }

      default:
        return { start: null, end: null };
    }
  };

  const getActiveRange = () => {
    if (selectedRange?.startDate && selectedRange?.endDate) {
      const start = new Date(selectedRange.startDate);
      const end = new Date(selectedRange.endDate);
      start.setHours(0, 0, 0, 0);
      return { start, end: endOfDay(end) };
    }
    return getRangeFromRadio();
  };

  const { start: rangeStart, end: rangeEnd } = getActiveRange();

  const filteredData = data.filter((item) => {
    const search = normalize(searchTerm).trim();
    const matchesSearch =
      !search ||
      [
        item.visitId,
        item.ward,
        item.bed,
        item.patientName,
        item.patientCode,
        item.consultant,
        item.consultantCode,
        item.surgery,
        item.diagnosis,
        item.age,
        item.gender,
      ].some((value) => normalize(value).includes(search));

    if (!matchesSearch) return false;

    if (rangeStart && rangeEnd) {
      const visitDate = new Date(item.visitDate);
      if (rangeStart && rangeEnd && !sameDay(rangeStart, rangeEnd)) {
        return visitDate >= rangeStart && visitDate <= rangeEnd;
      }
      return sameDay(visitDate, rangeStart);
    }
    return true;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const radios = [
    { name: "All", value: "0" },
    { name: "Today", value: "1" },
    { name: "Yesterday", value: "2" },
    { name: "This Week", value: "3" },
    { name: "This Month", value: "4" },
    { name: "Last Month", value: "5" },
  ];

  const handleSubmit = (range) => {
    setSelectedRange(range);
    setShowCalendar(false);
  };

  const handleClose = () => {
    setShowCalendar(false);
  };

  const handleRadioChange = (value) => {
    setRadioValue(value);
    setSelectedRange(null);
    setCurrentPage(1);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleSearchFocus = () => {
    setShowKeyboard(true);
  };

  const handleKeyboardClose = () => {
    setShowKeyboard(false);
  };

  const handleKeyboardPress = (key) => {
    if (key === "Clear") {
      setSearchTerm("");
      setCurrentPage(1);
      return;
    }
    if (key === "Back") {
      setSearchTerm((prev) => prev.slice(0, -1));
      setCurrentPage(1);
      return;
    }
    if (key === "Enter") {
      setCurrentPage(1);
      setShowKeyboard(false);
      return;
    }

    setSearchTerm((prev) => `${prev}${key}`);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const paginationItems = Array.from({ length: totalPages }, (_, index) => {
    const pageNumber = index + 1;
    return (
      <Pagination.Item
        key={pageNumber}
        active={pageNumber === currentPage}
        onClick={() => handlePageChange(pageNumber)}
      >
        {pageNumber}
      </Pagination.Item>
    );
  });

  return (
    <Container
      fluid
      className="flex-fill d-flex align-items-stretch flex-column"
    >
      <Row className="mt-3">
        <Col sm="auto" className="">
          <Button
            variant="outline-light"
            className="icobtn me-2"
            onClick={() => setShowCalendar(true)}
          >
            <i className="icon icon-calendar-today"></i>
          </Button>
          <ButtonGroup>
            {radios.map((radio, idx) => (
              <ToggleButton
                key={idx}
                id={`radio-${idx}`}
                type="radio"
                variant={idx % 2 ? "outline-light" : "outline-light"}
                name="radio"
                value={radio.value}
                style={{ borderRadius: "none" }}
                checked={radioValue === radio.value}
                onChange={(e) => handleRadioChange(e.currentTarget.value)}
              >
                {radio.name}
              </ToggleButton>
            ))}
          </ButtonGroup>
        </Col>
        <Col className="searchCont">
          <input
            type="text"
            className="form-control input"
            id=""
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
            onFocus={handleSearchFocus}
          ></input>
          <i className="icon icon-magnify"></i>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col>
          <Container fluid className="customTable">
            <Row className="text-start tblRow tblheader">
              <Col sm="2"> Visit Details </Col>
              <Col sm="4"> Patient Details </Col>
              <Col sm="3"> Consultant </Col>
              <Col sm="3"> Surgery / Diagnosis </Col>
            </Row>
            {paginatedData.length === 0 ? (
              <Row className="noDataRow">
                <Col className="d-flex flex-column align-items-center justify-content-center text-center py-5">
                  <i className="icon icon-database-search mb-2"></i>
                  <div>No data found</div>
                </Col>
              </Row>
            ) : (
              paginatedData.map((item) => (
                <Row
                  key={item.id}
                  onClick={redirectCompletedrecording}
                  className="text-start tblRow"
                >
                  <Col sm="2">
                    <p>{item.visitId}</p>
                    <span>
                      {item.ward} | {item.bed}
                    </span>
                  </Col>

                  <Col sm="4">
                    <p>
                      {item.patientName} | {item.age}Y | {item.gender}
                    </p>
                    <span>{item.patientCode}</span>
                  </Col>

                  <Col sm="3">
                    <p>{item.consultant}</p>
                    <span>{item.consultantCode}</span>
                  </Col>

                  <Col sm="3">
                    <p>{item.surgery}</p>
                    <span>{item.diagnosis}</span>
                  </Col>
                </Row>
              ))
            )}

            {totalPages > 1 && (
              <Row className="mt-3">
                <Col className="d-flex align-items-center justify-content-center">
                  <Pagination size="sm">
                    <Pagination.First onClick={() => handlePageChange(1)} />
                    <Pagination.Prev
                      onClick={() => handlePageChange(currentPage - 1)}
                    />
                    {paginationItems}
                    <Pagination.Next
                      onClick={() => handlePageChange(currentPage + 1)}
                    />
                    <Pagination.Last onClick={() => handlePageChange(totalPages)} />
                  </Pagination>
                </Col>
              </Row>
            )}
          </Container>
        </Col>
      </Row>

      {showCalendar && (
        <CalendarRange onClose={handleClose} onSubmit={handleSubmit} />
      )}
      {showKeyboard && (
        <OnScreenKeyboard
          activeField={searchFilter}
          activeLabel={
            searchFilters.find((f) => f.value === searchFilter)?.label
          }
          value={searchTerm}
          onKeyPress={handleKeyboardPress}
          onClose={handleKeyboardClose}
          showFilterTabs={true}
          onFilterChange={handleFilterChange}
        />
      )}
    </Container>
  );
};

export default Storagemanagement;
