import React, { useEffect, useState } from "react";
import { useZxing } from "react-zxing";
import { useMediaDevices } from "react-media-devices";

const BarcodeScanner = ({ getScannerISBN }) => {
<<<<<<< HEAD
  const [deviceId, setDeviceId] = useState(null);
  const { devices } = useMediaDevices();
  const [selectedDeviceId, setSelectedDeviceId] = useState(null);

  useEffect(() => {
    if (devices) {
      const videoInputDevices = devices.filter(device => device.kind === "videoinput");
      setDeviceId(videoInputDevices[0]?.deviceId);
    }
  }, [devices]);

  const handleDeviceChange = (event) => {
    setSelectedDeviceId(event.target.value);
  };

  const { ref } = useZxing({
    paused: !selectedDeviceId,
    deviceId: selectedDeviceId || deviceId,
    onDecodeResult(result) {
      getScannerISBN(result.getText());
    },
  });

  return (
    <>
      {devices && (
        <select onChange={handleDeviceChange} value={selectedDeviceId || deviceId}>
          {devices
            .filter(device => device.kind === "videoinput")
            .map(device => (
              <option key={device.deviceId} value={device.deviceId}>
                {device.label || `Camera ${device.deviceId}`}
              </option>
            ))}
        </select>
      )}
      <video
        ref={ref}
        style={{
          width: "100%",
          maxWidth: "380px",
          height: "100%",
          maxHeight: "250px",
        }}
      />
    </>
  );
};

export default BarcodeScanner;
