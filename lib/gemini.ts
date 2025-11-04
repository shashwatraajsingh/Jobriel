import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function chatWithGemini(
  messages: Array<{ role: string; content: string }>,
  context?: any
): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-flash',
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      }
    })

    // Build conversation history with proper context
    let conversationHistory = ''
    
    // Add system context if available
    const systemMessage = messages.find(m => m.role === 'system')
    if (systemMessage) {
      conversationHistory += `System Instructions: ${systemMessage.content}\n\n`
    }
    
    // Add resume context if available
    if (context?.text) {
      conversationHistory += `User's Resume Context:\n${context.text.substring(0, 1000)}...\n\n`
    }
    
    // Add conversation history
    const userMessages = messages.filter(m => m.role !== 'system')
    conversationHistory += 'Conversation:\n'
    userMessages.forEach(msg => {
      const speaker = msg.role === 'user' ? 'User' : 'Assistant'
      conversationHistory += `${speaker}: ${msg.content}\n\n`
    })
    
    // Add coaching instructions
    conversationHistory += `\nAs an interview preparation coach, provide helpful, actionable advice. Be encouraging but honest. Focus on practical tips and specific examples.`

    const result = await model.generateContent(conversationHistory)
    const response = await result.response
    return response.text()
  } catch (error: any) {
    console.error('Gemini API error:', error)
    console.error('Error details:', {
      message: error.message,
      status: error.status,
      code: error.code
    })
    throw new Error(`Chat failed: ${error.message || 'Unknown error'}`)
  }
}

export async function generatePrepRoadmap(
  jobDescription: string,
  userSkills: string,
  days: number = 7
): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    const prompt = `Create a ${days}-day interview preparation roadmap for this job:

Job Description:
${jobDescription}

User's Current Skills:
${userSkills}

Provide a structured day-by-day plan with:
- Topics to study
- Practice questions
- Resources
- Time allocation

Format as a clear, actionable roadmap.`

    const result = await model.generateContent(prompt)
    const response = await result.response
    return response.text()
  } catch (error) {
    console.error('Gemini API error:', error)
    throw error
  }
}
