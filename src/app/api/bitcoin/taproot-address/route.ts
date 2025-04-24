import { NextResponse } from 'next/server'

export async function GET() {
  // En un entorno real, esto vendría de una configuración o servicio externo
  const taprootAddress = '0x9f3c9346dd5edc74032aef79b3e4585f7a4dffb51aa3780704e63f87c4170dd3'
  
  return NextResponse.json({ address: taprootAddress })
} 