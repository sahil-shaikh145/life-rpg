import { NextApiRequest } from 'next';
import jwt from 'jsonwebtoken';

export interface DecodedToken {
  id: string;
  email: string;
  username: string;
}

export function verifyAuth(req: NextApiRequest): string | null {
  try {
    const token = extractToken(req);
    if (!token) return null;

    const decoded = jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET || 'secret'
    ) as DecodedToken;

    return decoded.id;
  } catch (error) {
    return null;
  }
}

export function extractToken(req: NextApiRequest): string | null {
  // Check Authorization header
  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.slice(7);
  }

  // Check cookies
  const cookies = req.headers.cookie;
  if (cookies) {
    const tokenCookie = cookies
      .split(';')
      .find((c) => c.trim().startsWith('token='));
    if (tokenCookie) {
      return tokenCookie.split('=')[1];
    }
  }

  return null;
}
