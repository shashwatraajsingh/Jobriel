import { db, COLLECTIONS } from './firebase'
import { Timestamp } from 'firebase-admin/firestore'

// User operations
export async function createUser(email: string, password: string, name: string) {
  const userRef = db.collection(COLLECTIONS.USERS).doc()
  const userData = {
    id: userRef.id,
    email,
    password,
    name,
    created_at: Timestamp.now()
  }
  
  await userRef.set(userData)
  return { ...userData, created_at: userData.created_at.toDate() }
}

export async function getUserByEmail(email: string) {
  const snapshot = await db.collection(COLLECTIONS.USERS)
    .where('email', '==', email)
    .limit(1)
    .get()
  
  if (snapshot.empty) {
    return null
  }
  
  const doc = snapshot.docs[0]
  const data = doc.data()
  return {
    id: doc.id,
    ...data,
    created_at: data.created_at?.toDate()
  }
}

export async function getUserById(id: string) {
  const doc = await db.collection(COLLECTIONS.USERS).doc(id).get()
  
  if (!doc.exists) {
    return null
  }
  
  const data = doc.data()
  return {
    id: doc.id,
    ...data,
    created_at: data?.created_at?.toDate()
  }
}

// Resume operations
export async function createResume(userId: string, content: string, jobRole: string, atsScore: number) {
  const resumeRef = db.collection(COLLECTIONS.RESUMES).doc()
  const resumeData = {
    id: resumeRef.id,
    user_id: userId,
    content,
    job_role: jobRole,
    ats_score: atsScore,
    created_at: Timestamp.now()
  }
  
  await resumeRef.set(resumeData)
  return { ...resumeData, created_at: resumeData.created_at.toDate() }
}

export async function getResumesByUserId(userId: string) {
  const snapshot = await db.collection(COLLECTIONS.RESUMES)
    .where('user_id', '==', userId)
    .orderBy('created_at', 'desc')
    .get()
  
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    created_at: doc.data().created_at?.toDate()
  }))
}

// Prep session operations
export async function createPrepSession(userId: string, resumeId: string, jobDescription: string, roadmap: string) {
  const sessionRef = db.collection(COLLECTIONS.PREP_SESSIONS).doc()
  const sessionData = {
    id: sessionRef.id,
    user_id: userId,
    resume_id: resumeId,
    job_description: jobDescription,
    roadmap,
    created_at: Timestamp.now()
  }
  
  await sessionRef.set(sessionData)
  return { ...sessionData, created_at: sessionData.created_at.toDate() }
}

export async function getPrepSessionsByUserId(userId: string) {
  const snapshot = await db.collection(COLLECTIONS.PREP_SESSIONS)
    .where('user_id', '==', userId)
    .orderBy('created_at', 'desc')
    .get()
  
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    created_at: doc.data().created_at?.toDate()
  }))
}

// Initialize database (no-op for Firestore, collections are created automatically)
export async function initDB() {
  console.log('Firebase Firestore initialized - collections will be created automatically')
  return true
}

// Legacy compatibility functions
export async function query(text: string, params?: any[]) {
  throw new Error('Direct SQL queries not supported with Firebase. Use specific functions instead.')
}

export async function safeQuery(text: string, params?: any[]) {
  throw new Error('Direct SQL queries not supported with Firebase. Use specific functions instead.')
}

export async function wakeUpDatabase() {
  // Firebase doesn't need wake-up
  return true
}
