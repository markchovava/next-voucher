"use client"
import { Scanner } from '@yudiel/react-qr-scanner';
import { useState } from 'react';

export default function page() {
  const [m, setM] = useState({});
    return (
      <div className='w-[30rem] h-[30rem]'>
        <Scanner
            onResult={(text, result) => setM(result)}
            onError={(error) => console.log(error?.message)}
        />
        <div>{m?.text}</div>
      </div>
    );
}