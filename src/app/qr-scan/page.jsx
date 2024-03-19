"use client"
import { useState } from "react";
import { useZxing } from "react-zxing";

export default function BarcodeScanner () {
  const [isQrScan, setIsQrScan] = useState(true);
  const [qrResult, setQrResult] = useState("");
  const { ref } = useZxing({
    onDecodeResult(result) {
      setQrResult(result.getText());
    },
    paused: isQrScan
  });

  return (
    <>
      <button onClick={() => setIsQrScan(!isQrScan)} className="bg-slate-700 p-[2rem] text-white hover:bg-slate-950">Click</button>
      <video ref={ref} className="w-[30rem] h-[30rem]"/>
      <p>
        <span>Last result:</span>
        <span className="text-3xl">{qrResult}</span>
      </p>
    </>
  );
};