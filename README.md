# ⚔️ Life RPG - Transform Your Life Into An Epic Adventure

A full-stack web application that gamifies productivity by transforming real-world tasks into an engaging RPG progression system. Complete quests, earn experience points, level up your character, and unlock rewards—all while building better habits.

## 🎮 Features

### Core RPG Systems
- **Non-Linear Progression**: Each level requires exponentially more XP (100 × level^1.5)
- **Character Attributes**: Strength, Intellect, Charisma, Endurance—each developed through specific task categories
- **Dynamic Leveling**: Gain XP through task completion and watch your character evolve
- **Streak System**: Build consecutive day streaks to maintain motivation

### Gamification Elements
- **Difficulty Multipliers**: Easy (0.5×), Normal (1×), Hard (1.5×), Legendary (2×) XP modifiers
- **Task Categories**: Fitness, Learning, Work, Health, Creative, General
- **Gold Economy**: Earn gold by completing quests, spend on cosmetic rewards
- **Achievement Tracking**: View completed quests and personal records

### Technical Excellence
- **Secure Authentication**: JWT-based auth with password hashing
- **Real-Time Updates**: Optimistic UI updates for smooth UX
- **Database Persistence**: PostgreSQL with Prisma ORM
- **Responsive Design**: Fully mobile-optimized dark fantasy theme
- **Accessible**: Keyboard navigation and screen reader support

## 🛠️ Tech Stack

**Frontend**
- Next.js 14 (React 18)
- TypeScript
- Tailwind CSS
- Framer Motion (animations)
- Axios (HTTP client)

**Backend**
- Next.js API Routes
- Node.js with Express patterns
- Prisma ORM
- PostgreSQL
- bcryptjs (password hashing)
- JWT (authentication)

**Database**
- PostgreSQL 12+

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- PostgreSQL 12+ (local or cloud)

## 🚀 Setup & Installation

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/yourusername/life-rpg.git
cd life-rpg
npm install
```

### 2. Set Up Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/life_rpg"

# Authentication
NEXTAUTH_SECRET="$(openssl rand -base64 32)"
NEXTAUTH_URL="http://localhost:3000"

# API
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

To generate NEXTAUTH_SECRET:
```bash
openssl rand -base64 32
```

### 3. Set Up Database

```bash
# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# (Optional) Seed demo data
npm run db:seed
```

### 4. Run Development Server

```bash
npm run dev
```

Visit http://localhost:3000

## 📦 Building for Production

### Local Build
```bash
npm run build
npm start
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Render

1. Connect your GitHub repository to [Render](https://render.com)
2. Add environment variables in Render dashboard
3. Set build command: `npm run build`
4. Set start command: `npm start`

### Deploy to Railway

1. Connect GitHub repo to [Railway](https://railway.app)
2. Add PostgreSQL database
3. Set `DATABASE_URL` environment variable
4. Add other env vars

## 🎯 Core Features Checklist

- [x] User Authentication (signup, login, session management)
- [x] Database Schema (Users, Tasks, Activity Logs, Inventory)
- [x] CRUD Operations (full task management)
- [x] RPG Progression Engine (non-linear leveling)
- [x] Attribute System (4 character stats)
- [x] Task Difficulty Multipliers
- [x] Gold Economy System
- [x] Streak Tracking (current & max)
- [x] Task Categories
- [x] Responsive UI (mobile to desktop)
- [x] Keyboard Navigation
- [x] Accessible Components
- [x] Fantasy Theme

## 📸 Demo Credentials

```
Email: test@example.com
Password: password123
```

## 🔒 Security Features

- ✅ Password hashing with bcryptjs
- ✅ JWT authentication with secure tokens
- ✅ HttpOnly cookies for token storage
- ✅ Input validation with Zod schemas
- ✅ User data isolation (users can only access their own data)
- ✅ CSRF protection ready

## 📊 Database Schema

### Users Table
- Basic auth (email, password)
- RPG stats (level, exp, attributes)
- Progression (streaks, gold)
- Customization (title, theme)

### Tasks Table
- Quest details (title, description, category)
- XP rewards (baseXp, attribute bonuses)
- Difficulty multipliers
- Completion tracking

### InventoryItems Table
- Cosmetic items (badges, titles, themes)
- Rarity levels (common to legendary)
- Acquisition timestamp

### ActivityLogs Table
- Action tracking (task_completed, level_up)
- XP history
- Achievement logging

## 🎨 Progression Formula

```
XP_for_level = 100 * (level ^ 1.5)

Example:
Level 1: 100 XP
Level 2: 283 XP  
Level 3: 519 XP
Level 5: 1118 XP
Level 10: 3162 XP
```

## 🎬 Creating a Demo Video

Requirements: < 100MB, 90-180 seconds

Demo script:
1. Show login page (5 sec)
2. Create account or login (10 sec)
3. Create a quest with details (10 sec)
4. Complete the quest and show XP gain (10 sec)
5. Level up celebration (10 sec)
6. Refresh page to show data persistence (10 sec)
7. Show character stats and attributes (10 sec)

## 🐛 Troubleshooting

### Database Connection Issues
```bash
# Check DATABASE_URL format
# Default format: postgresql://user:password@host:port/database

# Test connection
psql "your-database-url"
```

### Port Already in Use
```bash
# On macOS/Linux, find process using port 3000
lsof -i :3000
kill -9 <PID>

# On Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Prisma Issues
```bash
# Reset database
npm run prisma:migrate reset

# View database with Prisma Studio
npm run prisma:studio
```

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px  
- **Desktop**: > 1024px

All pages tested on iPhone 12, iPad, and desktop screens.

## ♿ Accessibility

- ✅ WCAG 2.1 AA compliant
- ✅ Keyboard navigation (Tab, Enter, Space)
- ✅ Screen reader compatible
- ✅ Color contrast ratios > 4.5:1
- ✅ Focus indicators visible
- ✅ Semantic HTML

## 🔗 Project Links

- **Live Demo**: [Deploy your version here]
- **GitHub**: [Your GitHub URL]
- **Video Demo**: [Upload to your repo]

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login

### User
- `GET /api/user/profile` - Get user data
- `PUT /api/user/profile` - Update profile

### Tasks
- `GET /api/tasks` - List tasks
- `POST /api/tasks` - Create task
- `PUT /api/tasks/[id]` - Update task
- `DELETE /api/tasks/[id]` - Delete task
- `POST /api/tasks/[id]/complete` - Complete task (trigger XP)

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma ORM](https://www.prisma.io/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [JWT Authentication](https://jwt.io/)

## 📄 License

MIT License - Feel free to use for personal and commercial projects.

## 🤝 Contributing

Contributions welcome! Feel free to submit issues and pull requests.

---

**Built with ⚔️ and ❤️ for epic life transformation**
