import { initializeApp, getApps, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import * as path from 'path'
import * as fs from 'fs'

// Initialize Firebase Admin
if (!getApps().length) {
  try {
    // Try to use service account from environment variable (production)
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
      const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
      initializeApp({
        credential: cert(serviceAccount)
      })
      console.log('Firebase initialized with service account from environment')
    } 
    // Try to use service account file (development)
    else {
      const serviceAccountPath = path.join(process.cwd(), 'firebase-service-account.json')
      
      if (fs.existsSync(serviceAccountPath)) {
        const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'))
        initializeApp({
          credential: cert(serviceAccount)
        })
        console.log('Firebase initialized with service account file')
      } else {
        // Fallback to project ID only (limited functionality)
        console.warn('No service account found. Please add firebase-service-account.json or set FIREBASE_SERVICE_ACCOUNT env variable')
        initializeApp({
          projectId: process.env.FIREBASE_PROJECT_ID
        })
      }
    }
  } catch (error) {
    console.error('Firebase initialization error:', error)
    throw error
  }
}

export const db = getFirestore()

// Collection names
export const COLLECTIONS = {
  USERS: 'users',
  RESUMES: 'resumes',
  PREP_SESSIONS: 'prep_sessions'
}
