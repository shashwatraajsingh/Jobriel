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
    <div className="space-y-8">
      {/* Overall Score Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl border border-luxe-border bg-white backdrop-blur-sm p-10 shadow-card"
      >
        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet to-violet-light shadow-soft">
            <FileText className="h-8 w-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-text-heading">Resume Analysis</h2>
            <p className="text-base text-text-body">Comprehensive evaluation report</p>
          </div>
        </div>

        {/* Score and Verdict */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className={`text-center p-8 rounded-2xl border ${getScoreBgColor(result.overallScore)} bg-white`}>
            <div className={`text-6xl font-bold mb-2 ${getScoreTextColor(result.overallScore)}`}>
              {result.overallScore}%
            </div>
            <div className="text-text-body text-sm uppercase tracking-wider">Overall Score</div>
            <div className="mt-4 w-full bg-violet/10 rounded-full h-3 overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${getScoreColor(result.overallScore)} transition-all duration-1000`}
                style={{ width: `${result.overallScore}%` }}
              />
            </div>
          </div>

          <div className="flex flex-col justify-center p-8 rounded-2xl border border-luxe-border bg-white">
            <div className="flex items-center gap-3 mb-3">
              {result.isGoodForJob ? (
                <CheckCircle2 className="h-8 w-8 text-violet" />
              ) : (
                <XCircle className="h-8 w-8 text-rose-500" />
              )}
              <div className={`text-2xl font-bold ${result.isGoodForJob ? 'text-violet' : 'text-rose-500'}`}>
                {result.isGoodForJob ? 'Good Match!' : 'Needs Improvement'}
              </div>
            </div>
            <p className="text-text-body leading-relaxed">{result.verdict}</p>
          </div>
        </div>

        {/* Strengths and Weaknesses */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-text-heading flex items-center gap-2">
              <CheckCircle2 className="h-6 w-6 text-violet" />
              Strengths
            </h3>
            <ul className="space-y-2">
              {result.strengths.map((strength, index) => (
                <li key={index} className="flex items-start gap-2 text-text-body">
                  <div className="h-1.5 w-1.5 rounded-full bg-violet mt-2 flex-shrink-0" />
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-bold text-text-heading flex items-center gap-2">
              <XCircle className="h-6 w-6 text-rose-500" />
              Areas for Improvement
            </h3>
            <ul className="space-y-2">
              {result.weaknesses.map((weakness, index) => (
                <li key={index} className="flex items-start gap-2 text-text-body">
                  <div className="h-1.5 w-1.5 rounded-full bg-rose-500 mt-2 flex-shrink-0" />
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
        className="rounded-3xl border border-luxe-border bg-white backdrop-blur-sm p-10 shadow-card"
      >
        <div className="mb-6 flex items-center gap-3">
          <Code className="h-8 w-8 text-violet" />
          <h3 className="text-2xl font-bold text-text-heading">Recommended Projects</h3>
        </div>
        <p className="text-text-body mb-6">Add these projects to strengthen your resume</p>

        <div className="grid md:grid-cols-2 gap-6">
          {result.projectSuggestions.map((project, index) => (
            <div key={index} className="p-6 rounded-2xl border border-luxe-border bg-white hover:border-violet/40 hover:shadow-soft transition-all">
              <h4 className="text-xl font-bold text-text-heading mb-3">{project.title}</h4>
              <p className="text-text-body mb-4 leading-relaxed">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-3 py-1 rounded-full bg-violet/10 border border-violet/20 text-violet text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Skills */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-3xl border border-luxe-border bg-white backdrop-blur-sm p-8 shadow-card"
      >
        <div className="mb-6 flex items-center gap-3">
          <TrendingUp className="h-8 w-8 text-violet" />
          <h3 className="text-2xl font-bold text-text-heading">Skills to Learn</h3>
        </div>
        <p className="text-text-body mb-6">Enhance your skillset with these technologies</p>

        <div className="flex flex-wrap gap-3">
          {result.skillSuggestions.map((skill, index) => (
            <div
              key={index}
              className="px-4 py-2 rounded-full border border-luxe-border bg-white text-text-body hover:border-violet/40 hover:bg-violet/10 hover:text-violet transition-all"
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
        className="rounded-3xl border border-luxe-border bg-white backdrop-blur-sm p-8 shadow-card"
      >
        <div className="mb-6 flex items-center gap-3">
          <Award className="h-8 w-8 text-violet" />
          <h3 className="text-2xl font-bold text-text-heading">Certifications</h3>
        </div>
        <p className="text-text-body mb-6">Boost credibility with these certifications</p>

        <ul className="space-y-3">
          {result.certificationSuggestions.map((cert, index) => (
            <li
              key={index}
              className="flex items-start gap-3 p-4 rounded-xl border border-luxe-border bg-white hover:border-violet/40 transition-all"
            >
              <BookOpen className="h-5 w-5 text-violet mt-0.5 flex-shrink-0" />
              <span className="text-text-body">{cert}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Improvement Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="rounded-3xl border border-luxe-border bg-white backdrop-blur-sm p-10 shadow-card"
      >
        <div className="mb-6 flex items-center gap-3">
          <Lightbulb className="h-8 w-8 text-amber-400" />
          <h3 className="text-2xl font-bold text-text-heading">Quick Improvement Tips</h3>
        </div>

        <ul className="space-y-3">
          {result.improvementTips.map((tip, index) => (
            <li key={index} className="flex items-start gap-3 text-text-body">
              <div className="h-2 w-2 rounded-full bg-amber-400 mt-2 flex-shrink-0" />
              <span className="leading-relaxed">{tip}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  )
}
