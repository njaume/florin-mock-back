import { prisma } from '@/lib/prisma'

type Params = Promise<{ id: string }>;

export async function GET(
  req: Request,
  { params }: { params: Params } 
) {
  const {id} = await params
  console.log("id", id)

  if (!id) return new Response("No id", { status: 400 })

  try {
    const position = await prisma.position.findUnique({
      where: {
        positionId: id,
      },
    })

    if (!position) {
      return new Response("Position not found", { status: 404 })
    }

    return Response.json(position)
  } catch (error) {
    console.error('Error fetching position:', error)
    return new Response("Internal Server Error", { status: 500 })
  }
}

export async function PUT(req: Request) {
  const { searchParams } = new URL(req.url)
  const body = await req.json()

  const id = searchParams.get("id")
  console.log("id", id)
  if (!id) return new Response("No id", { status: 400 })

  //validate body
  if (!body) return new Response("No body", { status: 400 })

  try {
    const position = await prisma.position.update({
      where: {
        positionId: id,
      },
      data: {
        ...body,
        amount: body.amount ? BigInt(body.amount) : undefined,
        receivedAmount: body.receivedAmount ? BigInt(body.receivedAmount) : undefined,
      },
    })

    return Response.json(position)
  } catch (error) {
    console.error('Error updating position:', error)
    return new Response("Internal Server Error", { status: 500 })
  }
} 