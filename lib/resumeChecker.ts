import axios from 'axios'
import pdf from 'pdf-parse'

const OPEN_ROUTER_API_KEY = process.env.OPEN_ROUTER_API_KEY

interface ResumeAnalysis {
  overallScore: number
  isGoodForJob: boolean
  verdict: string
  strengths: string[]
  weaknesses: string[]
  projectSuggestions: Array<{
    title: string
    description: string
    technologies: string[]
  }>
  skillSuggestions: string[]
  certificationSuggestions: string[]
  improvementTips: string[]
}

export async function analyzeResumeForJob(resumeBuffer: Buffer, jobRole: string): Promise<ResumeAnalysis> {
  try {
    // Extract text from PDF
    const pdfData = await pdf(resumeBuffer)
    const resumeText = pdfData.text

    if (!resumeText || resumeText.trim().length < 50) {
      throw new Error('Unable to extract text from resume. Please ensure it\'s a valid PDF with text content.')
    }

    console.log('Extracted resume text length:', resumeText.length)

    // Require AI analysis - no fallback
    if (!OPEN_ROUTER_API_KEY) {
      throw new Error('AI analysis is required. Please configure OPEN_ROUTER_API_KEY in your environment variables.')
    }

    return await analyzeWithAI(resumeText, jobRole)
  } catch (error: any) {
    console.error('Error in analyzeResumeForJob:', error)
    throw new Error(error.message || 'Failed to analyze resume')
  }
}

async function analyzeWithAI(resumeText: string, jobRole: string): Promise<ResumeAnalysis> {
  const prompt = `You are a ruthless, brutally honest resume analyst. You never sugarcoat feedback or soften the truth. Analyze this resume for the job role: "${jobRole}"

Resume Content:
${resumeText.substring(0, 4000)}

Provide a comprehensive, personalized analysis based on the ACTUAL content of this resume. Do NOT use generic or template responses. Call out every weakness bluntly and highlight risks without mercy.

Analyze:
1. How well does this specific resume match the "${jobRole}" position?
2. What are the candidate's actual strengths based on their experience?
3. What specific gaps exist for the "${jobRole}" role?
4. What 2 SPECIFIC projects would fill those gaps and showcase missing skills?
5. What skills are missing that are critical for "${jobRole}"?
6. What certifications would be most valuable given their current background?
7. What specific improvements can be made to THIS resume?

Return your analysis in the following JSON format:
{
  "overallScore": <number 0-100 based on actual resume quality and job match>,
  "isGoodForJob": <boolean - true if score >= 70>,
  "verdict": "<2-3 sentences explaining why this resume is/isn't a good match for ${jobRole}, referencing specific elements from the resume. Be blunt and unfiltered>",
  "strengths": ["<specific strength from resume>", "<another specific strength>", "<third specific strength>"],
  "weaknesses": ["<specific weakness or gap for ${jobRole}>", "<another specific gap>", "<third specific gap>"],
  "projectSuggestions": [
    {
      "title": "<Specific project title that addresses a gap in this resume>",
      "description": "<Detailed description of what to build and why it helps for ${jobRole}>",
      "technologies": ["<relevant tech 1>", "<relevant tech 2>", "<relevant tech 3>", "<relevant tech 4>"]
    },
    {
      "title": "<Different specific project title>",
      "description": "<Detailed description addressing another gap>",
      "technologies": ["<relevant tech 1>", "<relevant tech 2>", "<relevant tech 3>", "<relevant tech 4>"]
    }
  ],
  "skillSuggestions": ["<specific missing skill for ${jobRole}>", "<another missing skill>", "<third skill>", "<fourth skill>", "<fifth skill>", "<sixth skill>"],
  "certificationSuggestions": ["<Full certification name with provider>", "<Second certification with provider>", "<Third certification with provider>"],
  "improvementTips": ["<specific actionable tip for THIS resume>", "<another specific tip>", "<third tip>", "<fourth tip>", "<fifth tip>"]
}

IMPORTANT: 
- Base ALL suggestions on the actual resume content and gaps for "${jobRole}"
- Project suggestions must be SPECIFIC and address real gaps in the resume
- Skills should be missing from the resume but required for "${jobRole}"
- Certifications should complement the candidate's current background
- Tips should reference actual issues in THIS specific resume
- Use harsh, direct language. No platitudes, no vague praise.
- Be honest about the score - don't inflate it
- If the resume is weak, say so explicitly and explain why.

Return ONLY valid JSON, no additional text or markdown.`

  const response = await axios.post(
    'https://openrouter.ai/api/v1/chat/completions',
    {
      model: 'openai/gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    },
    {
      headers: {
        'Authorization': `Bearer ${OPEN_ROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
        'X-Title': 'Resume Analyzer'
      },
      timeout: 60000
    }
  ).catch(error => {
    console.error('OpenRouter API Error:', error.response?.data || error.message)
    throw new Error(`AI API failed: ${error.response?.data?.error?.message || error.message}`)
  })

  const aiResponse = response.data.choices[0].message.content
  console.log('AI Response:', aiResponse.substring(0, 200))

  // Extract JSON from response
  const jsonMatch = aiResponse.match(/\{[\s\S]*\}/)
  if (!jsonMatch) {
    throw new Error('Invalid AI response format')
  }

  const analysis: ResumeAnalysis = JSON.parse(jsonMatch[0])
  
  // Validate the response
  if (typeof analysis.overallScore !== 'number' || 
      typeof analysis.isGoodForJob !== 'boolean' ||
      !analysis.projectSuggestions || 
      analysis.projectSuggestions.length < 2) {
    throw new Error('Incomplete AI analysis')
  }

  return analysis
}
