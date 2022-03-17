export interface UserWithTicketInfo {
  id: string;
  email: string;
  name: string;
  is_admin: boolean;
  has_ticket: boolean;
  checked_in: boolean;
}

export type UserWithTicket = UserWithTicketInfo & {
  ticketId: string;
  jwt: string;
};

export interface Ticket {
  id: string;
  created_at: string;
  email: string;
  checked_in: boolean;
  customer_id: string;
  user_id: string;
  jwt: string;
}

export interface JWT {
  name: string;
  email: string;
  user_id: string;
  id: string;
  created_at: string;
}
