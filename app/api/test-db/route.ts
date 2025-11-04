import { NextResponse } from 'next/server'
import { db } from '@/lib/firebase'

export async function GET() {
  try {
    // Simple test query - check Firebase connection
    const testRef = db.collection('_test').doc('connection')
    await testRef.set({ timestamp: new Date().toISOString() })
    const doc = await testRef.get()
    
    return NextResponse.json({
      success: true,
      message: 'Firebase connection successful',
      timestamp: doc.data()?.timestamp || new Date().toISOString()
    })
  } catch (error) {
    console.error('Firebase test failed:', error)
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      message: 'Firebase connection failed'
    }, { status: 500 })
  }
}