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

  const { id } = req.query;

  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid task ID' });
  }

  try {
    const task = await prisma.task.findUnique({
      where: { id },
    });

    if (!task || task.userId !== userId) {
      return res.status(404).json({ error: 'Task not found' });
    }

    if (req.method === 'DELETE') {
      await prisma.task.delete({ where: { id } });
      return res.status(200).json({ message: 'Task deleted' });
    }

    if (req.method === 'PUT') {
      const { title, description, category, difficulty, dueDate, completed } = req.body;

      const updated = await prisma.task.update({
        where: { id },
        data: {
          ...(title !== undefined && { title }),
          ...(description !== undefined && { description }),
          ...(category !== undefined && { category }),
          ...(difficulty !== undefined && { difficulty }),
          ...(dueDate !== undefined && { dueDate: dueDate ? new Date(dueDate) : null }),
          ...(completed !== undefined && { 
            completed,
            completedAt: completed ? new Date() : null 
          }),
        },
      });

      return res.status(200).json({ task: updated });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Task operation failed:', error);
    return res.status(500).json({ error: 'Failed to process task' });
  }
}
