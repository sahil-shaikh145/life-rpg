# 📁 Project Structure - Life RPG

## Directory Overview

```
life-rpg/
├── pages/                      # Next.js pages & API routes
│   ├── api/                   # Backend API endpoints
│   │   ├── auth/
│   │   │   ├── register.ts    # POST /api/auth/register
│   │   │   └── login.ts       # POST /api/auth/login
│   │   ├── user/
│   │   │   └── profile.ts     # GET/PUT /api/user/profile
│   │   └── tasks/
│   │       ├── index.ts       # GET/POST /api/tasks
│   │       ├── [id].ts        # PUT/DELETE /api/tasks/[id]
│   │       └── [id]/complete.ts # POST /api/tasks/[id]/complete
│   ├── _app.tsx               # Next.js app wrapper
│   ├── index.tsx              # Landing page
│   ├── login.tsx              # Login page
│   ├── register.tsx           # Registration page
│   ├── dashboard.tsx          # Main app dashboard
│   └── 404.tsx                # 404 error page
│
├── components/                # React components
│   ├── Header.tsx             # Top navigation bar
│   ├── CharacterStats.tsx     # Character stats panel
│   ├── CreateQuestForm.tsx    # Quest creation form
│   ├── QuestList.tsx          # Quest list container
│   ├── QuestCard.tsx          # Individual quest card
│   └── InventoryPanel.tsx     # Inventory/shop panel
│
├── utils/                     # Utility functions
│   ├── auth.ts               # JWT & auth helpers
│   ├── progression.ts        # RPG progression formulas
│   └── withAuth.ts           # Auth middleware
│
├── styles/                    # Global styles
│   └── globals.css           # Tailwind + custom CSS
│
├── prisma/                    # Database configuration
│   ├── schema.prisma         # Database models
│   └── migrations/           # Migration history
│
├── scripts/                   # Utility scripts
│   └── seed.js               # Database seeding
│
├── public/                    # Static files
│   └── [assets go here]
│
├── Configuration Files
│   ├── package.json           # Dependencies & scripts
│   ├── tsconfig.json         # TypeScript config
│   ├── next.config.js        # Next.js config
│   ├── tailwind.config.js    # Tailwind config
│   ├── postcss.config.js     # PostCSS config
│   ├── .env.example          # Environment template
│   ├── .gitignore            # Git ignore rules
│   ├── vercel.json           # Vercel deployment config
│   ├── Dockerfile            # Docker configuration
│
├── Documentation
│   ├── README.md             # Main readme
│   ├── DEPLOYMENT.md         # Deployment guide
│   └── PROJECT_STRUCTURE.md  # This file
│
└── .github/
    ├── workflows/            # GitHub Actions (optional)
    └── ...
```

## File Descriptions

### Pages

| File | Purpose |
|------|---------|
| `pages/index.tsx` | Landing page with hero section & CTA |
| `pages/login.tsx` | User login form |
| `pages/register.tsx` | User account creation |
| `pages/dashboard.tsx` | Main app with tabs (quests, stats, inventory) |
| `pages/404.tsx` | Custom 404 error page |

### API Routes

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/auth/register` | POST | Create new user account |
| `/api/auth/login` | POST | Authenticate and get JWT token |
| `/api/user/profile` | GET | Fetch user character data |
| `/api/user/profile` | PUT | Update user profile (title, theme) |
| `/api/tasks` | GET | List all user tasks |
| `/api/tasks` | POST | Create new task/quest |
| `/api/tasks/[id]` | PUT | Update task details |
| `/api/tasks/[id]` | DELETE | Delete task |
| `/api/tasks/[id]/complete` | POST | Mark task complete, award XP |

### Components

| Component | Purpose |
|-----------|---------|
| `Header.tsx` | Navigation bar with user info |
| `CharacterStats.tsx` | Character level, XP, attributes display |
| `CreateQuestForm.tsx` | Form to create new quests |
| `QuestList.tsx` | Container for active/completed quests |
| `QuestCard.tsx` | Individual quest card component |
| `InventoryPanel.tsx` | Reward shop & inventory display |

### Utils

| File | Purpose |
|------|---------|
| `auth.ts` | JWT verification, token extraction |
| `progression.ts` | XP formulas, level calculations |
| `withAuth.ts` | Auth middleware for protected routes |

### Database

| Model | Purpose |
|-------|---------|
| `User` | User account & RPG character data |
| `Task` | Quest/task details & XP rewards |
| `InventoryItem` | Cosmetic items & rewards |
| `ActivityLog` | Historical activity tracking |

## Data Flow

```
User Action (UI)
    ↓
