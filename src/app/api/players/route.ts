import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    console.log('プレイヤー一覧を取得しようとしています...');
    const players = await prisma.player.findMany({
      orderBy: { name: 'asc' },
    });
    console.log('プレイヤー一覧取得成功:', players.length, '件');
    return NextResponse.json(players);
  } catch (error) {
    console.error('プレイヤー取得エラー詳細:', error);
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
    if (!body.name) {
      return NextResponse.json(
        { error: '名前は必須です' },
        { status: 400 }
      );
    }
    
    // プレイヤー作成
    const newPlayer = await prisma.player.create({
      data: {
        name: body.name,
        isActive: body.isActive !== undefined ? body.isActive : true,
      },
    });
    
    return NextResponse.json(newPlayer, { status: 201 });
  } catch (error) {
    console.error('プレイヤー作成エラー詳細:', error);
    return NextResponse.json(
      { error: 'プレイヤーの作成に失敗しました' },
      { status: 500 }
    );
  }
} 