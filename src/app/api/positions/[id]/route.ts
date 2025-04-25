import { prisma } from '@/lib/prisma'
import { Position } from '@prisma/client'

type Params = Promise<{ id: string }>;

// Helper function to serialize BigInt
const serializePosition = (position: Position) => {
  return {
    ...position,
    amount: position.amount.toString(),
    receivedAmount: position.receivedAmount?.toString() || null,
  }
}

export async function GET(
  req: Request,
  { params }: { params: Params } 
) {
  const {id} = await params

  if (!id) return new Response("No id", { status: 400 })

  try {
    // First try to find by positionId
    let position = await prisma.position.findFirst({
      where: {
        positionId: id,
      },
    })

    // If not found, try to find by id
    if (!position) {
      position = await prisma.position.findUnique({
        where: {
          id: id,
        },
      })
    }

    if (!position) {
      return new Response("Position not found", { status: 404 })
    }

    return Response.json(serializePosition(position))
  } catch (error) {
    console.error('Error fetching position:', error)
    return new Response("Internal Server Error", { status: 500 })
  }
}

export async function PUT(req: Request, { params }: { params: Params }) {
  const { id } = await params
  const body = await req.json()

  
  if (!id) return new Response("No id", { status: 400 })

  //validate body
  if (!body) return new Response("No body", { status: 400 })

  try {
    // First try to find by positionId
    let position = await prisma.position.findFirst({
      where: {
        positionId: id,
      },
    })

    if (!position) {
      return new Response("Position not found", { status: 404 })
    }

    // Update using the found position's id
    position = await prisma.position.update({
      where: {
        id: position.id,
      },
      data: {
        ...body,
        amount: body.amount ? BigInt(body.amount) : undefined,
        receivedAmount: body.receivedAmount ? BigInt(body.receivedAmount) : undefined,
      },
    })

    return Response.json(serializePosition(position))
  } catch (error) {
    console.error('Error updating position:', error)
    return new Response("Internal Server Error", { status: 500 })
  }
} 