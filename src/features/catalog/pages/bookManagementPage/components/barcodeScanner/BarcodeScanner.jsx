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
  const deviceId = devices?.[1]?.deviceId;
  const [result, setResult] = useState("");
  const [showVideoFeed, setShowVideoFeed] = useState(true);
  const [permissionStatus, setPermissionStatus] = useState(null);
  const [cId, setCId] = useState(0);
  
  // console.log("MediaDevices supported:", navigator.mediaDevices.getUserMedia(constraints));

  const changeCamera = () => {
    const deviceId = devices?.[cId]?.deviceId;
    setCId((cId + 1) % devices.length);
    console.log("changeCamera", deviceId);
  };

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
        <>
        <div>
        <video
          ref={ref}
          style={{
            width: "100%",
            maxWidth: "380px",
            height: "100%",
            maxHeight: "250px",
          }}
        />
        </div>
        <div>
          <button onClick={changeCamera}>
          bababa
        </button>
        </div>
        </>
      )}
      {/* {permissionStatus === "denied" && <p>Camera access denied. Please enable camera permissions in your browser settings.</p>}
      {permissionStatus === "prompt" && <p>Requesting camera access...</p>} */}
      {/* {error && <p>Error accessing the camera</p>} */}
    </>
  );
};

export default BarcodeScanner;
