import type { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<NextApiResponse> => res.status(200);
