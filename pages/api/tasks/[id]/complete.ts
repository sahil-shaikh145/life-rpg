import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { verifyAuth } from '../../../../utils/auth';
import { calculateLevelUpThreshold, calculateNewLevel } from '../../../../utils/progression';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

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

    if (task.completed) {
      return res.status(400).json({ error: 'Task already completed' });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Calculate total XP gained from this task
    const totalXp = task.baseXp +
      task.strengthXp +
      task.intellectXp +
      task.charismaXp +
      task.enduranceXp;

    // Update user attributes
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        totalExp: user.totalExp + totalXp,
        currentExp: user.currentExp + totalXp,
        strength: user.strength + (task.strengthXp > 0 ? 1 : 0),
        intellect: user.intellect + (task.intellectXp > 0 ? 1 : 0),
        charisma: user.charisma + (task.charismaXp > 0 ? 1 : 0),
        endurance: user.endurance + (task.enduranceXp > 0 ? 1 : 0),
        gold: user.gold + Math.floor(totalXp / 5), // Earn gold too
        currentStreak: user.currentStreak + 1,
      },
    });

    // Mark task as complete
    const completedTask = await prisma.task.update({
      where: { id },
      data: {
        completed: true,
        completedAt: new Date(),
      },
    });

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId,
        action: 'task_completed',
        xpGained: totalXp,
        taskCompleted: task.title,
        details: {
          baseXp: task.baseXp,
          attributeXp: {
            strength: task.strengthXp,
            intellect: task.intellectXp,
            charisma: task.charismaXp,
            endurance: task.enduranceXp,
          },
        },
      },
    });

    // Check for level up
    const levelThreshold = calculateLevelUpThreshold(user.level);
    let newLevel = user.level;
    let leveledUp = false;
    let levelUps = 0;

    if (updatedUser.currentExp >= levelThreshold) {
      const result = calculateNewLevel(updatedUser.currentExp, user.level);
      newLevel = result.level;
      leveledUp = result.leveledUp;
      levelUps = result.levelUps;

      if (leveledUp) {
        await prisma.user.update({
          where: { id: userId },
          data: {
            level: newLevel,
            currentExp: result.remainingExp,
            gold: updatedUser.gold + (200 * levelUps), // Bonus gold per level
          },
        });

        // Log level up
        await prisma.activityLog.create({
          data: {
            userId,
            action: 'level_up',
            xpGained: 0,
            details: {
              newLevel,
              levelUps,
            },
          },
        });
      }
    }

    return res.status(200).json({
      task: completedTask,
      xpGained: totalXp,
      user: {
        ...updatedUser,
        level: newLevel,
      },
      leveledUp,
      levelUps,
      message: leveledUp
        ? `🎉 Level up! You are now level ${newLevel}!`
        : `+${totalXp} XP earned!`,
    });
  } catch (error) {
    console.error('Task completion failed:', error);
    return res.status(500).json({ error: 'Failed to complete task' });
  }
}
