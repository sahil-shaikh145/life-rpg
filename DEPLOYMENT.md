# 🚀 Deployment Guide - Life RPG

Complete guide to deploying Life RPG to production.

## Option 1: Deploy to Vercel (Recommended)

Vercel is the easiest option with native Next.js support.

### Steps

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/life-rpg.git
git push -u origin main
```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Select Next.js framework preset

3. **Add Environment Variables**
   In Vercel dashboard, go to Settings → Environment Variables:
   
   ```
   DATABASE_URL=postgresql://user:password@host:5432/life_rpg
   NEXTAUTH_SECRET=[generate with: openssl rand -base64 32]
   NEXTAUTH_URL=https://your-domain.vercel.app
   NEXT_PUBLIC_API_URL=https://your-domain.vercel.app
   ```

4. **Setup PostgreSQL Database**
   - Use [Vercel PostgreSQL](https://vercel.com/postgres) (recommended)
   - Or use [Railway](https://railway.app), [Render](https://render.com), or [Neon](https://neon.tech)
   - Copy connection string to DATABASE_URL

5. **Deploy**
   - Click "Deploy"
   - After deployment, Vercel will run build command automatically
   - Prisma migrations will run on first deployment

---

## Option 2: Deploy to Railway

Railway provides a complete platform with database included.

### Steps

1. **Create Railway Account**
   - Go to [railway.app](https://railway.app)
   - Sign in with GitHub

2. **Create New Project**
   - Click "Create New Project"
   - Select "Deploy from GitHub repo"
   - Choose your life-rpg repository

3. **Add PostgreSQL Database**
   - Click "Add Service"
   - Select "PostgreSQL"
   - Railway will create database automatically

4. **Configure Environment Variables**
   - Click your project
   - Go to Variables tab
   - Add these variables:
     ```
     DATABASE_URL=${{Postgres.DATABASE_URL}}
     NEXTAUTH_SECRET=[generate]
     NEXTAUTH_URL=https://your-app.up.railway.app
     NEXT_PUBLIC_API_URL=https://your-app.up.railway.app
     NODE_ENV=production
     ```

5. **Deploy**
   - Push to GitHub
   - Railway auto-deploys on push

---

## Option 3: Deploy to Render

Render offers easy deployment with integrated PostgreSQL.

### Steps

1. **Create Render Account**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

2. **Create New Web Service**
   - Click "New +"
   - Select "Web Service"
   - Connect GitHub repo

3. **Configure Service**
   - **Name**: life-rpg
   - **Environment**: Node
   - **Build Command**: `npm install && npm run prisma:generate && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free tier available

4. **Add PostgreSQL Database**
   - Create new "PostgreSQL" database in Render
   - Copy connection URL

5. **Environment Variables**
   ```
   DATABASE_URL=postgresql://...
   NEXTAUTH_SECRET=[generate]
   NEXTAUTH_URL=https://your-app.onrender.com
   NEXT_PUBLIC_API_URL=https://your-app.onrender.com
   NODE_ENV=production
   ```

6. **Deploy**
   - Click "Deploy"
   - Monitor build logs

---

## Option 4: Docker Deployment

For production on your own server or cloud (AWS, GCP, DigitalOcean).

### Create Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production
RUN npm install -g next

# Copy source
COPY . .

# Build
RUN npm run prisma:generate
RUN npm run build

# Expose port
EXPOSE 3000

# Start
CMD ["npm", "start"]
```

### Build & Run

```bash
# Build image
docker build -t life-rpg .

# Run container
docker run -p 3000:3000 \
  -e DATABASE_URL="postgresql://..." \
  -e NEXTAUTH_SECRET="..." \
  -e NEXTAUTH_URL="https://yourdomain.com" \
  -e NEXT_PUBLIC_API_URL="https://yourdomain.com" \
  life-rpg
```

---

## Database Setup for Each Provider

### Vercel PostgreSQL
- Built-in at vercel.com/postgres
- Automatic backups
- Easy connection through Vercel dashboard

### Railway PostgreSQL
- Automatically created with project
- Connection string available in Variables
- Automatic backups

### Render PostgreSQL
- Create separate database
- Copy connection string
- Automatic backups included

### Self-Hosted (DigitalOcean, AWS, GCP)
```bash
# Create database
psql -c "CREATE DATABASE life_rpg;"

# Run migrations
npx prisma migrate deploy

# Optional: seed demo data
npm run db:seed
```

---

## Post-Deployment Checklist

- [ ] Database migrations ran successfully
- [ ] Environment variables configured
- [ ] Login/Register pages work
- [ ] Can create and complete tasks
- [ ] Refresh page and data persists
- [ ] Mobile responsive verified
- [ ] HTTPS enabled
- [ ] Custom domain configured (optional)

---

## Monitoring & Maintenance

### View Logs
- **Vercel**: Dashboard → Deployments → Logs
- **Railway**: Project → Logs
- **Render**: Service → Logs

### Database Backups
- Most platforms include automatic daily backups
- Download backups regularly if self-hosted

### Scaling
- Most free tiers sufficient for < 1000 users
- Upgrade plan if experiencing slowness

---

## Troubleshooting Deployment

### Database Connection Error
```bash
# Test connection locally first
psql $DATABASE_URL

# Check connection string format
# Should be: postgresql://user:pass@host:port/database
```

### Build Fails
```bash
# Check logs for error
# Usually missing environment variables
# Verify all env vars are set in platform dashboard
```

### Migrations Not Running
```bash
# Manually run migrations (if needed)
# Usually automatic, but if not:
npx prisma migrate deploy
```

### Application Crashes
- Check logs for errors
- Verify DATABASE_URL is correct
- Ensure NEXTAUTH_SECRET is set
- Check Node version (should be 18+)

---

## Performance Optimization

### Database
```bash
# Add indexes for faster queries (in Prisma schema)
@@index([userId])
@@index([completed])
```

### Caching
- Vercel: Automatic ISR caching
- Add CDN for static assets
- Enable gzip compression

### Monitoring
- Use Sentry for error tracking
- Add monitoring alerts
- Regular performance audits

---

## Security in Production

- [ ] HTTPS enabled
- [ ] Environment variables protected
- [ ] Database backups encrypted
- [ ] Regular security updates
- [ ] Input validation active
- [ ] CORS configured properly
- [ ] Rate limiting enabled
- [ ] Password hashing enabled (bcryptjs)

---

## Custom Domain Setup

### Vercel
1. Buy domain (Vercel Domains or external)
2. Go to Project Settings → Domains
3. Add custom domain
4. Update DNS records if external

### Railway / Render
1. Go to project settings
2. Add custom domain
3. Update DNS records at registrar
4. Configure SSL certificate (automatic)

---

## Questions?

- Check Vercel docs: vercel.com/docs
- Railway docs: docs.railway.app
- Render docs: render.com/docs
- Prisma docs: prisma.io/docs

---

**Happy deploying! 🚀**
