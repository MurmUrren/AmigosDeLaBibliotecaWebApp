import React, { useEffect, useState } from "react";
import { useZxing } from "react-zxing";
import { useMediaDevices } from "react-media-devices";

const constraints = {
  video: {
    facingMode: {
      exact: "environment",
    },
  },
  audio: false,
};

const BarcodeScanner = ({ getScannerISBN }) => {
  const { devices } = useMediaDevices({ constraints });
  const [deviceId, setDeviceId] = useState("");
  const [showVideoFeed, setShowVideoFeed] = useState(false);
  const [loading, setLoading] = useState(true);

  const videoInputDevices = devices?.filter((device) => device.kind === "videoinput") || [];
  const arrDevices = videoInputDevices.map((device) => ({
    deviceId: device.deviceId,
    label: device.label || `Camera ${device.deviceId}`,
  }));

  const { ref } = useZxing({
    paused: !deviceId,
    deviceId: deviceId,
    onDecodeResult(result) {
      getScannerISBN(result.getText());
      setLoading(false);
    },
  });

  useEffect(() => {
    if (arrDevices.length > 0) {
      setDeviceId(arrDevices[3].deviceId);
      setShowVideoFeed(true);
    }
  }, [arrDevices]);

  const handleDeviceChange = (e) => {
    setLoading(true);
    setDeviceId(e.target.value);
    setShowVideoFeed(true);
  };

  return (
    <div>
      <div>
        <select value={deviceId} onChange={handleDeviceChange}>
          {arrDevices.map(({ deviceId, label }) => (
            <option key={deviceId} value={deviceId}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {showVideoFeed ? (
        loading ? (
          <p>Loading camera...</p>
        ) : (
          <video
            ref={ref}
            style={{
              width: "100%",
              maxWidth: "380px",
              height: "100%",
              maxHeight: "250px",
            }}
          />
        )
      ) : (
        <p>No camera feed available</p>
      )}
    </div>
  );
};

export default BarcodeScanner;