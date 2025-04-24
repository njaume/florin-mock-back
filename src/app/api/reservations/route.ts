import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const ownerId = searchParams.get('ownerId')
  const finalityFlag = searchParams.get('finalityFlag')

  try {
    const reservations = await prisma.reservation.findMany({
      where: {
        ...(ownerId ? { ownerAddress: ownerId } : {}),
        ...(finalityFlag ? { finality: finalityFlag as 'FINAL' | 'PENDING' } : {}),
      },
    })

    return NextResponse.json(reservations)
  } catch (error) {
    console.error('Error fetching reservations:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const reservation = await prisma.reservation.create({
      data: {
        reservationId: body.reservationId,
        ownerAddress: body.ownerAddress,
        state: body.state,
        finality: body.finality,
        amount: BigInt(body.amount),
        positionId: body.positionId,
        contractRegistrationTxHash: body.contractRegistrationTxHash,
        contractRegistrationConfirmations: body.contractRegistrationConfirmations,
        originTxHash: body.originTxHash,
        destinationTxHash: body.destinationTxHash,
        receivedAmount: body.receivedAmount ? BigInt(body.receivedAmount) : null,
        receivedAt: body.receivedAt ? new Date(body.receivedAt) : null,
        bitcoinAddress: body.bitcoinAddress,
      },
    })

    return NextResponse.json(reservation)
  } catch (error) {
    console.error('Error creating reservation:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
} 