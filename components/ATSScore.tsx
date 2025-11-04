'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, XCircle, Lightbulb, TrendingUp } from 'lucide-react'

interface ATSScoreProps {
  result: {
    score: number
    strengths: string[]
    weaknesses: string[]
    suggestions: string[]
  }
}

export default function ATSScore({ result }: ATSScoreProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'from-green-500 to-emerald-600'
    if (score >= 60) return 'from-yellow-500 to-orange-600'
    return 'from-red-500 to-rose-600'
  }

  const getScoreTextColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
    >
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
          <TrendingUp className="h-6 w-6 text-blue-600" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-900">ATS Analysis</h2>
      </div>
      
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-lg font-medium text-gray-700">ATS Score</span>
          <span className={`text-4xl font-bold ${getScoreTextColor(result.score)}`}>
            {result.score}%
          </span>
        </div>
        <div className="relative h-4 w-full overflow-hidden rounded-full bg-gray-200">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${result.score}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`h-full rounded-full bg-gradient-to-r ${getScoreColor(result.score)}`}
          />
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <h3 className="font-semibold text-green-700">Strengths</h3>
          </div>
          <ul className="space-y-2">
            {result.strengths.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-2 text-sm text-gray-700"
              >
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-green-500" />
                {item}
              </motion.li>
            ))}
          </ul>
        </div>

        <div>
          <div className="mb-3 flex items-center gap-2">
            <XCircle className="h-5 w-5 text-red-600" />
            <h3 className="font-semibold text-red-700">Weaknesses</h3>
          </div>
          <ul className="space-y-2">
            {result.weaknesses.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-2 text-sm text-gray-700"
              >
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-500" />
                {item}
              </motion.li>
            ))}
          </ul>
        </div>

        <div>
          <div className="mb-3 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-blue-600" />
            <h3 className="font-semibold text-blue-700">Suggestions</h3>
          </div>
          <ul className="space-y-2">
            {result.suggestions.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-2 text-sm text-gray-700"
              >
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500" />
                {item}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  )
}
