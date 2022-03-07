import { withSentry } from '@sentry/nextjs';
import { MessageBuilder, Webhook } from 'webhook-discord';
import { verify } from 'async-jsonwebtoken';
import type { NextApiRequest, NextApiResponse } from 'next';

interface Payload {
  type: 'INSERT'
  table: string
  schema: string
  record: {
    id: string;
    created_at: string;
    email: string;
    checked_in: boolean;
    customer_id: string;
    user_id: string;
    jwt: string;
  }
  old_record: null
}

interface JWT {
  name: string;
  email: string;
  user_id: string;
  id: string;
  created_at: string;
}

export default withSentry(async (req: NextApiRequest, res: NextApiResponse<string | void>): Promise<void> => {
  const { body }: { body: Payload } = req;

  if (req.headers.authorization !== process.env.SUPABASE_WEBHOOK_SECRET) return res.status(403).send('Unauthorised');

  const verified = await verify(body.record.jwt, process.env.JWT_SECRET);
  const jwt: JWT = verified[0] as JWT;

  const Hook = new Webhook(process.env.DISCORD_WEBHOOK_URL);

  const msg = new MessageBuilder()
    .setName('Tickets Webhook')
    .setColor('#711368')
    .setTitle('New ticket has been purchased')
    .addField('Name', jwt.name, true)
    .addField('Email', body.record.email, true)
    .addField('User ID', body.record.id, true)
    .addField('Time Created', body.record.created_at, true);

  Hook.send(msg);

  return res.status(200).send('Received');
});
