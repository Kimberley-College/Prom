import {
  Box, Button, Textarea, useToast,
} from '@chakra-ui/react';
import type { Ticket, UserWithTicket } from 'types/user';
import { supabaseClient as supabase } from '@supabase/auth-helpers-nextjs';
import { useState } from 'react';

interface Props {
  user: UserWithTicket;
}

const RiskLevel = ({ user }: Props) => {
  const toast = useToast();
  const [value, setValue] = useState(user.notes);
  const updateNotes = async () => {
    const { error } = await supabase.from<Ticket>('tickets').update({ notes: value }).match({ id: user.ticketId }).single();
    if (error) {
      toast({
        title: 'Failed to update notes',
        status: 'error',
      });
      return;
    }
    toast({
      title: 'Notes updated',
      status: 'success',
    });
  };
  return (
    <Box my={4} w="70%" maxW="700px" minW="350px">
      <Textarea w="100%" size="lg" placeholder="Input notes to be shown to security here" value={value} onChange={(e) => setValue(e.target.value)} />
      <Button onClick={updateNotes}>Save Notes</Button>
    </Box>
  );
};

export default RiskLevel;
