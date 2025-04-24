import { prisma } from '@/lib/prisma'
import { Reservation } from '@prisma/client'

type Params = Promise<{ id: string }>;

// Helper function to serialize BigInt
const serializeReservation = (reservation: Reservation) => {
  return {
    ...reservation,
    amount: reservation.amount.toString(),
    receivedAmount: reservation.receivedAmount?.toString() || null,
  }
}

export async function GET(
  req: Request,
  { params }: { params: Params }
) {
  const {id} = await params

  if (!id) return new Response("No id", { status: 400 })

  try {
    // First try to find by reservationId
    let reservation = await prisma.reservation.findFirst({
      where: {
        reservationId: id,
      },
    })

    // If not found, try to find by id
    if (!reservation) {
      reservation = await prisma.reservation.findUnique({
        where: {
          id: id,
        },
      })
    }

    if (!reservation) {
      return new Response("Reservation not found", { status: 404 })
    }

    return Response.json(serializeReservation(reservation))
  } catch (error) {
    console.error('Error fetching reservation:', error)
    return new Response("Internal Server Error", { status: 500 })
  }
}

export async function PUT(req: Request) {
  const { searchParams } = new URL(req.url)
  const body = await req.json()

  const id = searchParams.get("id")
  if (!id) return new Response("No id", { status: 400 })

  //validate body
  if (!body) return new Response("No body", { status: 400 })

  try {
    // First try to find by reservationId
    let reservation = await prisma.reservation.findFirst({
      where: {
        reservationId: id,
      },
    })

    if (!reservation) {
      return new Response("Reservation not found", { status: 404 })
    }

    // Update using the found reservation's id
    reservation = await prisma.reservation.update({
      where: {
        id: reservation.id,
      },
      data: {
        ...body,
        amount: body.amount ? BigInt(body.amount) : undefined,
        receivedAmount: body.receivedAmount ? BigInt(body.receivedAmount) : undefined,
      },
    })

    return Response.json(serializeReservation(reservation))
  } catch (error) {
    console.error('Error updating reservation:', error)
    return new Response("Internal Server Error", { status: 500 })
  }
} 