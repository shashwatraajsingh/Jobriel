import axios from 'axios'

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions'

export async function chatWithGemini(
  messages: Array<{ role: string; content: string }>,
  context?: any
): Promise<string> {
  try {
    // Build conversation messages for OpenRouter
    const apiMessages: Array<{ role: string; content: string }> = []
    
    // Add system context if available
    const systemMessage = messages.find(m => m.role === 'system')
    let systemContent = systemMessage?.content || 'You are an interview preparation coach. Provide helpful, actionable advice. Be encouraging but honest. Focus on practical tips and specific examples.'
    
    // Add resume context to system message if available
    if (context?.text) {
      systemContent += `\n\nUser's Resume Context:\n${context.text.substring(0, 1000)}...`
    }
    
    apiMessages.push({
      role: 'system',
      content: systemContent
    })
    
    // Add conversation history (filter out system messages as we already added it)
    const userMessages = messages.filter(m => m.role !== 'system')
    userMessages.forEach(msg => {
      apiMessages.push({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.content
      })
    })

    const response = await axios.post(
      OPENROUTER_API_URL,
      {
        model: 'openai/gpt-4o-mini',
        messages: apiMessages
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPEN_ROUTER_API_KEY_BOT}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
          'X-Title': 'Job Prep Assistant'
        },
        timeout: 60000
      }
    )

    const content = response.data.choices[0].message.content
    return content
  } catch (error: any) {
    console.error('OpenRouter API error:', error)
    console.error('Error details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
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

    const response = await axios.post(
      OPENROUTER_API_URL,
      {
        model: 'openai/gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are an interview preparation expert. Create detailed, actionable study plans.'
          },
          {
            role: 'user',
            content: prompt
          }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPEN_ROUTER_API_KEY_BOT}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
          'X-Title': 'Job Prep Assistant'
        },
        timeout: 60000
      }
    )

    return response.data.choices[0].message.content
  } catch (error: any) {
    console.error('OpenRouter API error:', error)
    throw new Error(`Roadmap generation failed: ${error.message}`)
  }
}
