import { Box } from '@chakra-ui/react';
import QRCode from 'qrcode.react';

interface Props {
  jwt: string;
}

const QR = ({ jwt }: Props) => (
  <Box bgColor="white" border="3px solid" borderColor="brand.kimberley" w="300px" h="300px" boxSizing="content-box" borderRadius="15px" p={6}>
    <QRCode value={jwt} size={300} fgColor="#711368" level="L" imageSettings={{src:"/kimberley_logo.png"}} />
  </Box>
);

export default QR;
