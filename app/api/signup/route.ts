import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import connectDB from '@/mongo/connection';
import User from '@/mongo/models/UserModel';

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const { name, email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ name, email, password: hashedPassword });

    return NextResponse.json({ message: 'User registered' }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: 'An error occured during sign up' },
      { status: 500 }
    );
  }
}
