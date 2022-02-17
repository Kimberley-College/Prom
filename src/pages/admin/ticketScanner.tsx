import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';

const Test = () => {
  const [data, setData] = useState('No result');

  return (
    <>
      <QrReader
        style={{ width: '100%' }}
        onResult={(result) => {
          if (result) {
            setData(result.text);
          }
        }}
      />
      <p>{data}</p>
    </>
  );
};

export default Test;
