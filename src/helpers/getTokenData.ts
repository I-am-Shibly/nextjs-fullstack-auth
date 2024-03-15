import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export const getTokenData = async (request: NextRequest) => {
  try {
    const token = request.cookies.get('token')?.value || '';

    if (token) {
      const decodedToken: any = jwt.verify(token, process.env.SECRET_KEY!);
      return decodedToken.id;
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};
