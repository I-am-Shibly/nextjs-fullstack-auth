import { NextResponse } from 'next/server';

export const GET = async () => {
  try {
    const response = NextResponse.json({
      message: 'Logout successful',
      success: true,
    });

    response.cookies.delete('token');
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