Component Event Handler
    ↓
API Call (axios)
    ↓
Next.js API Route
    ↓
Verify Auth (JWT)
    ↓
Validate Input (Zod)
    ↓
Database Query (Prisma)
    ↓
PostgreSQL
    ↓
Response sent back
    ↓
Component updates with new data
    ↓
UI re-renders
```

## State Management

This project uses:
- **React useState**: Local component state
- **localStorage**: Persisted auth token
- **Axios + async/await**: API communication
- **Prisma**: Server-side data management

No Redux/Context needed for this scale.

## Authentication Flow

```
Register Page
    ↓
POST /api/auth/register
    ↓
Hash password (bcryptjs)
    ↓
Create User in DB
    ↓
POST /api/auth/login (auto)
    ↓
Generate JWT token
    ↓
Store token in localStorage
    ↓
Redirect to Dashboard
    ↓
All subsequent requests include token in Authorization header
```

## Key Dependencies

| Package | Purpose |
|---------|---------|
| `next` | React framework |
| `react` | UI library |
| `@prisma/client` | Database ORM |
| `prisma` | Database tools |
| `axios` | HTTP client |
| `bcryptjs` | Password hashing |
| `jsonwebtoken` | JWT tokens |
| `zod` | Input validation |
| `tailwindcss` | Styling |
| `framer-motion` | Animations |

## Environment Variables

```env
DATABASE_URL          # PostgreSQL connection string
NEXTAUTH_SECRET       # Secret for JWT signing
NEXTAUTH_URL          # Application URL (for CORS)
NEXT_PUBLIC_API_URL   # Public API endpoint (exposed to browser)
NODE_ENV              # development or production
```

## Build & Deploy Process

```
Development (npm run dev)
    ↓ Watches for changes
    ↓ Hot reloads
    
Production (npm run build)
    ↓ Runs prisma:generate
    ↓ Compiles TypeScript
    ↓ Optimizes React/Next.js
    ↓ Creates .next directory
    
Run Production (npm start)
    ↓ Starts server on port 3000
    ↓ Uses optimized bundle
```

## Performance Considerations

1. **Database Queries**
   - Prisma relationships: `include` for related data
   - Indexes on frequently queried fields (userId, completed)

2. **API Responses**
   - Exclude passwords from user responses
   - Paginate large result sets if needed
   - Use HTTP caching headers

3. **Frontend**
   - Code splitting (automatic with Next.js)
   - Image optimization (next/image)
   - CSS-in-JS (Tailwind - efficient)
   - Optimistic UI updates

## Security Measures

1. **Authentication**
   - JWT tokens with expiry
   - HttpOnly cookies for token storage
   - Password hashing with bcryptjs

2. **Data Validation**
   - Zod schemas on all inputs
   - Server-side validation (never trust client)
   - SQL injection protection (Prisma parameterized queries)

3. **Authorization**
   - User can only access their own data
   - API routes verify token ownership
   - Database queries filtered by userId

4. **Network**
   - HTTPS enforced in production
   - CORS headers configured
   - CSP headers for security

## Testing Strategy (Optional)

To add tests:

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

Test files would go in `__tests__/` directories alongside their targets.

## Deployment Checklist

- [ ] All env vars configured in hosting platform
- [ ] Database created and migrations run
- [ ] HTTPS enabled
- [ ] Email verification (if needed) implemented
- [ ] Error monitoring (Sentry) configured
- [ ] Database backups enabled
- [ ] CDN configured
- [ ] Domain configured
- [ ] SSL certificate valid
- [ ] Rate limiting enabled

## Common Tasks

### Add a new API endpoint
1. Create file in `pages/api/`
2. Add route handler function
3. Verify auth with `verifyAuth()`
4. Validate input with Zod
5. Query database with Prisma
6. Return JSON response

### Add a new component
1. Create file in `components/`
2. Define TypeScript interfaces
3. Export default React component
4. Import and use in pages
5. Add Tailwind classes

### Update database schema
1. Edit `prisma/schema.prisma`
2. Run `npm run prisma:migrate`
3. Name your migration
4. Prisma generates types automatically
5. Re-deploy to production

### Deploy new changes
1. Commit to Git
2. Push to main branch
3. Platform (Vercel/Railway) auto-deploys
4. Database migrations run automatically
5. Monitor deployment logs

---

**For detailed API docs, see README.md**
**For deployment instructions, see DEPLOYMENT.md**
