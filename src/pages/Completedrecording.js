import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Image from "react-bootstrap/Image";
import Thumb1 from "../images/thumb1.png";
import Thumb2 from "../images/thumb2.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SampleVideo from "../videos/sample.mp4";
import SampleVideo1 from "../videos/sample1.mp4";
import { Modal } from "react-bootstrap";

const Completedrecording = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [type, setType] = useState(""); 
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const recordedVideos = [SampleVideo, SampleVideo1,SampleVideo, SampleVideo1,SampleVideo, SampleVideo1,SampleVideo, SampleVideo1]; 
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const capturedImages = [
    Thumb1,
    Thumb2,
    Thumb1,
    Thumb2,
    Thumb1,
    Thumb2,
    Thumb2,
  ];

  const openVideo = (index) => {
    setType("video");
    setCurrentVideoIndex(index);
    setIsVideoOpen(true);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setIsVideoOpen(false);
  };

  const openImage = (index) => {
    setType("image");
    setCurrentIndex(index);
    setShow(true);
  };

  const redirectDahsboard = () => {
    navigate("/");
  };

  const nextImage = () => {
    setCurrentIndex((prev) =>
      prev === capturedImages.length - 1 ? 0 : prev + 1,
    );
  };

  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? capturedImages.length - 1 : prev - 1,
    );
  };
  const nextVideo = () => {
    setCurrentVideoIndex((prev) =>
      prev === recordedVideos.length - 1 ? 0 : prev + 1,
    );
  };

  const prevVideo = () => {
    setCurrentVideoIndex((prev) =>
      prev === 0 ? recordedVideos.length - 1 : prev - 1,
    );
  };

  return (
    <Container
      fluid
      className="flex-fill d-flex align-items-stretch flex-column"
    >
      {!isVideoOpen && (
        <>
          <Row className="mt-3">
            <Col sm="6" className="d-flex flex-column">
              <label> Nancy Archer | 33Y | F </label>
              <label> SKS0005 </label>
            </Col>

            <Col sm="6" className="d-flex flex-column align-items-end">
              <label> IP/000231 | 105 | 2 </label>
              <label> Dr Russell Wood | RWR </label>
            </Col>
          </Row>

          <Row>
            <Col>
              <div className="capturedFiles">
                <Container fluid className="">
                  <Row>
                    <Col sm="12" className="d-flex flex-row filledRow">
                      <p className="me-auto py-1 px-1 m-0">
                        <span className="txtlbl">Surgery:</span>{" "}
                        Open-heart-surgery
                      </p>
                      <p className="py-1 px-1 m-0">
                        <span className="txtlbl">Diagnosis:</span>{" "}
                        Echocardiogram
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="6" className="py-3 capturedVideos">
                      <p className="mb-2">
                        {" "}
                        <i class="icon icon-video"></i> Recorded Videos{" "}
                        <Badge bg="primary">{recordedVideos.length}</Badge>{" "}
                      </p>
                      <Row>
                        <ul>
                          {recordedVideos.slice(0, 6).map((vid, index) => (
                            <li key={index} onClick={() => openVideo(index)}>
                              <video
                                src={vid}
                                className="video-thumb"
                                muted
                                preload="metadata"
                              />
                              <i className="icon icon-play-circle"></i>

                              {index === 5 && recordedVideos.length > 6 && (
                                <p className="more-count">
                                  <span>+{recordedVideos.length - 6}</span>
                                </p>
                              )}
                            </li>
                          ))}
                        </ul>
                      </Row>
                    </Col>
                    <Col sm="6" className="py-3 capturedImages ">
                      <p className="mb-2">
                        {" "}
                        <i class="icon icon-image ms-2"></i> Captured Images{" "}
                        <Badge bg="primary">{capturedImages.length}</Badge>{" "}
                      </p>
                      <Row>
                        <ul>
                          {capturedImages.slice(0, 6).map((img, index) => (
                            <li key={index} onClick={() => openImage(index)}>
                              <Image src={img} />

                              {index === 5 && capturedImages.length > 6 && (
                                <p className="more-count">
                                  <span>+{capturedImages.length - 6}</span>
                                </p>
                              )}
                            </li>
                          ))}
                        </ul>
                      </Row>
                    </Col>
                  </Row>
                </Container>
              </div>
            </Col>
          </Row>
          <Row className="mt-2 mb-1">
            <Col className="d-flex align-items-center justify-content-center">
              <Button variant="primary" onClick={redirectDahsboard}>
                {" "}
                Done{" "}
              </Button>
            </Col>
          </Row>
        </>
      )}
      <Modal
        show={show}
        onHide={handleClose}
        centered
        size="xl"
        dialogClassName="media-viewer-modal"
      >
        <Modal.Body className="p-0 position-relative media-viewer-body">
          <button className="media-close-btn" onClick={handleClose}>
            <i className="icon icon-window-close"></i>
          </button>

          {type === "video" && (
            <>
              {recordedVideos.length > 1 && (
                <button className="nav-arrow left" onClick={prevVideo}>
                  <i className="icon icon-chevron-left"></i>
                </button>
              )}

              <video
                src={recordedVideos[currentVideoIndex]}
                controls
                autoPlay
                className="media-video"
              />

              {recordedVideos.length > 1 && (
                <button className="nav-arrow right" onClick={nextVideo}>
                  <i className="icon icon-chevron-right"></i>
                </button>
              )}
            </>
          )}

          {type === "image" && (
            <>
              {capturedImages.length > 1 && (
                <button className="nav-arrow left" onClick={prevImage}>
                  <i className="icon icon-chevron-left"></i>
                </button>
              )}

              <Image
                src={capturedImages[currentIndex]}
                className="media-image"
              />

              {capturedImages.length > 1 && (
                <button className="nav-arrow right" onClick={nextImage}>
                  <i className="icon icon-chevron-right"></i>
                </button>
              )}
            </>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Completedrecording;
