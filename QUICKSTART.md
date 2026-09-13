# ⚡ Quick Start Guide - Life RPG

Get up and running in 5 minutes!

## 1️⃣ Clone & Install (2 min)

```bash
git clone https://github.com/yourusername/life-rpg.git
cd life-rpg
npm install
```

## 2️⃣ Setup Database (2 min)

### Option A: Local PostgreSQL

```bash
# Install PostgreSQL if needed
# macOS: brew install postgresql
# Windows: https://www.postgresql.org/download/windows/
# Linux: sudo apt-get install postgresql

# Start PostgreSQL
# macOS: brew services start postgresql
# Others: Check PostgreSQL docs

# Create database and user
createdb life_rpg
createuser liferpg_user

# Copy .env.example to .env.local
cp .env.example .env.local

# Edit .env.local with your database URL
DATABASE_URL="postgresql://liferpg_user:password@localhost:5432/life_rpg"

# Generate NEXTAUTH_SECRET
NEXTAUTH_SECRET="$(openssl rand -base64 32)"

# Run migrations
npm run prisma:migrate

# Seed demo data (optional)
npm run db:seed
```

### Option B: Use Railway (Easiest)

Railway provides free PostgreSQL with no setup:

1. Go to [railway.app](https://railway.app)
2. Create account with GitHub
3. Create new project → PostgreSQL
4. Copy connection string
5. Paste into `.env.local` as `DATABASE_URL`

## 3️⃣ Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🎮 First Run

1. **Sign Up** (or use demo: test@example.com / password123)
2. **Create Quest** - Click "Create New Quest"
3. **Complete Quest** - Click "Complete" button
4. **Watch XP** - See your character level up!
5. **Refresh** - Verify data persists in database

## 📁 Project Structure

```
pages/           → Pages and API routes
components/      → React components
styles/          → CSS files
utils/           → Helper functions
prisma/          → Database schema
```

See `PROJECT_STRUCTURE.md` for full details.

## 🚀 Deploy to Production

Choose one:

- **Vercel** (easiest): `vercel deploy`
- **Railway**: Push to GitHub, auto-deploys
- **Render**: Connect GitHub repo

See `DEPLOYMENT.md` for detailed instructions.

## 🐛 Troubleshooting

### Port 3000 in use?
```bash
# macOS/Linux
lsof -i :3000
kill -9 <PID>

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Database connection error?
```bash
# Test your connection
psql $DATABASE_URL

# Regenerate Prisma client
npm run prisma:generate
```

### Prisma errors?
```bash
# Reset database
npm run prisma:migrate reset

# View data with Prisma Studio
npm run prisma:studio
```

### Module not found?
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

## 📖 Key Files to Know

| File | Purpose |
|------|---------|
| `pages/dashboard.tsx` | Main app |
| `prisma/schema.prisma` | Database structure |
| `utils/progression.ts` | XP formulas |
| `pages/api/tasks/[id]/complete.ts` | Complete quest logic |

## 💡 Common Commands

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run prisma:studio   # View database GUI
npm run prisma:migrate  # Run database migrations
npm run db:seed         # Add demo data
npm run lint            # Check code quality
```

## 🔑 Environment Variables

```env
DATABASE_URL=postgresql://...          # Database connection
NEXTAUTH_SECRET=your-secret-here       # JWT secret
NEXTAUTH_URL=http://localhost:3000     # App URL
NEXT_PUBLIC_API_URL=http://localhost:3000  # API URL
```

## 📚 Learn More

- [Next.js docs](https://nextjs.org/docs)
- [Prisma docs](https://www.prisma.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [PostgreSQL docs](https://www.postgresql.org/docs/)

## ✨ Next Steps

After setup:

1. ✅ Create demo quests
2. ✅ Test leveling system
3. ✅ Try reward shop
4. ✅ Deploy to production
5. ✅ Record demo video
6. ✅ Submit project!

---

**Ready to begin your adventure? Start with `npm run dev`! ⚔️**
