import { useState } from 'react';
import { QrReader } from 'react-qr-reader';

const Test: React.FC = () => {
  const [data, setData] = useState('No result');

  return (
    <>
      <QrReader
        containerStyle={{ width: '100%' }}
        constraints={{}}
        onResult={(result) => {
          if (result) {
            setData(result.getText());
          }
        }}
      />
      <p>{data}</p>
    </>
  );
};

export default Test;
