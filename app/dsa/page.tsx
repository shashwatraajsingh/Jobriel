"use client"
import { useState } from "react"
import Navbar from "@/components/Navbar"
import DSAQuestionsList from "@/components/DSAQuestionsList"
import ProtectedRoute from "@/components/ProtectedRoute"

export default function DSAPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <main className="container mx-auto px-4 pt-24 pb-12">
          <div className="mb-8 text-center">
            <h1 className="mb-4 text-4xl font-bold text-gray-900">Top 75 DSA Questions</h1>
            <p className="text-lg text-gray-600">
              Master the most important Data Structures & Algorithms questions asked in top tech companies
            </p>
          </div>

          <DSAQuestionsList />
        </main>
      </div>
    </ProtectedRoute>
  )
}