import React, { useState } from "react";
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
  // const deviceId = devices?.find((device) => device.kind === "videoinput")?.deviceId; 
  // const videoInputDevices = devices?.filter((device) => device.kind === "videoinput") || [];
  // const deviceId = videoInputDevices?.[1]?.deviceId || videoInputDevices?.[0]?.deviceId;
  let deviceId;
  for (let i = 20; i >= 6; i--) {
    const deviceIdd = devices?.[i]?.deviceId;
    if (deviceIdd) {
      deviceId = deviceIdd;
      break;
    }
  }

  // const deviceId = devices?.[5]?.deviceId || devices?.[2]?.deviceId || devices?.[1]?.deviceId || devices?.[0]?.deviceId;
  const [result, setResult] = useState("");
  const [showVideoFeed, setShowVideoFeed] = useState(true);
  
  const { ref } = useZxing({
    paused: !deviceId,
    deviceId,
    onDecodeResult(result) {
      setResult(result.getText());
      setShowVideoFeed(false);
      getScannerISBN(String(result));
    },
  });

  return (
    <>
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
      {/* {permissionStatus === "denied" && <p>Camera access denied. Please enable camera permissions in your browser settings.</p>}
      {permissionStatus === "prompt" && <p>Requesting camera access...</p>} */}
      {/* {error && <p>Error accessing the camera</p>} */}
    </>
  );
};

export default BarcodeScanner;
