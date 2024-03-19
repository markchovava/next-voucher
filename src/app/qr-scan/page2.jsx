"use client"
import { Scanner } from '@yudiel/react-qr-scanner';
import { useState } from 'react';

export default function page() {
  const [msg, setMsg] = useState({})

    return (
      <div className='w-[30rem] h-[30rem]'>
        <Scanner
            onResult={(text, result) => {
              console.log(text, result);
              setMsg(result);
            }}
            onError={(error) => console.log(error?.message)}
        />
        <div>{msg?.text}</div>
      </div>
    );
}