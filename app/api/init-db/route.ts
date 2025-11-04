import { NextResponse } from 'next/server'
import { initDB } from '@/lib/db'

export async function POST() {
  try {
    console.log('Initializing database tables...')
    
    await initDB()
    
    return NextResponse.json({
      success: true,
      message: 'Database tables initialized successfully'
    })
  } catch (error: any) {
    console.error('Database initialization failed:', error)
    
    return NextResponse.json({
      success: false,
      error: error.message,
      code: error.code
    }, { status: 500 })
  }
}