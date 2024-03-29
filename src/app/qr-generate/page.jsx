"use client"

import { useState, useRef } from "react";
// other previous imports
import * as htmlToImage from "html-to-image";
import QRCode from "react-qr-code";

function QrCodeGenerator() {
    const [url, setUrl] = useState("");
    const [qrIsVisible, setQrIsVisible] = useState(false);
    const qrCodeRef = useRef(null);
    const handleQrCodeGenerator = () => {
      if (!url) {
        return;
      }
      setQrIsVisible(true);
    };


    const downloadQRCode = () => {
        htmlToImage
          .toPng(qrCodeRef.current)
          .then(function (dataUrl) {
            const link = document.createElement("a");
            link.href = dataUrl;
            link.download = "qr-code.png";
            link.click();
          })
          .catch(function (error) {
            console.error("Error generating QR code:", error);
          });
      };
    return (
      <div className="qrcode__container">
        <h1>QR Code Generator</h1>
        <div className="qrcode__container--parent">
          <div className="qrcode__input">
            <input
              type="text"
              placeholder="Enter a URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
  
            <button onClick={handleQrCodeGenerator}>Generate QR Code</button>
          </div>
          {qrIsVisible && (
            <div className="qrcode__download">
              <div className="p-[2rem] w-auto flex items-center justify-center bg-white" ref={qrCodeRef}>
                <QRCode value={url} size={500} />
              </div>
              <button onClick={downloadQRCode}>Download QR Code</button>
            </div>
          )}
        </div>
      </div>
    );
  }
  export default QrCodeGenerator;