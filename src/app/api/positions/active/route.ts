import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const positions = await prisma.position.findMany({
      where: {
        state: 'ACTIVE',
      },
    })

    return Response.json(positions)
  } catch (error) {
    console.error('Error fetching active positions:', error)
    return new Response("Internal Server Error", { status: 500 })
  }
} 