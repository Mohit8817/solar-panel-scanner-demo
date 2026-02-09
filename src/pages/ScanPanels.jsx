import { useState } from "react";
import PanelScanner from "../components/PanelScanner";
import ScannedList from "../components/ScannedList";
import { Container, Card } from "react-bootstrap";

const ScanPanels = () => {
  const [scannedPanels, setScannedPanels] = useState([]);

  const handleScan = (code) => {
    setScannedPanels((prev) => {
      if (prev.includes(code)) return prev; // prevent duplicate
      return [...prev, code];
    });
  };

  return (
    <Container className="mt-3">

      <Card>
        <Card.Body>
          <h4>Scan Solar Panel</h4>
          <PanelScanner onScan={handleScan} />
        </Card.Body>
      </Card>

      <ScannedList panels={scannedPanels} />

    </Container>
  );
};

export default ScanPanels;
