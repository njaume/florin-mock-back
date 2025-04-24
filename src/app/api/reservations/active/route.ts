import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const reservations = await prisma.reservation.findMany({
      where: {
        state: 'ACTIVE',
      },
    })

    return NextResponse.json(reservations)
  } catch (error) {
    console.error('Error fetching active reservations:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
} 