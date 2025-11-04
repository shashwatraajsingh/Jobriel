import axios from 'axios'

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions'

interface LinkedInProfile {
  headline: string
  summary: string
  experience: string
  skills: string
  education?: string
  certifications?: string
}

interface ProfileAnalysis {
  overallScore: number
  profileCompleteness: number
  keywordMatch: number
  profileStrength: {
    headline: { score: number; feedback: string }
    summary: { score: number; feedback: string }
    experience: { score: number; feedback: string }
    skills: { score: number; feedback: string }
  }
  strengths: string[]
  weaknesses: string[]
  suggestions: string[]
  missingElements: string[]
}

export async function analyzeLinkedInProfile(
  profileData: LinkedInProfile,
  jobRole: string
): Promise<ProfileAnalysis> {
  try {
    // Build profile text
    const profileText = `
HEADLINE: ${profileData.headline}

SUMMARY: ${profileData.summary}

EXPERIENCE: ${profileData.experience}

SKILLS: ${profileData.skills}

${profileData.education ? `EDUCATION: ${profileData.education}` : ''}
${profileData.certifications ? `CERTIFICATIONS: ${profileData.certifications}` : ''}
    `.trim()

    const response = await axios.post(
      OPENROUTER_API_URL,
      {
        model: 'openai/gpt-4o-mini',
        messages: [
          {
            role: 'user',
            content: `You are a LinkedIn profile optimization expert and recruiter. Analyze LinkedIn profiles and provide detailed, actionable feedback.

Analyze this LinkedIn profile for the role of ${jobRole}.

${profileText}

Respond with ONLY this JSON structure (no markdown, no code blocks, just pure JSON):
{
  "overallScore": <number 0-100>,
  "profileCompleteness": <number 0-100>,
  "keywordMatch": <number 0-100>,
  "profileStrength": {
    "headline": { "score": <number 0-100>, "feedback": "<specific feedback>" },
    "summary": { "score": <number 0-100>, "feedback": "<specific feedback>" },
    "experience": { "score": <number 0-100>, "feedback": "<specific feedback>" },
    "skills": { "score": <number 0-100>, "feedback": "<specific feedback>" }
  },
  "strengths": ["strength 1", "strength 2", "strength 3"],
  "weaknesses": ["weakness 1", "weakness 2", "weakness 3"],
  "suggestions": ["suggestion 1", "suggestion 2", "suggestion 3", "suggestion 4", "suggestion 5"],
  "missingElements": ["missing element 1", "missing element 2"]
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
        },
        timeout: 60000
      }
    ).catch(error => {
      console.error('OpenRouter API Error:', error.response?.data || error.message)
      throw new Error(`AI API failed: ${error.response?.data?.error?.message || error.message}`)
    })

    const content = response.data.choices[0].message.content
    console.log('AI Response received:', content.substring(0, 200))
    
    // Extract JSON from response
    let jsonContent = content.trim()
    
    // Remove markdown code blocks if present
    const codeBlockMatch = content.match(/```(?:json)?\s*([\s\S]*?)\s*```/)
    if (codeBlockMatch) {
      jsonContent = codeBlockMatch[1].trim()
    }
    
    // Extract JSON object
    const jsonObjectMatch = jsonContent.match(/\{[\s\S]*\}/)
    if (jsonObjectMatch) {
      jsonContent = jsonObjectMatch[0]
    }
    
    try {
      const parsed = JSON.parse(jsonContent)
      console.log('Successfully parsed JSON')
      return parsed
    } catch (parseError) {
      console.warn('JSON parsing failed, using fallback analysis')
      return generateFallbackAnalysis(profileData, jobRole)
    }
  } catch (error: any) {
    console.error('LinkedIn profile analysis error:', error)
    console.error('Error details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    })
    
    // Return fallback analysis instead of throwing
    return generateFallbackAnalysis(profileData, jobRole)
  }
}

function generateFallbackAnalysis(
  profileData: LinkedInProfile,
  jobRole: string
): ProfileAnalysis {
  // Calculate basic scores based on content length and presence
  const headlineScore = Math.min(100, (profileData.headline.length / 120) * 100)
  const summaryScore = Math.min(100, (profileData.summary.length / 300) * 100)
  const experienceScore = Math.min(100, (profileData.experience.length / 500) * 100)
  const skillsScore = Math.min(100, (profileData.skills.split(',').length * 10))
  
  const overallScore = Math.round(
    (headlineScore + summaryScore + experienceScore + skillsScore) / 4
  )
  
  const hasEducation = !!profileData.education
  const hasCertifications = !!profileData.certifications
  const completeness = Math.round(
    ((hasEducation ? 20 : 0) + (hasCertifications ? 20 : 0) + 60)
  )
  
  const missingElements: string[] = []
  if (!hasEducation) missingElements.push('Education section')
  if (!hasCertifications) missingElements.push('Certifications')
  if (profileData.headline.length < 50) missingElements.push('Detailed headline')
  if (profileData.summary.length < 200) missingElements.push('Comprehensive summary')
  
  return {
    overallScore,
    profileCompleteness: completeness,
    keywordMatch: 70,
    profileStrength: {
      headline: {
        score: Math.round(headlineScore),
        feedback: headlineScore > 80 
          ? 'Strong headline with clear value proposition' 
          : 'Headline could be more descriptive and include key skills'
      },
      summary: {
        score: Math.round(summaryScore),
        feedback: summaryScore > 80
          ? 'Well-written summary that showcases expertise'
          : 'Summary needs more detail about achievements and unique value'
      },
      experience: {
        score: Math.round(experienceScore),
        feedback: experienceScore > 80
          ? 'Experience section is detailed and comprehensive'
          : 'Add more quantifiable achievements and specific responsibilities'
      },
      skills: {
        score: Math.round(skillsScore),
        feedback: skillsScore > 80
          ? 'Good variety of relevant skills listed'
          : 'Add more industry-specific skills and technical competencies'
      }
    },
    strengths: [
      'Profile has all core sections completed',
      'Clear professional identity',
      'Relevant experience for the role'
    ],
    weaknesses: [
      'Could add more quantifiable achievements',
      'Missing some industry keywords',
      'Profile could be more detailed in certain areas'
    ],
    suggestions: [
      `Optimize headline with keywords like "${jobRole}" and key skills`,
      'Add metrics and numbers to demonstrate impact (e.g., "Increased efficiency by 30%")',
      'Include industry-specific keywords throughout your profile',
      'Add media, projects, or portfolio links to showcase work',
      'Get recommendations from colleagues and managers',
      'Join relevant LinkedIn groups and engage with industry content'
    ],
    missingElements
  }
}
