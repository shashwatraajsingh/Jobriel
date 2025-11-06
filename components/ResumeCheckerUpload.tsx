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
      className="rounded-3xl border border-luxe-border bg-white backdrop-blur-sm p-10 shadow-card"
    >
      <div className="mb-8 flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet to-violet-light shadow-soft">
          <FileText className="h-8 w-8 text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-text-heading">Upload Resume</h2>
          <p className="text-base text-text-body mt-1">Get comprehensive analysis and recommendations</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4"
          >
            <AlertCircle className="h-5 w-5 flex-shrink-0 text-red-500 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-red-600">Analysis Failed</p>
              <p className="mt-1 text-sm text-red-500">{error}</p>
            </div>
          </motion.div>
        )}
        
        <div>
          <label className="mb-3 block text-sm font-semibold text-text-body">
            Target Job Role <span className="text-violet">*</span>
          </label>
          <input
            type="text"
            value={jobRole}
            onChange={(e) => setJobRole(e.target.value)}
            placeholder="e.g., Senior Software Engineer"
            className="w-full rounded-2xl border border-luxe-border bg-white px-5 py-4 text-text-heading placeholder:text-text-body/60 focus:border-violet focus:outline-none focus:ring-2 focus:ring-violet/20 transition-all"
            required
          />
        </div>

        <div>
          <label className="mb-3 block text-sm font-semibold text-text-body">
            Resume (PDF) <span className="text-violet">*</span>
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
                className="flex flex-col items-center justify-center w-full h-48 rounded-2xl border-2 border-dashed border-luxe-border bg-white/70 hover:bg-white hover:border-violet/40 transition-all cursor-pointer"
              >
                <Upload className="h-12 w-12 text-violet mb-4" />
                <p className="text-text-heading font-medium mb-1">Click to upload resume</p>
                <p className="text-sm text-text-body/70">PDF only, max 5MB</p>
              </label>
            </div>
          ) : (
            <div className="flex items-center justify-between p-5 rounded-2xl border border-luxe-border bg-white shadow-soft">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet/10">
                  <FileText className="h-6 w-6 text-violet" />
                </div>
                <div>
                  <p className="text-text-heading font-medium">{file.name}</p>
                  <p className="text-sm text-text-body/70">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleRemoveFile}
                className="p-2 rounded-lg hover:bg-violet/10 transition-colors"
              >
                <X className="h-5 w-5 text-text-body/70 hover:text-violet" />
              </button>
            </div>
          )}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-violet to-violet-light px-8 py-5 text-lg font-bold text-white transition-all shadow-soft-lg hover:shadow-soft-xl disabled:opacity-50 disabled:cursor-not-allowed mt-8"
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
