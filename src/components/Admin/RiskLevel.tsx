import {
  Slider, SliderFilledTrack, SliderMark, SliderThumb, SliderTrack, useToast,
} from '@chakra-ui/react';
import type { Ticket, UserWithTicket } from 'types/user';
import { supabaseClient as supabase } from '@supabase/auth-helpers-nextjs';

interface Props {
  user: UserWithTicket;
}

const RiskLevel = ({ user }: Props) => {
  const toast = useToast();
  const updateRiskLevel = async (newLevel: number) => {
    const { error, data: newTicket } = await supabase.from<Ticket>('tickets').update({ risk: newLevel }).match({ id: user.ticketId }).single();
    if (error) {
      toast({
        title: 'Failed to update risk level',
        status: 'error',
      });
      return;
    }
    toast({
      title: 'Risk level updated',
      description: `New risk level: ${newTicket.risk}`,
      status: 'success',
    });
  };
  return (
    <Slider defaultValue={user.risk} min={0} max={5} step={1} onChangeEnd={updateRiskLevel} w="70%" maxW="500px" mt={5} mb={5}>
      <SliderMark value={0} fontSize="lg" mt={3} fontWeight="bold" color="green.700">0</SliderMark>
      <SliderMark value={1} fontSize="lg" mt={3} fontWeight="bold" color="green.400">1</SliderMark>
      <SliderMark value={2} fontSize="lg" mt={3} fontWeight="bold" color="yellow.500">2</SliderMark>
      <SliderMark value={3} fontSize="lg" mt={3} fontWeight="bold" color="orange.400">3</SliderMark>
      <SliderMark value={4} fontSize="lg" mt={3} fontWeight="bold" color="orange.600">4</SliderMark>
      <SliderMark value={5} fontSize="lg" mt={3} fontWeight="bold" color="red">5</SliderMark>
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <SliderThumb boxSize={6} />
    </Slider>
  );
};

export default RiskLevel;
