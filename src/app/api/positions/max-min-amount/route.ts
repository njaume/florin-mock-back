import { NextResponse } from 'next/server'

export async function GET() {
  // En un entorno real, esto vendría de una configuración o servicio externo
  const maxAmount = 1000000
  const minAmount = 0.0004
  return NextResponse.json({ maxAmount: maxAmount, minAmount: minAmount })
} 