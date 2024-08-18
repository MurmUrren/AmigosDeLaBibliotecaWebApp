import React, { useEffect, useState } from "react";
import { useZxing } from "react-zxing";
import { useMediaDevices } from "react-media-devices";

const BarcodeScanner = ({ getScannerISBN }) => {
  const [deviceId, setDeviceId] = useState(null);
  const [showVideoFeed, setShowVideoFeed] = useState(true);
  const { devices } = useMediaDevices();

  useEffect(() => {
    if (devices) {
      // Filter video input devices and try to find the telephoto camera
      const videoInputDevices = devices.filter(device => device.kind === "videoinput");
      
      const telephotoCamera = videoInputDevices.find(device => 
        device.label.toLowerCase().includes("telephoto") ||
        device.label.toLowerCase().includes("zoom") || 
        device.label.toLowerCase().includes("high resolution")
      );
      
      setDeviceId(telephotoCamera?.deviceId || videoInputDevices[0]?.deviceId);
    }
  }, [devices]);

  const { ref } = useZxing({
    paused: !deviceId,
    deviceId,
    onDecodeResult(result) {
      setShowVideoFeed(false);
      getScannerISBN(result.getText());
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
    </>
  );
};

export default BarcodeScanner;
