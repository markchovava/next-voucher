"use client"
import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';

export default function page (){
  const [data, setData] = useState('No result');

  return (
    <>
    <div className='w-[30rem]'>

      <QrReader
        onResult={(result, error) => {
          if (!!result) {
            setData(result?.text);
          }

          if (!!error) {
            console.info(error);
          }
        }}
        style={{ width: '100%' }}
      />
    </div>
      <p>{data}</p>
    </>
  );
};