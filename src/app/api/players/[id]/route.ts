import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const player = await prisma.player.findUnique({
      where: { id: params.id },
      include: {
        teamMemberships: {
          include: {
            team: true,
          },
        },
        matchParticipations: {
          include: {
            match: true,
          },
        },
      },
    });

    if (!player) {
      return NextResponse.json(
        { error: 'プレイヤーが見つかりません' },
        { status: 404 }
      );
    }

    return NextResponse.json(player);
  } catch (error) {
    console.error('プレイヤー取得エラー:', error);
    return NextResponse.json(
      { error: 'プレイヤーの取得に失敗しました' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    // バリデーション
    if (!body.name) {
      return NextResponse.json(
        { error: '名前は必須です' },
        { status: 400 }
      );
    }

    // プレイヤーの存在確認
    const player = await prisma.player.findUnique({
      where: { id: params.id },
    });

    if (!player) {
      return NextResponse.json(
        { error: 'プレイヤーが見つかりません' },
        { status: 404 }
      );
    }

    // プレイヤー更新
    const updatedPlayer = await prisma.player.update({
      where: { id: params.id },
      data: {
        name: body.name,
        isActive: body.isActive !== undefined ? body.isActive : player.isActive,
        isMember: body.isMember !== undefined ? body.isMember : player.isMember,
      },
    });

    return NextResponse.json(updatedPlayer);
  } catch (error) {
    console.error('プレイヤー更新エラー:', error);
    return NextResponse.json(
      { error: 'プレイヤーの更新に失敗しました' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // プレイヤーの存在確認
    const player = await prisma.player.findUnique({
      where: { id: params.id },
    });

    if (!player) {
      return NextResponse.json(
        { error: 'プレイヤーが見つかりません' },
        { status: 404 }
      );
    }

    // プレイヤー削除
    await prisma.player.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('プレイヤー削除エラー:', error);
    return NextResponse.json(
      { error: 'プレイヤーの削除に失敗しました' },
      { status: 500 }
    );
  }
} 