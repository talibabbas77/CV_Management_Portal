import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(request) {
  await dbConnect();
  const { name, email, password } = await request.json();

  try {
    const alreadyExisted = await User.findOne({ email });
    if (alreadyExisted) {
      return NextResponse.json({ message: 'User already exists' }, { status: 422 });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashedPassword });
    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
