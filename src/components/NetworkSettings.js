import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const NetworkSettings = () => {
  return (
    <>
      <h5 className="mb-3">Network Settings</h5>

      <div className="mb-3">
        <label className="d-flex align-items-center gap-2">
          <input type="radio" name="ipMode" />
          Get IP address automatically
        </label>
      </div>

      <div className="mb-4">
        <label className="d-flex align-items-center gap-2">
          <input type="radio" name="ipMode" defaultChecked />
          Set IP address manually
        </label>
      </div>

      <Row className="mb-3">
        <Col sm="6">
          <label>IP Address</label>
          <input
            className="form-control input"
            defaultValue="172.17.1.57"
          />
        </Col>
        <Col sm="6">
          <label>Subnet</label>
          <input
            className="form-control input"
            defaultValue="255.255.254.0"
          />
        </Col>
      </Row>

      <Row className="mb-4">
        <Col sm="6">
          <label>Gateway</label>
          <input
            className="form-control input"
            defaultValue="172.17.1.254"
          />
        </Col>
        <Col sm="6">
          <label>DNS</label>
          <input
            className="form-control input"
            defaultValue="172.17.1.254"
          />
        </Col>
      </Row>

      <Button variant="primary">Save</Button>
    </>
  );
};

export default NetworkSettings;
