import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const finalityFlag = searchParams.get('finalityFlag')

  try {
    const positions = await prisma.position.findMany({
      where: {
        state: 'ACTIVE',
        ...(finalityFlag ? { finality: finalityFlag as 'FINAL' | 'PENDING' } : {}),
      },
    })

    return NextResponse.json(positions)
  } catch (error) {
    console.error('Error fetching active positions:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
} 