import type { NextPage } from 'next';
import HasTicket from 'components/UserPanel/HasTicket';
import NoTicket from 'components/UserPanel/NoTicket';
import BaseLayout from 'components/Layouts/Base';

const Panel: NextPage = () => {
  const hasTicket = false; // = Math.random() > 0.5

  return (
    <BaseLayout>
      {hasTicket ? <HasTicket /> : <NoTicket />}
    </BaseLayout>
  );
};

export default Panel;
