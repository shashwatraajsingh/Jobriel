import { NextRequest, NextResponse } from 'next/server'
import { chatWithGemini, generatePrepRoadmap } from '@/lib/gemini'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { messages, jobDescription, resumeData, action } = body

    if (action === 'start') {
      const initialMessage = `I'll help you prepare for this role! 

First, tell me about your current skills and experience related to this position. What technologies, tools, or concepts are you already familiar with?`

      return NextResponse.json({ message: initialMessage })
    }

    if (messages && messages.length > 0) {
      const systemContext = resumeData 
        ? `Context: User's resume shows experience in ${resumeData.jobRole}. Resume content: ${resumeData.text.substring(0, 500)}...`
        : ''

      const contextualMessages = [
        { role: 'system', content: `You are an interview preparation coach. ${systemContext}` },
        ...messages
      ]

      const response = await chatWithGemini(contextualMessages, resumeData)
      return NextResponse.json({ message: response })
    }

    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    )
  } catch (error: any) {
    console.error('Chat error details:', {
      message: error.message,
      status: error.status,
      code: error.code,
      stack: error.stack
    })
    return NextResponse.json(
      { error: 'Chat failed', details: error.message },
      { status: 500 }
    )
  }
}
