import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const reservations = await prisma.reservation.findMany({
      where: {
        state: 'ACTIVE',
      },
    })

    return Response.json(reservations)
  } catch (error) {
    console.error('Error fetching active reservations:', error)
    return new Response("Internal Server Error", { status: 500 })
  }
} 