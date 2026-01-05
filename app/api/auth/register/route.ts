import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/lib/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
  await dbConnect();
  try {
    const { companyName, email, password, userType } = await req.json();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'Email уже занят' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      companyName: companyName || '',
      email,
      password: hashedPassword,
      userType: userType || 'personal',
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '30d' });

    return NextResponse.json({
      token,
      user: {
        _id: user._id, // --- ИСПРАВЛЕНИЕ (Пункт 5): используем _id как в Login
        email: user.email,
        companyName: user.companyName,
        userType: user.userType,
        role: user.role
      }
    }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}