import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET() {
  try {
    // Simple test query
    const result = await query('SELECT NOW() as current_time')
    
    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      timestamp: result && Array.isArray(result.rows) ? result.rows[0]?.current_time : new Date().toISOString()
    })
  } catch (error) {
    console.error('Database test failed:', error)
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      message: 'Database connection failed'
    }, { status: 500 })
  }
}