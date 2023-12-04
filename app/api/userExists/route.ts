import connectDB from '@/mongo/connection';
import User from '@/mongo/models/UserModel';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { email } = await req.json();
    const user = await User.findOne({ email });
    return NextResponse.json({ user });
  } catch (error) {
    console.log(error);
  }
}
