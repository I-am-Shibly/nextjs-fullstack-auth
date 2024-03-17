import { User } from '@/models/User';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (request: NextRequest) => {
  try {
    const { token } = await request.json();

    const user = User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
    }

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = Date.now();
    await user.save();

    return NextResponse.json({
      message: 'Email verified successfully',
      success: true,
    });
  } catch (error) {}
};
