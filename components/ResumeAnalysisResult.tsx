'use client'

import { motion } from 'framer-motion'
import { FileText, CheckCircle2, XCircle, Lightbulb, Code, Award, BookOpen, TrendingUp } from 'lucide-react'

interface ResumeAnalysisResultProps {
  result: {
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
}

export default function ResumeAnalysisResult({ result }: ResumeAnalysisResultProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'from-green-500 to-emerald-600'
    if (score >= 60) return 'from-yellow-500 to-orange-600'
    return 'from-red-500 to-rose-600'
  }

  const getScoreTextColor = (score: number) => {
    if (score >= 80) return 'text-green-400'
    if (score >= 60) return 'text-yellow-400'
    return 'text-red-400'
  }

  return (
    <div className="space-y-8">
      {/* Overall Score Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl border border-gray-800 bg-gray-900/50 backdrop-blur-xl p-10 shadow-2xl"
      >
        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600">
            <FileText className="h-8 w-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">Resume Analysis</h2>
            <p className="text-base text-gray-400">Comprehensive evaluation report</p>
          </div>
        </div>

        {/* Score and Verdict */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="text-center p-8 rounded-2xl border border-gray-700 bg-gray-800/30">
            <div className={`text-6xl font-bold mb-2 ${getScoreTextColor(result.overallScore)}`}>
              {result.overallScore}%
            </div>
            <div className="text-gray-400 text-sm uppercase tracking-wider">Overall Score</div>
            <div className="mt-4 w-full bg-gray-700 rounded-full h-3 overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${getScoreColor(result.overallScore)} transition-all duration-1000`}
                style={{ width: `${result.overallScore}%` }}
              />
            </div>
          </div>

          <div className="flex flex-col justify-center p-8 rounded-2xl border border-gray-700 bg-gray-800/30">
            <div className="flex items-center gap-3 mb-3">
              {result.isGoodForJob ? (
                <CheckCircle2 className="h-8 w-8 text-green-400" />
              ) : (
                <XCircle className="h-8 w-8 text-red-400" />
              )}
              <div className={`text-2xl font-bold ${result.isGoodForJob ? 'text-green-400' : 'text-red-400'}`}>
                {result.isGoodForJob ? 'Good Match!' : 'Needs Improvement'}
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">{result.verdict}</p>
          </div>
        </div>

        {/* Strengths and Weaknesses */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="h-6 w-6 text-green-400" />
              Strengths
            </h3>
            <ul className="space-y-2">
              {result.strengths.map((strength, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-300">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-400 mt-2 flex-shrink-0" />
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <XCircle className="h-6 w-6 text-red-400" />
              Areas for Improvement
            </h3>
            <ul className="space-y-2">
              {result.weaknesses.map((weakness, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-300">
                  <div className="h-1.5 w-1.5 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                  <span>{weakness}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Project Suggestions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-3xl border border-gray-800 bg-gray-900/50 backdrop-blur-xl p-10 shadow-2xl"
      >
        <div className="mb-6 flex items-center gap-3">
          <Code className="h-8 w-8 text-green-400" />
          <h3 className="text-2xl font-bold text-white">Recommended Projects</h3>
        </div>
        <p className="text-gray-400 mb-6">Add these projects to strengthen your resume</p>
        
        <div className="grid md:grid-cols-2 gap-6">
          {result.projectSuggestions.map((project, index) => (
            <div key={index} className="p-6 rounded-2xl border border-gray-700 bg-gray-800/30 hover:border-gray-600 transition-all">
              <h4 className="text-xl font-bold text-white mb-3">{project.title}</h4>
              <p className="text-gray-300 mb-4 leading-relaxed">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Skills and Certifications */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-3xl border border-gray-800 bg-gray-900/50 backdrop-blur-xl p-8 shadow-2xl"
        >
          <div className="mb-6 flex items-center gap-3">
            <TrendingUp className="h-8 w-8 text-green-400" />
            <h3 className="text-2xl font-bold text-white">Skills to Learn</h3>
          </div>
          <p className="text-gray-400 mb-6">Enhance your skillset with these technologies</p>
          
          <div className="flex flex-wrap gap-3">
            {result.skillSuggestions.map((skill, index) => (
              <div
                key={index}
                className="px-4 py-2 rounded-full border border-gray-700 bg-gray-800/30 text-gray-300 hover:border-green-500/50 hover:bg-green-500/10 hover:text-green-400 transition-all"
              >
                {skill}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-3xl border border-gray-800 bg-gray-900/50 backdrop-blur-xl p-8 shadow-2xl"
        >
          <div className="mb-6 flex items-center gap-3">
            <Award className="h-8 w-8 text-green-400" />
            <h3 className="text-2xl font-bold text-white">Certifications</h3>
          </div>
          <p className="text-gray-400 mb-6">Boost credibility with these certifications</p>
          
          <ul className="space-y-3">
            {result.certificationSuggestions.map((cert, index) => (
              <li
                key={index}
                className="flex items-start gap-3 p-4 rounded-xl border border-gray-700 bg-gray-800/30 hover:border-green-500/50 transition-all"
              >
                <BookOpen className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">{cert}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Improvement Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="rounded-3xl border border-gray-800 bg-gray-900/50 backdrop-blur-xl p-10 shadow-2xl"
      >
        <div className="mb-6 flex items-center gap-3">
          <Lightbulb className="h-8 w-8 text-yellow-400" />
          <h3 className="text-2xl font-bold text-white">Quick Improvement Tips</h3>
        </div>
        
        <ul className="space-y-3">
          {result.improvementTips.map((tip, index) => (
            <li key={index} className="flex items-start gap-3 text-gray-300">
              <div className="h-2 w-2 rounded-full bg-yellow-400 mt-2 flex-shrink-0" />
              <span className="leading-relaxed">{tip}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  )
}
