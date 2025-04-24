import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  const { searchParams } = new URL(request.url)
  const finalityFlag = searchParams.get('finalityFlag')

  try {
    const position = await prisma.position.findUnique({
      where: {
        positionId: context.params.id,
        ...(finalityFlag ? { finality: finalityFlag as 'FINAL' | 'PENDING' } : {}),
      },
    })

    if (!position) {
      return NextResponse.json({ error: 'Position not found' }, { status: 404 })
    }

    return NextResponse.json(position)
  } catch (error) {
    console.error('Error fetching position:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
} 