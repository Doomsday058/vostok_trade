import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import mongoose from 'mongoose';
import dbConnect from '@/lib/db';
import Product from '@/lib/models/Product';
import User from '@/lib/models/User';
import jwt from 'jsonwebtoken';
import * as xlsx from 'xlsx';
import { parseRows } from '@/lib/priceImport';

const MAX_REPORTED_ERRORS = 20;

export async function POST(req: Request) {
  await dbConnect();

  const headersList = await headers();
  const token = headersList.get('authorization')?.split(' ')[1];
  if (!token) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  let decoded: any;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET!);
  } catch {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const user = await User.findById(decoded.id);
    if (user?.role !== 'admin') {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as Blob | null;
    if (!file) return NextResponse.json({ message: 'File required' }, { status: 400 });

    const workbook = xlsx.read(Buffer.from(await file.arrayBuffer()), { type: 'buffer' });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = xlsx.utils.sheet_to_json<Record<string, unknown>>(worksheet, { defval: '' });

    const { products, errors } = parseRows(rows);

    // Каталог заменяется только целиком корректным файлом: иначе одна битая строка
    // или пустой лист оставили бы магазин без товаров
    if (errors.length > 0) {
      return NextResponse.json(
        {
          message: `В файле ${errors.length} ошибок, каталог не изменён`,
          errors: errors.slice(0, MAX_REPORTED_ERRORS),
        },
        { status: 400 },
      );
    }
    if (products.length === 0) {
      return NextResponse.json({ message: 'В файле нет товаров, каталог не изменён' }, { status: 400 });
    }

    // Удаление и вставка в одной транзакции: при сбое вставки остаётся старый каталог
    const session = await mongoose.startSession();
    try {
      await session.withTransaction(async () => {
        await Product.deleteMany({}, { session });
        await Product.insertMany(products, { session });
      });
    } finally {
      await session.endSession();
    }

    return NextResponse.json({ success: true, count: products.length });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
