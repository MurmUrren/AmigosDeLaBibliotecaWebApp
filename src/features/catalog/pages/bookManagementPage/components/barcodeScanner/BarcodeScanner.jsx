import React, { useState } from "react";
import { useZxing } from "react-zxing";
import { useMediaDevices } from "react-media-devices";

const BarcodeScanner = ({ getScannerISBN }) => {
  const [result, setResult] = useState("");
  const [showVideoFeed, setShowVideoFeed] = useState(true);

  const { ref } = useZxing({
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

    </>
  );
};

export default BarcodeScanner;
