import {
  createContext, useContext, useState, useMemo, useEffect,
} from 'react';
import { supabaseClient as supabase } from '@supabase/supabase-auth-helpers/nextjs';
import { useUser } from '@supabase/supabase-auth-helpers/react';

export interface Ticket {
  id: number;
  created_at: string;
  email: string;
  checked_in: boolean;
  customer_id: string;
}

interface ITicketContext {
  ticket: Ticket | null;
  updateTicket: () => Promise<void>;
  isLoading: boolean;
}

const startingData: ITicketContext = {
  updateTicket: async () => console.error('State not loaded'),
  ticket: null,
  isLoading: true,
};

const TicketContext = createContext<ITicketContext>(startingData);

export const TicketContextProvider: React.FC = ({ children }) => {
  const [ticket, setTicket] = useState<Ticket>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isLoading: userIsLoading } = useUser();
  const updateTicket = async (): Promise<void> => supabase.from<Ticket>('tickets').select('*').single().then(({ data }) => setTicket(data));

  useEffect(() => {
    const runUpdate = async () => {
      updateTicket().then(() => setIsLoading(false));
    };

    if (!userIsLoading) runUpdate();
  }, [userIsLoading]);

  const value = useMemo(() => ({
    updateTicket,
    ticket,
    isLoading,
  }), [ticket, isLoading]);

  return (
    <TicketContext.Provider value={value}>
      {children}
    </TicketContext.Provider>
  );
};

export const useTicket = (): ITicketContext => useContext(TicketContext);
