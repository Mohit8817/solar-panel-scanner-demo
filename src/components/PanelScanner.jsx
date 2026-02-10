import { useEffect, useRef, useState } from "react";
import { Alert } from "react-bootstrap";
import { Html5Qrcode } from "html5-qrcode";

const PanelScanner = ({ onScan }) => {
  const scannerRef = useRef(null);
  const html5QrCodeRef = useRef(null);
  const [error, setError] = useState(null);
  const [lastScanned, setLastScanned] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [cameras, setCameras] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState(null);

  useEffect(() => {
    const initScanner = async () => {
      try {
        // Get available cameras
        const devices = await Html5Qrcode.getCameras();
        
        if (!devices || devices.length === 0) {
          setError("No camera found on this device");
          return;
        }

        console.log("Available cameras:", devices);
        setCameras(devices);

        // Prefer back camera
        const backCamera = devices.find(
          (device) =>
            device.label.toLowerCase().includes("back") ||
            device.label.toLowerCase().includes("rear") ||
            device.label.toLowerCase().includes("environment")
        ) || devices[devices.length - 1];

        setSelectedCamera(backCamera.id);

        // Initialize scanner
        const html5QrCode = new Html5Qrcode("qr-reader");
        html5QrCodeRef.current = html5QrCode;

        // Start scanning with high-quality settings
        await html5QrCode.start(
          backCamera.id,
          {
            fps: 10, // Frames per second
            qrbox: { width: 300, height: 150 }, // Scanning box size
            aspectRatio: 1.777778, // 16:9 aspect ratio
            // Advanced settings for barcode
            formatsToSupport: [
              "CODE_128",
              "CODE_39",
              "EAN_13",
              "EAN_8",
              "UPC_A",
              "UPC_E",
              "CODABAR",
              "ITF",
              "RSS_14",
            ],
          },
          (decodedText, decodedResult) => {
            console.log("✅ Scanned successfully:", decodedText);
            setLastScanned(decodedText);
            onScan(decodedText);
            playBeep();
          },
          (errorMessage) => {
            // Ignore scanning errors (happens continuously when no barcode in view)
            // Only log actual errors, not "NotFoundException"
            if (!errorMessage.includes("NotFoundException")) {
              console.warn("Scan error:", errorMessage);
            }
          }
        );

        setIsScanning(true);
        console.log("Scanner started successfully");
      } catch (err) {
        console.error("Scanner initialization error:", err);
        setError(`Camera error: ${err.message || "Unable to access camera"}`);
      }
    };

    initScanner();

    // Cleanup function
    return () => {
      if (html5QrCodeRef.current && html5QrCodeRef.current.isScanning) {
        html5QrCodeRef.current
          .stop()
          .then(() => {
            console.log("Scanner stopped");
          })
          .catch((err) => {
            console.error("Error stopping scanner:", err);
          });
      }
    };
  }, [onScan]);

  const playBeep = () => {
    try {
      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = 800;
      oscillator.type = "sine";
      gainNode.gain.value = 0.3;

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.2);
    } catch (e) {
      console.log("Audio not available");
    }
  };

  return (
    <div style={{ width: "100%", maxWidth: "600px", margin: "auto" }}>
      {error && <Alert variant="danger">{error}</Alert>}

      {lastScanned && (
        <Alert variant="success" dismissible>
          <div className="d-flex align-items-center gap-2">
            <span style={{ fontSize: "24px" }}>✅</span>
            <div>
              <strong>Successfully Scanned!</strong>
              <div className="mt-1">
                <code style={{ fontSize: "16px" }}>{lastScanned}</code>
              </div>
            </div>
          </div>
        </Alert>
      )}

      <div style={{ position: "relative" }}>
        <div
          id="qr-reader"
          ref={scannerRef}
          style={{
            width: "100%",
            borderRadius: "10px",
            overflow: "hidden",
            border: "3px solid #0d6efd",
          }}
        />

        {isScanning && (
          <div
            style={{
              position: "absolute",
              bottom: "10px",
              left: "50%",
              transform: "translateX(-50%)",
              background: "rgba(0, 255, 0, 0.8)",
              color: "#000",
              padding: "8px 16px",
              borderRadius: "20px",
              fontSize: "14px",
              fontWeight: "bold",
              pointerEvents: "none",
            }}
          >
            🟢 Scanning Active
          </div>
        )}
      </div>

    

      <style>{`
        #qr-reader video {
          width: 100% !important;
          border-radius: 10px;
        }
        
        #qr-reader__scan_region {
          border-radius: 10px !important;
        }
        
        #qr-reader__dashboard_section {
          display: none !important;
        }
      `}</style>
    </div>
  );
};

export default PanelScanner;