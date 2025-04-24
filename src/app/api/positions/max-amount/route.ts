import { NextResponse } from 'next/server'

export async function GET() {
  // En un entorno real, esto vendría de una configuración o servicio externo
  const maxAmount = BigInt(1000000)
  
  return NextResponse.json({ maxAmount: maxAmount.toString() })
} 