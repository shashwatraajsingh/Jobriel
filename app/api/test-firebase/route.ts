import { NextResponse } from 'next/server'
import { db, COLLECTIONS } from '@/lib/firebase'

export async function GET() {
  try {
    console.log('Testing Firebase connection...')
    
    // Try to access Firestore
    const testRef = db.collection('_test')
    await testRef.doc('connection-test').set({
      timestamp: new Date(),
      message: 'Firebase connection successful!'
    })
    
    // Read it back
    const doc = await testRef.doc('connection-test').get()
    const data = doc.data()
    
    // Clean up
    await testRef.doc('connection-test').delete()
    
    return NextResponse.json({
      success: true,
      message: 'Firebase Firestore is connected and working!',
      projectId: process.env.FIREBASE_PROJECT_ID,
      testData: data
    })
  } catch (error: any) {
    console.error('Firebase test failed:', error)
    
    return NextResponse.json({
      success: false,
      error: error.message,
      code: error.code,
      details: error.details
    }, { status: 500 })
  }
}
