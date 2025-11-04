# Job Preparation Assistant

AI-powered platform for LinkedIn profile optimization and interview preparation.

## Features

- **LinkedIn Profile Analyzer**: Analyze your LinkedIn profile and get comprehensive optimization recommendations
- **Interview Prep Chatbot**: Personalized preparation roadmap based on job description
- **AI-Powered Insights**: Uses Gemini for coaching and OpenRouter for profile analysis
- **No PDF Hassles**: Simple text input instead of file uploads - more reliable and comprehensive

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up PostgreSQL database and create `.env` file:
```bash
cp .env.example .env
```

3. Configure environment variables in `.env`:
- `FIREBASE_PROJECT_ID`: Firebase project ID
- `FIREBASE_SERVICE_ACCOUNT`: Firebase service account JSON (for production)
- `GEMINI_API_KEY`: Google Gemini API key
- `OPEN_ROUTER_API_KEY`: OpenRouter API key

4. Initialize database:
```bash
node -e "require('./lib/db').initDB()"
```

5. Run development server:
```bash
npm run dev
```

Visit `http://localhost:3000`

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Node.js
- **Database**: Firebase Firestore
- **AI**: Gemini (chatbot), OpenRouter (resume analysis)

## Usage

### LinkedIn Profile Analyzer
1. Navigate to the "Analyze" page
2. Enter your target job role
3. Paste your LinkedIn profile sections (headline, summary, experience, skills)
4. Get comprehensive analysis with:
   - Overall Score, Profile Completeness, Keyword Match
   - Section-by-section feedback
   - Strengths, weaknesses, and actionable suggestions
   - Missing profile elements

### Interview Prep
1. Paste job description to start interview prep
2. Chat with AI to build personalized preparation roadmap
3. Get practice questions and study resources

## Quick Start

See [QUICK_START.md](./QUICK_START.md) for a 3-minute setup guide.

For detailed LinkedIn Analyzer documentation, see [LINKEDIN_ANALYZER.md](./LINKEDIN_ANALYZER.md).

## API Endpoints

- `POST /api/analyze-resume`: Analyze LinkedIn profile against job role
- `POST /api/chat`: Chat with prep assistant
