import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

const prisma = new PrismaClient();

const loginSchema = z.object({
  email: z.string().email(),
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
    const { email, password } = loginSchema.parse(req.body);

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, username: user.username },
      process.env.NEXTAUTH_SECRET || 'secret',
      { expiresIn: '30d' }
    );

    // Return user data and token
    const { password: _, ...userWithoutPassword } = user;

    res.setHeader('Set-Cookie', `token=${token}; Path=/; Max-Age=2592000; HttpOnly; SameSite=Strict`);

    return res.status(200).json({
      user: userWithoutPassword,
      token,
      message: 'Welcome back, adventurer!',
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid input', details: error.errors });
    }
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Login failed' });
  }
}
