import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const players = await prisma.player.findMany({
      orderBy: { name: 'asc' },
    });
    return NextResponse.json(players);
  } catch (error) {
    console.error('プレイヤー取得エラー:', error);
    return NextResponse.json(
      { error: 'プレイヤーの取得に失敗しました' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // バリデーション
    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: '名前とメールアドレスは必須です' },
        { status: 400 }
      );
    }
    
    // メールアドレスの重複チェック
    const existingPlayer = await prisma.player.findUnique({
      where: { email: body.email },
    });
    
    if (existingPlayer) {
      return NextResponse.json(
        { error: 'このメールアドレスは既に登録されています' },
        { status: 400 }
      );
    }
    
    // プレイヤー作成
    const newPlayer = await prisma.player.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        dateOfBirth: body.dateOfBirth ? new Date(body.dateOfBirth) : null,
        skillLevel: body.skillLevel || 'INTERMEDIATE',
      },
    });
    
    return NextResponse.json(newPlayer, { status: 201 });
  } catch (error) {
    console.error('プレイヤー作成エラー:', error);
    return NextResponse.json(
      { error: 'プレイヤーの作成に失敗しました' },
      { status: 500 }
    );
  }
} 