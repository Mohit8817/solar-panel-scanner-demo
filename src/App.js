// src/App.js
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ScanPanels from "./pages/ScanPanels";

// import AIChat from "./Component/AIChat";
// import Testingform from "./Component/Testingform";

function App() {
  return (
    <>
      {/* <AIChat /> */}

      {/* BELOW AREA FOR FORM */}
      <Container className="mt-4">
        <Row>
          <Col>
            {/* <Testingform /> */}
              <ScanPanels/>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
