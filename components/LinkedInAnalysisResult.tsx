'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, XCircle, Lightbulb, TrendingUp, Target, Award, AlertTriangle, Linkedin } from 'lucide-react'

interface LinkedInAnalysisResultProps {
  result: {
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
}

export default function LinkedInAnalysisResult({ result }: LinkedInAnalysisResultProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'from-violet to-violet-light'
    if (score >= 60) return 'from-amber-400 to-amber-500'
    return 'from-rose-400 to-rose-500'
  }

  const getScoreTextColor = (score: number) => {
    if (score >= 80) return 'text-violet'
    if (score >= 60) return 'text-amber-500'
    return 'text-rose-500'
  }

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-violet/10 border-violet/20'
    if (score >= 60) return 'bg-amber-100 border-amber-200'
    return 'bg-rose-100 border-rose-200'
  }

  return (
    <div className="space-y-6">
      {/* Overall Score Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-luxe-border bg-white p-8 shadow-card"
      >
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet/10">
            <Linkedin className="h-6 w-6 text-violet" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-text-heading">LinkedIn Profile Analysis</h2>
            <p className="text-sm text-text-body">Comprehensive profile optimization report</p>
          </div>
        </div>
        
        {/* Score Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className={`rounded-xl border ${getScoreBgColor(result.overallScore)} p-4 bg-white`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-text-body">Overall Score</span>
              <Award className="h-5 w-5 text-violet" />
            </div>
            <div className={`text-3xl font-bold ${getScoreTextColor(result.overallScore)}`}>
              {result.overallScore}%
            </div>
          </div>

          <div className={`rounded-xl border ${getScoreBgColor(result.profileCompleteness)} p-4 bg-white`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-text-body">Completeness</span>
              <Target className="h-5 w-5 text-violet" />
            </div>
            <div className={`text-3xl font-bold ${getScoreTextColor(result.profileCompleteness)}`}>
              {result.profileCompleteness}%
            </div>
          </div>

          <div className={`rounded-xl border ${getScoreBgColor(result.keywordMatch)} p-4 bg-white`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-text-body">Keyword Match</span>
              <TrendingUp className="h-5 w-5 text-violet" />
            </div>
            <div className={`text-3xl font-bold ${getScoreTextColor(result.keywordMatch)}`}>
              {result.keywordMatch}%
            </div>
          </div>
        </div>

        {/* Profile Strength Breakdown */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-text-heading">Section Scores</h3>

          {Object.entries(result.profileStrength).map(([section, data], index) => (
            <motion.div
              key={section}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`rounded-xl border p-4 bg-white ${getScoreBgColor(data.score)}`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-text-heading capitalize">{section}</span>
                <span className={`text-xl font-bold ${getScoreTextColor(data.score)}`}>
                  {data.score}%
                </span>
              </div>
              <div className="relative h-2 w-full overflow-hidden rounded-full bg-violet/10 mb-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${data.score}%` }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className={`h-full rounded-full bg-gradient-to-r ${getScoreColor(data.score)}`}
                />
              </div>
              <p className="text-sm text-text-body">{data.feedback}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
      {result.missingElements && result.missingElements.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl border border-amber-200 bg-amber-50 p-6 shadow-card"
        >
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            <h3 className="font-semibold text-text-heading">Missing Profile Elements</h3>
          </div>
          <ul className="space-y-2">
            {result.missingElements.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-orange-800">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-orange-500" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Detailed Feedback */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-2xl border border-luxe-border bg-white p-8 shadow-card"
      >
        <div className="space-y-6">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-violet" />
              <h3 className="font-semibold text-text-heading">Strengths</h3>
            </div>
            <ul className="space-y-2">
              {result.strengths.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                  className="flex items-start gap-2 text-sm text-text-body"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-violet" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>

          <div>
            <div className="mb-3 flex items-center gap-2">
              <XCircle className="h-5 w-5 text-rose-500" />
              <h3 className="font-semibold text-text-heading">Areas for Improvement</h3>
            </div>
            <ul className="space-y-2">
              {result.weaknesses.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                  className="flex items-start gap-2 text-sm text-text-body"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-rose-500" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>

          <div>
            <div className="mb-3 flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-violet" />
              <h3 className="font-semibold text-text-heading">Actionable Suggestions</h3>
            </div>
            <ul className="space-y-2">
              {result.suggestions.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                  className="flex items-start gap-2 text-sm text-text-body"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-violet" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
