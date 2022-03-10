export interface UserWithTicketInfo {
  id: string;
  email: string;
  name: string;
  is_admin: boolean;
  has_ticket: boolean;
  checked_in: boolean;
}
