import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  const { searchParams } = new URL(request.url)
  const finalityFlag = searchParams.get('finalityFlag')

  try {
    const reservation = await prisma.reservation.findUnique({
      where: {
        reservationId: context.params.id,
        ...(finalityFlag ? { finality: finalityFlag as 'FINAL' | 'PENDING' } : {}),
      },
    })

    if (!reservation) {
      return NextResponse.json({ error: 'Reservation not found' }, { status: 404 })
    }

    return NextResponse.json(reservation)
  } catch (error) {
    console.error('Error fetching reservation:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
} 