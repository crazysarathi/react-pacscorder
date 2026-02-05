import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NetworkSettings from "../components/NetworkSettings";
import TimeSettings from "../components/TimeSettings";
import StorageSettings from "../components/StorageSettings";
import DicomSettings from "../components/DicomSettings";
import QuerySettings from "../components/QuerySettings";
import VideoSettings from "../components/VideoSettings";

const DeviceSettings = () => {
  const [activeTab, setActiveTab] = useState("network");

  const renderContent = () => {
    switch (activeTab) {
      case "network":
        return <NetworkSettings />;
      case "time":
        return <TimeSettings />;
      case "storage":
        return <StorageSettings />;
      case "dicom":
        return <DicomSettings />;
      case "query":
        return <QuerySettings />;
      case "video":
        return <VideoSettings />;
      default:
        return <NetworkSettings />;
    }
  };

  return (
    <Container fluid className="flex-fill" style={{padding:"0px"}}>
      <Row className="h-100">
        {/* LEFT SIDEBAR */}
        <Col sm="3" className="device-sidebar p-0">
          <ul className="device-menu">
            <li
              className={activeTab === "network" ? "active" : ""}
              onClick={() => setActiveTab("network")}
            >
              <i className="icon icon-check-network"></i>
              <span>Network</span>
            </li>

            <li
              className={activeTab === "time" ? "active" : ""}
              onClick={() => setActiveTab("time")}
            >
              <i className="icon icon-clock-time-eight"></i>
              <span>Time</span>
            </li>

            <li
              className={activeTab === "storage" ? "active" : ""}
              onClick={() => setActiveTab("storage")}
            >
              <i className="icon icon-harddisk"></i>
              <span>Storage</span>
            </li>

            <li
              className={activeTab === "dicom" ? "active" : ""}
              onClick={() => setActiveTab("dicom")}
            >
              <i className="icon icon-face-recognition"></i>
              <span>DICOM</span>
            </li>

            <li
              className={activeTab === "query" ? "active" : ""}
              onClick={() => setActiveTab("query")}
            >
              <i className="icon icon-database-search"></i>
              <span>Query</span>
            </li>

            <li
              className={activeTab === "video" ? "active" : ""}
              onClick={() => setActiveTab("video")}
            >
              <i className="icon icon-video"></i>
              <span>Video</span>
            </li>

            <li>
              <i className="icon icon-fan"></i>
              <span>Fan Speed</span>
            </li>
          </ul>
        </Col>

        {/* RIGHT CONTENT */}
        <Col sm="9" className="device-content">
          {renderContent()}
        </Col>
      </Row>
    </Container>
  );
};

export default DeviceSettings;
