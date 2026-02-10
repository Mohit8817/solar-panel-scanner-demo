import { useState } from "react";
import PanelScanner from "../components/PanelScanner";
import ScannedList from "../components/ScannedList";
import { Container, Card } from "react-bootstrap";

const ScanPanels = () => {
  const [scannedPanels, setScannedPanels] = useState([]);
  const [manualInput, setManualInput] = useState("");

  const handleScan = (code) => {
    setScannedPanels((prev) => {
      if (prev.includes(code)) return prev;
      return [...prev, code];
    });
  };

  const handleManualAdd = () => {
    if (manualInput.trim()) {
      handleScan(manualInput.trim());
      setManualInput("");
    }
  };

  return (
    <Container className="mt-3">
      <Card className="mb-3">
        <Card.Body>
          <h4>Scan Solar Panel</h4>
          <PanelScanner onScan={handleScan} />
          
          {/* Manual Input Fallback */}
          <div className="mt-3">
            <h6>Or Enter Manually:</h6>
            <div className="d-flex gap-2">
              <input
                type="text"
                className="form-control"
                value={manualInput}
                onChange={(e) => setManualInput(e.target.value)}
                placeholder="Enter barcode manually"
              />
              <button className="btn btn-primary" onClick={handleManualAdd}>
                Add
              </button>
            </div>
          </div>
        </Card.Body>
      </Card>

      <ScannedList panels={scannedPanels} />
    </Container>
  );
};
export default ScanPanels;
