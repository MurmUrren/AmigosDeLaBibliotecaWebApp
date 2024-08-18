import React, { useEffect, useState } from "react";
import { useZxing } from "react-zxing";
import { useMediaDevices } from "react-media-devices";

const constraints = {
  video: {
    facingMode: {
      exact: "environment"
    }
  },
  audio: false
};

const BarcodeScanner = ({ getScannerISBN }) => {
  const { devices } = useMediaDevices({ constraints });
  const [deviceId, setDeviceId] = useState("");
  const [showVideoFeed, setShowVideoFeed] = useState(false);
  const [result, setResult] = useState("");

  const videoInputDevices = devices?.filter((device) => device.kind === "videoinput") || [];
  const arrDevicesId = videoInputDevices.map((device) => device.deviceId);

  const { ref } = useZxing({
    paused: !deviceId,
    deviceId: deviceId,
    onDecodeResult(result) {
      getScannerISBN(result.getText());
    },
  });

  useEffect(() => {
    if (arrDevicesId.length > 0) {
      setDeviceId(arrDevicesId[0]);
    }
  }, [arrDevicesId]);

  return (
    <>
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
              setDeviceId(e.target.value);
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
    </>
  );
};

export default BarcodeScanner;