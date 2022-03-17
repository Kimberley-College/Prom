import { withSentry } from '@sentry/nextjs';
import { MessageBuilder, Webhook } from 'webhook-discord';
import { verify } from 'async-jsonwebtoken';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { JWT } from 'types/user';
import mailClient from '@sendgrid/mail';
import QRCode from 'qrcode';

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

  mailClient.setApiKey(process.env.SENDGRID_API_KEY);

  const qrImage = await QRCode.toDataURL(body.record.jwt);

  const emailMessage = {
    from: 'nick@prom.kim',
    template_id: process.env.SENDGRID_CONFIRMATION_TEMPLATE_ID,
    dynamic_template_data: {
      name: jwt.name,
      email: body.record.email,
      dateTime: body.record.created_at,
      ticketId: jwt.id,
      qrImage,
    },
    personalizations: [
      {
        to: [
          {
            email: body.record.email,
          },
        ],
      },
    ],
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await mailClient.send(emailMessage as any); // For some reason it seems to want me to provide a content field which I shouldn't need when giving template id...

  return res.status(200).send('Received');
});
