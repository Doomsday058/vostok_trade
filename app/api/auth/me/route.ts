import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import dbConnect from '@/lib/db';
import User from '@/lib/models/User';
import jwt from 'jsonwebtoken';

export async function GET() {
  await dbConnect();
  
  const headersList = await headers();
  const token = headersList.get('authorization')?.split(' ')[1];

  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) return NextResponse.json({ message: 'User not found' }, { status: 404 });

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }
}