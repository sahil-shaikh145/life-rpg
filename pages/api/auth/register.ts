import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

const prisma = new PrismaClient();

const registerSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3).max(20),
  password: z.string().min(6),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, username, password } = registerSchema.parse(req.body);

    // Check if user exists
    const existing = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existing) {
      return res.status(400).json({ error: 'Email or username already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with initial RPG stats
    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        level: 1,
        totalExp: 0,
        currentExp: 0,
        strength: 10,
        intellect: 10,
        charisma: 10,
        endurance: 10,
        gold: 100, // Starting gold
        currentStreak: 0,
        maxStreak: 0,
      },
    });

    // Don't return password
    const { password: _, ...userWithoutPassword } = user;
    
    return res.status(201).json({ 
      user: userWithoutPassword,
      message: 'Account created successfully! Welcome to Life RPG.' 
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid input', details: error.errors });
    }
    console.error('Registration error:', error);
    return res.status(500).json({ error: 'Failed to create account' });
  }
}
