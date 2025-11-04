'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Linkedin, Loader2, AlertCircle, Sparkles } from 'lucide-react'

interface ResumeUploadProps {
  onAnalysisComplete: (data: any) => void
}

export default function ResumeUpload({ onAnalysisComplete }: ResumeUploadProps) {
  const [jobRole, setJobRole] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  // LinkedIn profile fields
  const [headline, setHeadline] = useState('')
  const [summary, setSummary] = useState('')
  const [experience, setExperience] = useState('')
  const [skills, setSkills] = useState('')
  const [education, setEducation] = useState('')
  const [certifications, setCertifications] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!jobRole || !headline || !summary || !experience || !skills) {
      setError('Please fill in all required fields (Job Role, Headline, Summary, Experience, Skills)')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/analyze-resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          profileData: {
            headline,
            summary,
            experience,
            skills,
            education: education || undefined,
            certifications: certifications || undefined,
          },
          jobRole,
        }),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.details || data.error || 'Analysis failed')
      }
      
      if (data.error) {
        setError(data.details || data.error)
        return
      }
      
      onAnalysisComplete(data)
    } catch (error: any) {
      console.error('Analysis failed:', error)
      setError(error.message || 'Failed to analyze profile. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-gray-800 bg-gray-900/50 backdrop-blur-xl p-10 shadow-2xl"
    >
      <div className="mb-8 flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600">
          <Linkedin className="h-8 w-8 text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-white">Analyze Profile</h2>
          <p className="text-base text-gray-400 mt-1">Get AI-powered optimization insights</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 p-4"
          >
            <AlertCircle className="h-5 w-5 flex-shrink-0 text-red-400 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-red-300">Analysis Failed</p>
              <p className="mt-1 text-sm text-red-400">{error}</p>
            </div>
          </motion.div>
        )}
        
        <div>
          <label className="mb-3 block text-sm font-semibold text-gray-300">
            Target Job Role <span className="text-green-400">*</span>
          </label>
          <input
            type="text"
            value={jobRole}
            onChange={(e) => setJobRole(e.target.value)}
            placeholder="e.g., Senior Software Engineer"
            className="w-full rounded-2xl border border-gray-700 bg-gray-800/50 px-5 py-4 text-white placeholder-gray-500 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/30 transition-all"
            required
          />
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="mb-3 block text-sm font-semibold text-gray-300">
              LinkedIn Headline <span className="text-green-400">*</span>
            </label>
            <input
              type="text"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder="e.g., Senior Software Engineer | Full-Stack Developer | React & Node.js"
              className="w-full rounded-2xl border border-gray-700 bg-gray-800/50 px-5 py-4 text-white placeholder-gray-500 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/30 transition-all"
              required
            />
          </div>

          <div>
            <label className="mb-3 block text-sm font-semibold text-gray-300">
              About/Summary <span className="text-green-400">*</span>
            </label>
            <textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Paste your LinkedIn About section here..."
              rows={4}
              className="w-full rounded-2xl border border-gray-700 bg-gray-800/50 px-5 py-4 text-white placeholder-gray-500 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/30 resize-none transition-all"
              required
            />
          </div>

          <div>
            <label className="mb-3 block text-sm font-semibold text-gray-300">
              Experience <span className="text-green-400">*</span>
            </label>
            <textarea
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              placeholder="Paste your work experience (job titles, companies, responsibilities)..."
              rows={5}
              className="w-full rounded-2xl border border-gray-700 bg-gray-800/50 px-5 py-4 text-white placeholder-gray-500 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/30 resize-none transition-all"
              required
            />
          </div>

          <div>
            <label className="mb-3 block text-sm font-semibold text-gray-300">
              Skills <span className="text-green-400">*</span>
            </label>
            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="e.g., JavaScript, React, Node.js, Python, AWS, Docker"
              className="w-full rounded-2xl border border-gray-700 bg-gray-800/50 px-5 py-4 text-white placeholder-gray-500 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/30 transition-all"
              required
            />
          </div>

          <div>
            <label className="mb-3 block text-sm font-semibold text-gray-300">
              Education <span className="text-gray-500">(Optional)</span>
            </label>
            <input
              type="text"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              placeholder="e.g., B.S. Computer Science, Stanford University"
              className="w-full rounded-2xl border border-gray-700 bg-gray-800/50 px-5 py-4 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all"
            />
          </div>

          <div>
            <label className="mb-3 block text-sm font-semibold text-gray-300">
              Certifications <span className="text-gray-500">(Optional)</span>
            </label>
            <input
              type="text"
              value={certifications}
              onChange={(e) => setCertifications(e.target.value)}
              placeholder="e.g., AWS Certified Solutions Architect, PMP"
              className="w-full rounded-2xl border border-gray-700 bg-gray-800/50 px-5 py-4 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all"
            />
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-3 rounded-full bg-white px-8 py-5 text-lg font-bold text-black transition-all hover:shadow-2xl hover:shadow-white/20 disabled:opacity-50 disabled:cursor-not-allowed mt-8"
        >
          {loading ? (
            <>
              <Loader2 className="h-6 w-6 animate-spin" />
              Analyzing Profile...
            </>
          ) : (
            <>
              <Sparkles className="h-6 w-6" />
              Analyze Profile
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  )
}
