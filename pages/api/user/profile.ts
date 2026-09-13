import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { verifyAuth } from '../../../utils/auth';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userId = verifyAuth(req);
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          inventory: true,
        },
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const { password: _, ...userWithoutPassword } = user;
      return res.status(200).json({ user: userWithoutPassword });
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      return res.status(500).json({ error: 'Failed to fetch profile' });
    }
  }

  if (req.method === 'PUT') {
    try {
      const { title, theme } = req.body;

      const updated = await prisma.user.update({
        where: { id: userId },
        data: {
          ...(title !== undefined && { title }),
          ...(theme !== undefined && { theme }),
        },
      });

      const { password: _, ...userWithoutPassword } = updated;
      return res.status(200).json({ user: userWithoutPassword });
    } catch (error) {
      console.error('Failed to update profile:', error);
      return res.status(500).json({ error: 'Failed to update profile' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
