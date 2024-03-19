"use client"
import { Html5QrcodeScanner } from "html5-qrcode"
import { useEffect, useState } from "react";



export default function Scanner() {
    const [scanResult, setScanResult] = useState(null)
    const [scanErr, setScanErr] = useState(null)
   
    useEffect(() => {
        const scanner = new Html5QrcodeScanner('reader', {
            qrbox: {
                width: 300,
                height: 300,
            },
            fps: 5,  
            }
        );
        scanner.render(success, error);
        function success(result) {
            scanner.clear();
            setScanResult(result);
        }
        function error(err) {
            console.warn(err);
            setScanErr(err)
        }
    }, []);

  return (
    <div>
        <h1 className="text-2xl">Tets</h1>
        { scanResult
            ? <div>Success: {scanResult}</div>
            : <div id="reader"></div>
        }
        <hr />
        { scanErr
            ? <div>Err: {scanErr}</div>
            : <div id="reader"></div>
        }
    </div>
  )
}
