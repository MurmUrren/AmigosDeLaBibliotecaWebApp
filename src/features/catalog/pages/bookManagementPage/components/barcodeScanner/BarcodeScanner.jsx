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
  const [loading, setLoading] = useState(true);

  const videoInputDevices =
    devices?.filter((device) => device.kind === "videoinput") || [];

  const arrDevices = videoInputDevices.map((device, index) => ({
    deviceId: device.deviceId,
    label: device.label || `Camera ${index + 1}`,
  }));

  const { ref, reset } = useZxing({
    paused: !deviceId,
    deviceId: deviceId,
    onDecodeResult(result) {
      getScannerISBN(result.getText());
      setLoading(false);
    },
  });

  useEffect(() => {
    if (arrDevices.length > 0 && deviceId === "") {
      setDeviceId(arrDevices[0].deviceId);
      setLoading(false);
    }
  }, [arrDevices]);

  const handleDeviceChange = (e) => {
    const selectedDeviceId = e.target.value;
    setLoading(true);
    setDeviceId(selectedDeviceId);
    reset(); // Ensure the video feed is reset when the device changes
  };

  return (
    <div>
      <div>
        {arrDevices.length > 0 ? (
          <select value={deviceId} onChange={handleDeviceChange}>
            {arrDevices.map(({ deviceId, label }) => (
              <option key={deviceId} value={deviceId}>
                {label}
              </option>
            ))}
          </select>
        ) : (
          <p>No camera devices found</p>
        )}
      </div>

      {true ? (
        <video
          ref={ref}
          style={{
            width: "100%",
            maxWidth: "380px",
            height: "100%",
            maxHeight: "250px",
          }}
        />
      ) : loading ? (
        <p>Loading camera...</p>
      ) : (
        <p>No camera feed available</p>
      )}
    </div>
  );
};

export default BarcodeScanner;
