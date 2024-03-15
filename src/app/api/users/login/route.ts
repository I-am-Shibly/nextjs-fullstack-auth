import { DBconnect } from '@/helpers/DBconnect';
import { User } from '@/models/User';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

DBconnect();

export const POST = async (req: NextRequest) => {
  try {
    const { email, password } = await req.json();

    const user = await User.findOne({ email });
    await console.log(user);

    // console.log(user);

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 400 });
    }

    const isPasswordValid = await bcrypt.compare(password, user?.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { Message: 'Password is not valid' },
        { status: 400 }
      );
    }

    //create token

    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    const token = jwt.sign(tokenData, process.env.SECRET_KEY!, {
      expiresIn: '1d',
    });

    const response = NextResponse.json({
      message: 'Logged in successfully',
      success: true,
    });

    response.cookies.set('token', token, { httpOnly: true });

    console.log(response);

    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Something went wrong!' },
      { status: 500 }
    );
  }
};
