import { NextResponse } from 'next/server'
import { db } from '@/lib/firebase'

export async function GET() {
  try {
    console.log('Waking up Firebase...')
    const testRef = db.collection('_health').doc('check')
    await testRef.set({ timestamp: new Date().toISOString(), status: 'awake' })
    console.log('Firebase is awake!')
    
    return NextResponse.json({
      success: true,
      message: 'Firebase is awake',
      timestamp: new Date().toISOString()
    })
  } catch (error: any) {
    console.error('Firebase wake-up failed:', error)
    
    return NextResponse.json({
      success: false,
      error: error.message,
      message: 'Firebase wake-up failed'
    }, { status: 500 })
  }
}