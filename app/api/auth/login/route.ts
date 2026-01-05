import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/lib/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
  await dbConnect();
  try {
    const { email, password } = await req.json();
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json({ message: 'Неверные данные' }, { status: 401 });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '30d' });
    
    const userObj = user.toObject();
    const { password: _, ...userData } = userObj;
    
    return NextResponse.json({ token, user: userData });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}