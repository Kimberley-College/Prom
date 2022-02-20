import type { NextPage } from 'next';
import HasTicket from 'components/UserPanel/hasTicket';
import NoTicket from 'components/UserPanel/noTicket';

const Panel: NextPage = () => {
  const hasTicket = true; // = Math.random() > 0.5

  if (hasTicket) return <HasTicket />;
  return <NoTicket />;
};

export default Panel;
