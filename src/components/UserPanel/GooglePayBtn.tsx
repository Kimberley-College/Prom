import SaveToGooglePay from '@google-pay/save-button-react';

interface Props {
  ticketJwt: string;
}

const GooglePayBtn = ({ ticketJwt }: Props) => {
  const jwt = {
    ticketHolderName: 'Nick',
    ticketNumber: 'ticketIdHere',
    id: 'prom.ticketIdHere',
    classId: 'prom.classIdHere',
    state: 'ACTIVE',
    barcode: {
      type: 'QR_CODE',
      value: ticketJwt,
      alternateText: 'Nick - ticketId',
    },
  } as const;
  return (
    <SaveToGooglePay jwt={jwt} />
  );
};

export default GooglePayBtn;
