import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET() {
  try {
    console.log('Attempting to wake up database...')
    
    // Simple query to wake up the database
    const result = await query('SELECT NOW() as current_time')
    
    return NextResponse.json({
      success: true,
      message: 'Database is awake',
      timestamp: result.rows[0].current_time
    })
  } catch (error: any) {
    console.error('Database wake-up failed:', error)
    
    return NextResponse.json({
      success: false,
      error: error.message,
      code: error.code
    }, { status: 500 })
  }
}