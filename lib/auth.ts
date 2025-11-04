import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { createUser as createUserInDB, getUserByEmail as getUserByEmailFromDB, getUserById as getUserByIdFromDB } from './db'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export interface User {
  id: string
  email: string
  name: string
  created_at: Date
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export function generateToken(userId: string): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' })
}

export function verifyToken(token: string): { userId: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string }
  } catch {
    return null
  }
}

export async function createUser(email: string, password: string, name: string): Promise<User> {
  const hashedPassword = await hashPassword(password)
  
  try {
    const user = await createUserInDB(email, hashedPassword, name)
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      created_at: user.created_at
    }
  } catch (error) {
    console.error('Error creating user:', error)
    throw new Error('Failed to create user')
  }
}

export async function getUserByEmail(email: string): Promise<User & { password: string } | null> {
  try {
    const user = await getUserByEmailFromDB(email)
    return user as any
  } catch (error) {
    console.error('Database error in getUserByEmail:', error)
    throw new Error('Database connection failed')
  }
}

export async function getUserById(id: string): Promise<User | null> {
  try {
    const user = await getUserByIdFromDB(id)
    return user as any
  } catch (error) {
    console.error('Error getting user by ID:', error)
    return null
  }
}
