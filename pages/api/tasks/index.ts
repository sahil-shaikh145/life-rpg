import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { verifyAuth } from '../../../utils/auth';
import { z } from 'zod';

const prisma = new PrismaClient();

const createTaskSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().optional(),
  category: z.string().default('General'),
  difficulty: z.enum(['Easy', 'Normal', 'Hard', 'Legendary']).default('Normal'),
  dueDate: z.string().datetime().optional(),
  baseXp: z.number().default(10),
  strengthXp: z.number().default(0),
  intellectXp: z.number().default(0),
  charismaXp: z.number().default(0),
  enduranceXp: z.number().default(0),
});

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
      const tasks = await prisma.task.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
      });
      return res.status(200).json({ tasks });
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
      return res.status(500).json({ error: 'Failed to fetch tasks' });
    }
  }

  if (req.method === 'POST') {
    try {
      const data = createTaskSchema.parse(req.body);

      // Adjust XP based on difficulty
      const difficultyMultiplier = {
        Easy: 0.5,
        Normal: 1,
        Hard: 1.5,
        Legendary: 2,
      };

      const multiplier = difficultyMultiplier[data.difficulty as keyof typeof difficultyMultiplier] || 1;
      const adjustedBaseXp = Math.ceil(data.baseXp * multiplier);

      const task = await prisma.task.create({
        data: {
          ...data,
          userId,
          baseXp: adjustedBaseXp,
          dueDate: data.dueDate ? new Date(data.dueDate) : null,
        },
      });

      return res.status(201).json({ task });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: 'Invalid input', details: error.errors });
      }
      console.error('Failed to create task:', error);
      return res.status(500).json({ error: 'Failed to create task' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
