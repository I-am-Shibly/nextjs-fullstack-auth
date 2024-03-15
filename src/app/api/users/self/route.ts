import { DBconnect } from '@/helpers/DBconnect';
import { User } from '@/models/User';
import { getTokenData } from '@/helpers/getTokenData';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  try {
    DBconnect();

    const userId = await getTokenData(request);

    const user = await User.findOne({ _id: userId }).select('-password');

    if (user) {
      return NextResponse.json({ user, message: 'user found' });
    }

    return NextResponse.json({ message: 'no user found' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
};
