# Firebase Setup Guide

## 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter your project name (e.g., "job-prep-assistant")
4. Follow the setup wizard

## 2. Enable Firestore Database

1. In your Firebase project, go to "Build" > "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" for development (or production mode for production)
4. Select a location for your database
5. Click "Enable"

## 3. Get Your Project ID

1. In Firebase Console, click the gear icon next to "Project Overview"
2. Go to "Project settings"
3. Copy your "Project ID"
4. Add it to your `.env` file:
   ```
   FIREBASE_PROJECT_ID=your-project-id-here
   ```

## 4. Set Up Service Account (For Production)

1. In Firebase Console, go to "Project settings" > "Service accounts"
2. Click "Generate new private key"
3. Download the JSON file
4. Convert the JSON to a single-line string and add to `.env`:
   ```
   FIREBASE_SERVICE_ACCOUNT='{"type":"service_account","project_id":"...","private_key":"...","client_email":"..."}'
   ```

## 5. Configure Firestore Security Rules

In Firebase Console, go to "Firestore Database" > "Rules" and update:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Resumes collection
    match /resumes/{resumeId} {
      allow read, write: if request.auth != null;
    }
    
    // Prep sessions collection
    match /prep_sessions/{sessionId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## 6. Development vs Production

### Development
- Use only `FIREBASE_PROJECT_ID` in `.env`
- Firebase Admin SDK will use Application Default Credentials

### Production
- Use both `FIREBASE_PROJECT_ID` and `FIREBASE_SERVICE_ACCOUNT`
- Service account provides full admin access

## 7. Collections Structure

The app uses three main collections:

### users
```typescript
{
  id: string,
  email: string,
  password: string (hashed),
  name: string,
  created_at: Timestamp
}
```

### resumes
```typescript
{
  id: string,
  user_id: string,
  content: string,
  job_role: string,
  ats_score: number,
  created_at: Timestamp
}
```

### prep_sessions
```typescript
{
  id: string,
  user_id: string,
  resume_id: string,
  job_description: string,
  roadmap: string,
  created_at: Timestamp
}
```

## 8. Testing the Connection

Run your development server:
```bash
npm run dev
```

Try to sign up a new user to test the Firebase connection.

## Troubleshooting

- **Authentication errors**: Make sure your service account JSON is properly formatted
- **Permission denied**: Check your Firestore security rules
- **Project not found**: Verify your `FIREBASE_PROJECT_ID` is correct
