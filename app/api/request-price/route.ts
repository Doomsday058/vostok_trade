import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import dbConnect from '@/lib/db';
import PriceRequest from '@/lib/models/PriceRequest';
import User from '@/lib/models/User';
import { sendPriceByEmail } from '@/lib/mailer';
import jwt from 'jsonwebtoken';

async function getUserFromToken() {
  const headersList = await headers();
  const token = headersList.get('authorization')?.split(' ')[1];
  if (!token) return null;
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    await dbConnect();
    return await User.findById(decoded.id);
  } catch {
    return null;
  }
}

export async function GET() {
  const user = await getUserFromToken();
  if (!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  try {
    const requests = await PriceRequest.find({ user: user._id }).sort({ createdAt: -1 });
    return NextResponse.json(requests);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching requests' }, { status: 500 });
  }
}

export async function POST() {
  const user = await getUserFromToken();
  if (!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  let requestStatus = 'sent';

  try {
    try {
        await sendPriceByEmail(user.email);
    } catch (mailError) {
        console.error("Mail error:", mailError);
        requestStatus = 'failed'; 
    }

    await PriceRequest.create({
      user: user._id,
      email: user.email,
      status: requestStatus, 
      expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
    });

    if (requestStatus === 'failed') {
       return NextResponse.json({ message: 'Ошибка отправки письма' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Прайс отправлен' });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}