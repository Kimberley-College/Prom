/* eslint-disable react/require-default-props */
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useEffect, useState, useMemo } from 'react';

interface Props {
  fps?: number;
  qrbox?: {
    width: number;
    height: number;
  }
  aspectRatio?: number;
  disableFlip?: boolean;
  onSuccess: (result: string) => void;
  onError: (result: string) => void;
  verbose: boolean;
}

const QRScanner = ({
  fps, qrbox, aspectRatio, disableFlip, onSuccess, onError, verbose,
}: Props) => {
  const [scanner, setScanner] = useState<null | Html5QrcodeScanner>(null);

  const regionId = 'qr-scanner-full-region';

  const config = useMemo(() => ({
    fps, qrbox, aspectRatio, disableFlip, onSuccess,
  }), [aspectRatio, disableFlip, fps, onSuccess, qrbox]);

  useEffect(() => {
    if (scanner) {
      scanner.render(onSuccess, onError);
    } else {
      setScanner(new Html5QrcodeScanner(regionId, config, verbose));
    }

    return () => {
      if (scanner) {
        scanner.clear();
        setScanner(null);
      }
    };
  }, [scanner, config, verbose, regionId, onSuccess, onError]);

  return (
    <div id={regionId} />
  );
};

export default QRScanner;
