import { NextRequest, NextResponse } from 'next/server';
import { User } from '@/models/User';
import bcrypt from 'bcrypt';
import { DBconnect } from '../../../../helpers/DBconnect.js';
import { sendEmail } from '../../../../helpers/mailer';

export const POST = async (req: NextRequest) => {
  try {
    await DBconnect();
    const { username, email, password } = await req.json();

    const userExists = await User.findOne({ email });

    if (userExists) {
      return NextResponse.json(
        { error: 'User already exists with this email' },
        { status: 400 }
      )
    }

    // hash password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    // verification email
    await sendEmail({ email, emailType: 'VERIFY', userId: savedUser._id });

    return NextResponse.json({
      message: 'User has been created successfully.',
      success: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
