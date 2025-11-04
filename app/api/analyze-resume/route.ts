import { NextRequest, NextResponse } from 'next/server'
import { analyzeLinkedInProfile } from '@/lib/linkedinAnalyzer'

export async function GET() {
  return NextResponse.json({ message: 'LinkedIn Profile Analyzer endpoint is working. Use POST to analyze.' })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { profileData, jobRole } = body

    if (!profileData) {
      return NextResponse.json(
        { error: 'No profile data provided' },
        { status: 400 }
      )
    }

    if (!jobRole) {
      return NextResponse.json(
        { error: 'Job role is required' },
        { status: 400 }
      )
    }

    // Validate profile data structure
    const requiredFields = ['headline', 'summary', 'experience', 'skills']
    const missingFields = requiredFields.filter(field => !profileData[field])
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      )
    }

    // Analyze LinkedIn profile
    console.log('Starting LinkedIn profile analysis for job role:', jobRole)
    const analysis = await analyzeLinkedInProfile(profileData, jobRole)
    console.log('Profile analysis completed successfully')

    return NextResponse.json({
      success: true,
      analysis,
      jobRole
    })
  } catch (error: any) {
    console.error('Profile analysis error:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to analyze profile', 
        details: error.message || 'Unknown error occurred'
      },
      { status: 500 }
    )
  }
}
