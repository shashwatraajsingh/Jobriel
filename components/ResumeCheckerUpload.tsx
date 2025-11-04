'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, Loader2, AlertCircle, Upload, X } from 'lucide-react'

interface ResumeCheckerUploadProps {
  onAnalysisComplete: (data: any) => void
}

export default function ResumeCheckerUpload({ onAnalysisComplete }: ResumeCheckerUploadProps) {
  const [jobRole, setJobRole] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      // Validate file type
      if (selectedFile.type !== 'application/pdf') {
        setError('Please upload a PDF file')
        return
      }
      // Validate file size (max 5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB')
        return
      }
      setFile(selectedFile)
      setError(null)
    }
  }

  const handleRemoveFile = () => {
    setFile(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!jobRole || !file) {
      setError('Please provide both job role and resume file')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('resume', file)
      formData.append('jobRole', jobRole)

      const response = await fetch('/api/check-resume', {
        method: 'POST',
        body: formData,
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
      setError(error.message || 'Failed to analyze resume. Please try again.')
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
          <FileText className="h-8 w-8 text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-white">Upload Resume</h2>
          <p className="text-base text-gray-400 mt-1">Get comprehensive analysis and recommendations</p>
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

        <div>
          <label className="mb-3 block text-sm font-semibold text-gray-300">
            Resume (PDF) <span className="text-green-400">*</span>
          </label>
          
          {!file ? (
            <div className="relative">
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
                id="resume-upload"
              />
              <label
                htmlFor="resume-upload"
                className="flex flex-col items-center justify-center w-full h-48 rounded-2xl border-2 border-dashed border-gray-700 bg-gray-800/30 hover:bg-gray-800/50 hover:border-gray-600 transition-all cursor-pointer"
              >
                <Upload className="h-12 w-12 text-gray-500 mb-4" />
                <p className="text-gray-400 font-medium mb-1">Click to upload resume</p>
                <p className="text-sm text-gray-500">PDF only, max 5MB</p>
              </label>
            </div>
          ) : (
            <div className="flex items-center justify-between p-5 rounded-2xl border border-gray-700 bg-gray-800/50">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10">
                  <FileText className="h-6 w-6 text-green-400" />
                </div>
                <div>
                  <p className="text-white font-medium">{file.name}</p>
                  <p className="text-sm text-gray-400">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleRemoveFile}
                className="p-2 rounded-lg hover:bg-gray-700/50 transition-colors"
              >
                <X className="h-5 w-5 text-gray-400 hover:text-white" />
              </button>
            </div>
          )}
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
              Analyzing Resume...
            </>
          ) : (
            <>
              <FileText className="h-6 w-6" />
              Analyze Resume
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  )
}
