# 🚀 Deployment Guide - Job Preparation Assistant


## 📋 Prerequisites

Before deploying, ensure you have:
- Node.js 18+ installed
- A PostgreSQL database (Neon/Supabase/Railway)
- OpenRouter account and API key (GPT-4o-mini)
- Firebase project (for auth and storage)

## 🔧 Environment Variables

Create a `.env` file with the following variables:

```bash
# Database
DATABASE_URL=postgresql://username:password@host:port/database_name

# Firebase
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_SERVICE_ACCOUNT={...JSON...}

# AI APIs
OPEN_ROUTER_API_KEY=your_openrouter_api_key_here

# Authentication
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters

# App Config
NEXT_PUBLIC_APP_URL=https://your-domain.com
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-firebase-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-firebase-app-id
```

## 🗄️ Database Setup

### Option 1: Neon (Recommended)
{{ ... }}
1. Go to [Neon](https://neon.tech) and create a free account
2. Create a new project
3. Copy the connection string
4. Use it as your `DATABASE_URL`

### Option 2: Supabase
1. Go to [Supabase](https://supabase.com) and create a project
2. Go to Settings → Database
3. Copy the connection string
4. Use it as your `DATABASE_URL`

### Option 3: Railway PostgreSQL
1. Go to [Railway](https://railway.app)
2. Create a new project
3. Add PostgreSQL service
4. Copy the connection string

> **Note:** The project currently uses Firebase for authentication and Postgres for storage. Run migrations or schema setup scripts according to the `lib/db` utilities provided in the repo (if available). For Prisma or Drizzle users, follow the respective migration commands.

## 🌐 Deployment Options

### 1. Vercel (Recommended)

#### Quick Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/job-prep-assistant)

#### Manual Deployment
1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Set Environment Variables**
   ```bash
   vercel env add DATABASE_URL
   vercel env add GEMINI_API_KEY
   vercel env add PERPLEXITY_API_KEY
   vercel env add JWT_SECRET
   vercel env add NEXT_PUBLIC_APP_URL
   ```

5. **Redeploy with Environment Variables**
   ```bash
   vercel --prod
   ```

#### Vercel Dashboard Setup
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Import your GitHub repository
3. Add environment variables in Settings → Environment Variables
4. Deploy

### 2. Railway

1. **Connect Repository**
   - Go to [Railway](https://railway.app)
   - Create new project from GitHub repo

2. **Add Environment Variables**
   - In Railway dashboard, go to Variables tab
   - Add all required environment variables

3. **Deploy**
   - Railway automatically deploys on git push

### 3. DigitalOcean App Platform

1. **Create App**
   ```bash
   doctl apps create --spec .do/app.yaml
   ```

2. **App Spec (`.do/app.yaml`)**
   ```yaml
   name: job-prep-assistant
   services:
   - name: web
     source_dir: /
     github:
       repo: yourusername/job-prep-assistant
       branch: main
     run_command: npm start
     build_command: npm run build
     environment_slug: node-js
     instance_count: 1
     instance_size_slug: basic-xxs
     envs:
     - key: DATABASE_URL
       scope: RUN_TIME
       type: SECRET
     - key: GEMINI_API_KEY
       scope: RUN_TIME
       type: SECRET
     - key: PERPLEXITY_API_KEY
       scope: RUN_TIME
       type: SECRET
     - key: JWT_SECRET
       scope: RUN_TIME
       type: SECRET
   ```

### 4. Self-Hosted (VPS/Dedicated Server)

#### Using PM2 (Process Manager)

1. **Install Dependencies**
   ```bash
   # On your server
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   npm install -g pm2
   ```

2. **Clone and Setup**
   ```bash
   git clone https://github.com/yourusername/job-prep-assistant.git
   cd job-prep-assistant
   npm install
   npm run build
   ```

3. **Create PM2 Ecosystem File**
   ```javascript
   // ecosystem.config.js
   module.exports = {
     apps: [{
       name: 'job-prep-assistant',
       script: 'npm',
       cwd: '/path/to/job-prep-assistant',
       env: {
         NODE_ENV: 'production',
         PORT: 3000,
         DATABASE_URL: 'your_database_url',
         OPEN_ROUTER_API_KEY: 'your_openrouter_key',
         JWT_SECRET: 'your_jwt_secret',
         NEXT_PUBLIC_APP_URL: 'https://yourdomain.com'
       }
     }]
   }
{{ ... }}
   ```

4. **Start with PM2**
   ```bash
   pm2 start ecosystem.config.js
   pm2 save
   pm2 startup
   ```

#### Nginx Configuration
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

#### SSL with Let's Encrypt
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

## 🐳 Docker Deployment

### Dockerfile
```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

> **Docker Note:** Generate a custom `Dockerfile` using Next.js 14 standalone output. Ensure environment variables (including `OPEN_ROUTER_API_KEY` and Firebase config) are injected via your orchestrator or `docker-compose.yml`.

## 🔐 Security Considerations

### Environment Variables Security
- Never commit `.env` files to version control
- Use strong, unique JWT secrets (minimum 32 characters)
- Rotate API keys regularly
- Use different secrets for different environments

### Database Security
- Use connection pooling
- Enable SSL for database connections
- Regularly backup your database
- Use read replicas for scaling

### Application Security
- Enable HTTPS in production
- Set secure headers
- Implement rate limiting
- Use CORS properly
- Validate all inputs

## 📊 Monitoring & Analytics

### Error Tracking
Add Sentry for error tracking:
```bash
npm install @sentry/nextjs
```

### Analytics
Add Google Analytics or Vercel Analytics:
```bash
npm install @vercel/analytics
```

### Performance Monitoring
- Use Vercel Speed Insights
- Monitor Core Web Vitals
- Set up uptime monitoring

## 🚀 CI/CD Pipeline

### GitHub Actions
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Build application
        run: npm run build
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## 🔧 Troubleshooting

### Common Issues

1. **Database Connection Errors**
   - Check DATABASE_URL format
   - Ensure database is accessible
   - Verify credentials

2. **API Key Issues**
   - Verify API keys are correct
   - Check API quotas and limits
   - Ensure keys have proper permissions

3. **Build Failures**
   - Check Node.js version compatibility
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules and reinstall

4. **Authentication Issues**
   - Verify JWT_SECRET is set
   - Check cookie settings
   - Ensure HTTPS in production

### Performance Optimization

1. **Enable Caching**
   ```javascript
   // next.config.js
   module.exports = {
     experimental: {
       serverComponentsExternalPackages: ['pg']
     },
     images: {
       domains: ['your-domain.com']
     }
   }
   ```

2. **Database Optimization**
   - Add database indexes
   - Use connection pooling
   - Implement query optimization

3. **CDN Setup**
   - Use Vercel's built-in CDN
   - Or configure CloudFlare

## 📞 Support

If you encounter issues during deployment:

1. Check the [troubleshooting section](#troubleshooting)
2. Review application logs
3. Verify all environment variables
4. Test locally first
5. Check platform-specific documentation

## 🎉 Post-Deployment Checklist

- [ ] All environment variables set correctly
- [ ] Database initialized and accessible
- [ ] Authentication working properly
- [ ] File uploads functioning
- [ ] AI APIs responding correctly
- [ ] SSL certificate installed
- [ ] Domain configured properly
- [ ] Monitoring and analytics set up
- [ ] Backup strategy implemented
- [ ] Performance optimized

---

**Happy Deploying! 🚀**

Your Job Preparation Assistant is now ready to help users optimize their careers and ace their interviews!