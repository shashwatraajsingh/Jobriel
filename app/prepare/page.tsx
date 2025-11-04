"use client"
import Navbar from "@/components/Navbar"
import ChatBot from "@/components/ChatBot"
import ProtectedRoute from "@/components/ProtectedRoute"

export default function PreparePage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <main className="container mx-auto px-4 pt-24 pb-12">
          <div className="mb-8 text-center">
            <h1 className="mb-4 text-4xl font-bold text-gray-900">Interview Preparation</h1>
            <p className="text-lg text-gray-600">
              Get personalized coaching and build your preparation roadmap
            </p>
          </div>

          <div className="mx-auto max-w-5xl">
            <ChatBot resumeData={null} />
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
