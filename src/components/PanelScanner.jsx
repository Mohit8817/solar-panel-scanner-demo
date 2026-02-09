import { BrowserMultiFormatReader } from "@zxing/browser";
import { useEffect, useRef } from "react";

const PanelScanner = ({ onScan }) => {
  const videoRef = useRef(null);
  const codeReader = useRef(null);

  useEffect(() => {
    codeReader.current = new BrowserMultiFormatReader();

    codeReader.current.decodeFromVideoDevice(
      null,
      videoRef.current,
      (result, err) => {
        if (result) {
          onScan(result.getText());
        }
      }
    );

    return () => {
      codeReader.current?.reset();
    };
  }, []);

  return (
    <div style={{ width: "320px", margin: "auto" }}>
      <video
        ref={videoRef}
        style={{
          width: "100%",
          borderRadius: "10px",
          border: "2px solid #0d6efd",
        }}
      />
    </div>
  );
};

export default PanelScanner;
