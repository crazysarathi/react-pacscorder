import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const Dashboard = () => {

  const navigate = useNavigate();

  const redirectNewRecording = () => { navigate("/newrecording") };
  const redirectUploadQueue = () => { navigate("/uploadqueue") };
  const redirectStorageMngmnt = () => { navigate("/storagemanagement") };
  const redirectDeviceSettings = () => { navigate("/devicesettings") };

  return (
      <Container fluid className='flex-fill d-flex align-items-stretch flex-column'>
        <Row className='flex-fill'>
          <Col className='pt-3 pb-2 d-flex align-items-stretch'>
            <Row className='ps-3 pe-2 flex-fill'>
              <Col onClick={redirectNewRecording} className='dashCont Tleft d-flex flex-fill align-items-stretch' tabIndex={1}>

                <Row className='d-flex flex-fill align-items-end'>
                  <Col className='d-flex align-items-start flex-column'>
                    <span class="icon icon-video-plus iconShade"></span>
                    <h5> New Recording </h5>
                    <p> Record new operation video </p>
                  </Col>
                  <Col sm="auto">
                    <div class="dashContIcon justify-content-center d-flex flex-fill flex-row align-items-center">
                      <span class="icon icon-video-plus"></span>
                    </div>
                  </Col>
                </Row>

              </Col>
            </Row>
          </Col>
          <Col className='pt-3 pb-2 d-flex align-items-stretch'>
            <Row className='ps-2 pe-3 flex-fill'>
              <Col onClick={redirectUploadQueue} className='dashCont Tright d-flex flex-fill align-items-stretch' tabIndex={2}>

                <Row className='d-flex flex-fill align-items-end'>
                  <Col className='uploadPendng d-flex align-items-start flex-column'>
                    <span> Pending Uploads </span>
                    <p> <i class="icon icon-video"></i> 03 (1.3 GB) <i class="icon icon-image ms-2"></i> 23 (283 MB) </p>
                  </Col>
                  <Col sm="auto">
                    <div class="dashContIcon justify-content-center d-flex flex-fill flex-row align-items-center">
                      <span class="icon icon-upload-multiple"></span>
                    </div>
                  </Col>
                  <Col className='d-flex align-items-end flex-column'>
                    <span class="icon icon-upload-multiple iconShade"></span>
                    <h5> Upload Queue </h5>
                    <p> Upload videos and Images to Server </p>
                  </Col>
                </Row>

              </Col>
            </Row>
          </Col>
        </Row>
        <Row className='flex-fill'>
          <Col className='pt-2 pb-3 d-flex align-items-stretch'>
            <Row className=' ps-3 pe-2 flex-fill'>
              <Col onClick={redirectStorageMngmnt} className='dashCont Bleft d-flex flex-fill align-items-stretch' tabIndex={3}>

                <Row className='d-flex flex-fill align-items-start'>
                  <Col className='d-flex align-items-start flex-column'>
                    <h5> Storage Management </h5>
                    <p> Remove / Archive Files </p>
                    <span class="icon icon-harddisk iconShade"></span>
                  </Col>
                  <Col sm="auto">
                    <div class="dashContIcon justify-content-center d-flex flex-fill flex-row align-items-center">
                      <span class="icon icon-harddisk"></span>
                    </div>
                  </Col>
                </Row>

              </Col>
            </Row>
          </Col>
          <Col className='pt-2 pb-3 d-flex align-items-stretch'>
            <Row className=' ps-2 pe-3 flex-fill'>
              <Col onClick={redirectDeviceSettings} className='dashCont Bright d-flex flex-fill align-items-stretch' tabIndex={4}>

                <Row className='d-flex flex-fill align-items-start'>
                  <Col sm="auto">
                    <div class="dashContIcon justify-content-center d-flex flex-fill flex-row align-items-center">
                      <span class="icon icon-cogs"></span>
                    </div>
                  </Col>
                  <Col className='d-flex align-items-end flex-column'>
                    <h5> Device Settings </h5>
                    <p> Manage Device Preferences </p>
                    <span class="icon icon-cogs iconShade"></span>
                  </Col>
                </Row>

              </Col>
            </Row>
          </Col>
        </Row>
      </Container>

  );
}

export default Dashboard;
