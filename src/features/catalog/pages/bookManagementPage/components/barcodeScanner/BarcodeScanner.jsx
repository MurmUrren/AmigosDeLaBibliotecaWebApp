import React, { useEffect, useState } from "react";
import { useZxing } from "react-zxing";
import { useMediaDevices } from "react-media-devices";

const BarcodeScanner = ({ getScannerISBN }) => {
<<<<<<< HEAD
  const { devices } = useMediaDevices({ constraints });
  // const deviceId = devices?.find((device) => device.kind === "videoinput")?.deviceId; 
  // const videoInputDevices = devices?.filter((device) => device.kind === "videoinput") || [];
  // const deviceId = videoInputDevices?.[1]?.deviceId || videoInputDevices?.[0]?.deviceId;
  let deviceId;
  let arrDevicesId = [];

  for (let i = 15; i >= 0; i--) {
    const deviceIdd = devices?.[i]?.deviceId;
    if (deviceIdd) {
      arrDevicesId.push(deviceIdd);
      break;
    }
  }
=======
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
>>>>>>> b03c3527c1240ed79bcf8dd597c3e62707cfd1fb

  const { ref } = useZxing({
    paused: !selectedDeviceId,
    deviceId: selectedDeviceId || deviceId,
    onDecodeResult(result) {
      getScannerISBN(result.getText());
    },
  });

  return (
    <>
<<<<<<< HEAD
    <div>
      {showVideoFeed && (
        <video
          ref={ref}
          style={{
            width: "100%",
            maxWidth: "380px",
            height: "100%",
            maxHeight: "250px",
          }}
        />
      )}
      <button>
        <select
          value={deviceId}
          onChange={(e) => {
            setShowVideoFeed(true);
            setResult("");
            deviceId = e.target.value;
          }}
        >
          {arrDevicesId?.map((deviceId) => (
            <option key={deviceId} value={deviceId}>
              {deviceId}
            </option>
          ))}
        </select>
      </button>
      </div>
      {/* {permissionStatus === "denied" && <p>Camera access denied. Please enable camera permissions in your browser settings.</p>}
      {permissionStatus === "prompt" && <p>Requesting camera access...</p>} */}
      {/* {error && <p>Error accessing the camera</p>} */}
=======
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
>>>>>>> b03c3527c1240ed79bcf8dd597c3e62707cfd1fb
    </>
  );
};

export default BarcodeScanner;
