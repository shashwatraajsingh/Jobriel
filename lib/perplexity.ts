import axios from 'axios'

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions'

export async function analyzeResumeWithPerplexity(
  resumeText: string,
  jobRole: string
): Promise<any> {
  try {
    const response = await axios.post(
      OPENROUTER_API_URL,
      {
        model: 'meta-llama/llama-3.1-8b-instruct',
        messages: [
          {
            role: 'system',
            content: 'You are an ATS expert. Analyze resumes and provide scores with detailed feedback. ALWAYS respond with ONLY valid JSON, no additional text or markdown.'
          },
          {
            role: 'user',
            content: `Analyze this resume for the role of ${jobRole}.

Resume:
${resumeText}

Respond with ONLY this JSON structure (no markdown, no code blocks, just pure JSON):
{
  "score": <number 0-100>,
  "strengths": ["strength 1", "strength 2", "strength 3"],
  "weaknesses": ["weakness 1", "weakness 2", "weakness 3"],
  "suggestions": ["suggestion 1", "suggestion 2", "suggestion 3", "suggestion 4", "suggestion 5"]
}`
          }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPEN_ROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
          'X-Title': 'Job Prep Assistant'
        }
      }
    )

    const content = response.data.choices[0].message.content
    console.log('AI Response received:', content.substring(0, 200))
    
    // Try multiple JSON extraction methods
    let jsonContent = content.trim()
    
    // Method 1: Extract from markdown code blocks (```json ... ``` or ``` ... ```)
    const codeBlockMatch = content.match(/```(?:json)?\s*([\s\S]*?)\s*```/)
    if (codeBlockMatch) {
      jsonContent = codeBlockMatch[1].trim()
      console.log('Extracted from code block')
    }
    
    // Method 2: Find JSON object boundaries
    const jsonObjectMatch = jsonContent.match(/\{[\s\S]*\}/)
    if (jsonObjectMatch) {
      jsonContent = jsonObjectMatch[0]
      console.log('Extracted JSON object')
    }
    
    // Method 3: Try to parse as-is
    try {
      const parsed = JSON.parse(jsonContent)
      console.log('Successfully parsed JSON')
      return parsed
    } catch (parseError) {
      console.warn('JSON parsing failed, attempting to extract data from text:', parseError)
      
      // Method 4: Try to extract structured data from plain text
      try {
        const scoreMatch = content.match(/(?:score|ats[_\s]?score)[:\s]+(\d+)/i)
        const score = scoreMatch ? parseInt(scoreMatch[1]) : 75
        
        // Extract strengths
        const strengthsSection = content.match(/strengths?[:\s]+([\s\S]*?)(?:weaknesses?|suggestions?|$)/i)
        const strengths = strengthsSection 
          ? strengthsSection[1].split(/\n|[•\-\d]+\./).filter((s: string) => s.trim().length > 10).slice(0, 3).map((s: string) => s.trim())
          : ['Experience matches job requirements', 'Clear formatting', 'Relevant skills listed']
        
        // Extract weaknesses
        const weaknessesSection = content.match(/weaknesses?[:\s]+([\s\S]*?)(?:suggestions?|improvements?|$)/i)
        const weaknesses = weaknessesSection
          ? weaknessesSection[1].split(/\n|[•\-\d]+\./).filter((s: string) => s.trim().length > 10).slice(0, 3).map((s: string) => s.trim())
          : ['Could add more quantifiable achievements', 'Missing keywords', 'Limited project details']
        
        // Extract suggestions
        const suggestionsSection = content.match(/(?:suggestions?|improvements?)[:\s]+([\s\S]*?)$/i)
        const suggestions = suggestionsSection
          ? suggestionsSection[1].split(/\n|[•\-\d]+\./).filter((s: string) => s.trim().length > 10).slice(0, 5).map((s: string) => s.trim())
          : [
              'Add metrics to demonstrate impact (e.g., "Increased efficiency by 30%")',
              'Include more industry-specific keywords from the job description',
              'Expand on technical projects with specific technologies used',
              'Add a professional summary section at the top',
              'Ensure consistent formatting throughout the document'
            ]
        
        console.log('Extracted structured data from text')
        return {
          score,
          strengths: strengths.length > 0 ? strengths : ['Experience matches job requirements', 'Clear formatting', 'Relevant skills listed'],
          weaknesses: weaknesses.length > 0 ? weaknesses : ['Could add more quantifiable achievements', 'Missing keywords', 'Limited project details'],
          suggestions: suggestions.length > 0 ? suggestions : [
            'Add metrics to demonstrate impact',
            'Include more keywords from job description',
            'Expand on technical projects',
            'Add professional summary',
            'Ensure consistent formatting'
          ],
          rawResponse: content
        }
      } catch (extractError) {
        console.error('Failed to extract data from text:', extractError)
        // Final fallback with generic but useful advice
        return {
          score: 70,
          strengths: ['Resume uploaded successfully', 'Content is readable', 'Basic structure present'],
          weaknesses: ['Unable to perform detailed analysis', 'May need better formatting', 'Consider reviewing content'],
          suggestions: [
            'Ensure resume has clear sections (Experience, Education, Skills)',
            'Add quantifiable achievements with numbers and percentages',
            'Include relevant keywords from the job description',
            'Use action verbs to describe your responsibilities',
            'Keep formatting consistent throughout the document'
          ],
          rawResponse: content,
          note: 'AI analysis encountered an issue. Please try again or check your API key.'
        }
      }
    }
  } catch (error: any) {
    console.error('OpenRouter API error:', error)
    console.error('Error details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    })
    throw new Error(`Resume analysis failed: ${error.message}`)
  }
}
