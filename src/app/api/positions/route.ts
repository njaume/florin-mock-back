import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Position } from '@prisma/client'

// Helper function to serialize BigInt
const serializePosition = (position: Position) => {
  return {
    ...position,
    amount: position.amount.toString(),
    receivedAmount: position.receivedAmount?.toString() || null,
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const ownerId = searchParams.get('ownerId')
  const finalityFlag = searchParams.get('finalityFlag')

  try {
    const positions = await prisma.position.findMany({
      where: {
        ...(ownerId ? { ownerAddress: ownerId } : {}),
        ...(finalityFlag ? { finality: finalityFlag as 'FINAL' | 'PENDING' } : {}),
      },
    })
    return NextResponse.json(positions.map(serializePosition))
  } catch (error) {
    console.error('Error fetching positions:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const position = await prisma.position.create({
      data: {
        positionId: body.positionId,
        ownerAddress: body.ownerAddress,
        state: body.state,
        finality: body.finality,
        amount: BigInt(body.amount),
        contractRegistrationTxHash: body.contractRegistrationTxHash,
        contractRegistrationConfirmations: body.contractRegistrationConfirmations,
        originTxHash: body.originTxHash,
        destinationTxHash: body.destinationTxHash,
        receivedAmount: body.receivedAmount ? BigInt(body.receivedAmount) : null,
        receivedAt: body.receivedAt ? new Date(body.receivedAt) : null,
        bitcoinAddress: body.bitcoinAddress,
      },
    })

    return NextResponse.json(serializePosition(position))
  } catch (error) {
    console.error('Error creating position:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
} 