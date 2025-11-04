import { NextRequest, NextResponse } from 'next/server'
import { analyzeResumeForJob } from '@/lib/resumeChecker'

export async function GET() {
  return NextResponse.json({ message: 'Resume Checker endpoint is working. Use POST to analyze.' })
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('resume') as File
    const jobRole = formData.get('jobRole') as string

    if (!file) {
      return NextResponse.json(
        { error: 'No resume file provided' },
        { status: 400 }
      )
    }

    if (!jobRole) {
      return NextResponse.json(
        { error: 'Job role is required' },
        { status: 400 }
      )
    }

    // Validate file type
    if (file.type !== 'application/pdf') {
      return NextResponse.json(
        { error: 'Only PDF files are supported' },
        { status: 400 }
      )
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File size must be less than 5MB' },
        { status: 400 }
      )
    }

    // Convert file to text
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    
    // Analyze resume
    console.log('Starting resume analysis for job role:', jobRole)
    const analysis = await analyzeResumeForJob(buffer, jobRole)
    console.log('Resume analysis completed successfully')

    return NextResponse.json({
      success: true,
      analysis,
      jobRole
    })
  } catch (error: any) {
    console.error('Resume analysis error:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to analyze resume', 
        details: error.message || 'Unknown error occurred'
      },
      { status: 500 }
    )
  }
}
