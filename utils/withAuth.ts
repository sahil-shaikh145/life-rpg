import { GetServerSideProps, NextApiRequest, NextApiResponse } from 'next';
import { extractToken } from './auth';
import jwt from 'jsonwebtoken';

/**
 * Higher-order function to protect API routes
 * Returns 401 if no valid token
 */
export function withAuth(
  handler: (req: NextApiRequest, res: NextApiResponse, userId: string) => Promise<void>
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = extractToken(req);

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      const decoded = jwt.verify(
        token,
        process.env.NEXTAUTH_SECRET || 'secret'
      ) as { id: string };
      
      return handler(req, res, decoded.id);
    } catch (error) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  };
}

/**
 * Redirect to login if not authenticated
 * Use in getServerSideProps
 */
export const requireAuth: GetServerSideProps = async (context) => {
  const token = context.req.cookies.token;

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  try {
    jwt.verify(token, process.env.NEXTAUTH_SECRET || 'secret');
    return { props: {} };
  } catch {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
};
