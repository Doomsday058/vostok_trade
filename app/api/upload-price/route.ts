import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import dbConnect from '@/lib/db';
import Product from '@/lib/models/Product';
import User from '@/lib/models/User';
import jwt from 'jsonwebtoken';
import * as xlsx from 'xlsx';

export async function POST(req: Request) {
  await dbConnect();
  
  const headersList = await headers();
  const token = headersList.get('authorization')?.split(' ')[1];

  if (!token) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const user = await User.findById(decoded.id);

    if (user?.role !== 'admin') {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as Blob;
    
    if (!file) return NextResponse.json({ message: 'File required' }, { status: 400 });

    const buffer = Buffer.from(await file.arrayBuffer());
    const workbook = xlsx.read(buffer, { type: 'buffer' });
    
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet); 

    await Product.deleteMany({});
    await Product.insertMany(data);

    return NextResponse.json({ success: true, count: data.length });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}