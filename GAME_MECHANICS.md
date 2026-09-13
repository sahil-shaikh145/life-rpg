# 🎮 Game Mechanics - Life RPG

Complete guide to the RPG progression system.

## Character System

### Attributes

Each character has 4 core attributes that increase as you complete quests:

| Attribute | Description | Increased By |
|-----------|-------------|--------------|
| **Strength** 💪 | Physical power & discipline | Fitness, Sports quests |
| **Intellect** 🧠 | Learning & problem solving | Learning, Work quests |
| **Charisma** 💬 | Social skills & communication | Social, Creative quests |
| **Endurance** ❤️ | Stamina & resilience | Health, Long-duration quests |

Each attribute starts at 10 and can go beyond 100.

### Character Level

**Formula**: `XP_needed = 100 × (level ^ 1.5)`

| Level | XP Required | Total XP |
|-------|-------------|----------|
| 1→2 | 100 XP | 100 |
| 2→3 | 283 XP | 383 |
| 3→4 | 520 XP | 903 |
| 4→5 | 811 XP | 1,714 |
| 5→10 | varies | ~4,000 |

Leveling creates a **non-linear progression**:
- Early levels unlock quickly (motivation)
- Mid levels take steady grind
- Late levels require mastery

## Quest System

### Quest Types

All quests are tasks you complete in real life. They're categorized as:

| Category | Icon | Best For |
|----------|------|----------|
| Fitness | 💪 | Workouts, sports, running |
| Learning | 📚 | Reading, courses, studying |
| Work | 💼 | Projects, meetings, tasks |
| Health | 🏥 | Meditation, sleep, nutrition |
| Creative | 🎨 | Art, writing, music |
| General | 📋 | Everything else |

### Quest Difficulty

Each quest has a difficulty that multiplies base XP:

| Difficulty | Multiplier | Base XP Range | Example |
|-----------|-----------|---------------|---------|
| **Easy** | 0.5× | 5-25 | Quick task, <30 min |
| **Normal** | 1.0× | 10-50 | Standard task, ~1 hr |
| **Hard** | 1.5× | 15-75 | Challenging, 2+ hrs |
| **Legendary** | 2.0× | 20-100 | Epic quest, major effort |

**Example**: A "Hard" quest with 30 base XP = 45 XP earned

## Experience & Rewards

### XP Sources

When you complete a quest, you earn:

1. **Base XP** - Determined by difficulty
2. **Attribute Bonuses** - Extra XP for matched attributes
3. **Gold** - Currency (base XP ÷ 5)

```
Total XP = Base XP + Strength Bonus + Intellect Bonus + 
           Charisma Bonus + Endurance Bonus
```

**Example Quest Rewards**:
- Easy fitness task: 5 + 2 strength = 7 XP, 1 Gold
- Hard learning task: 45 + 8 intellect = 53 XP, 9 Gold
- Legendary life project: 100 + 5 + 5 + 5 + 5 = 120 XP, 24 Gold

### Gold Economy

Gold is earned through quests and spent on cosmetics:

| Item | Cost | Benefit |
|------|------|---------|
| Dark Knight Title | 500 | Prestige title |
| Gold Theme | 300 | UI theme unlock |
| Master Badge | 1000 | Achievement badge |
| Celestial Avatar | 750 | Cosmetic upgrade |

## Streak System

A **streak** tracks consecutive days of activity.

### How Streaks Work

- Streak increases by 1 for each day you complete ≥1 quest
- Streak resets to 0 if you miss a day
- Max Streak records your personal best

### Streak Benefits

- 🔥 **Motivation**: Visual reminder of your momentum
- 📊 **Progress tracking**: See long-term consistency
- 🎯 **Challenge**: Try to beat your personal record

### Example Streaks

| Streak | Status | Meaning |
|--------|--------|---------|
| 0 | Just started | Haven't completed today |
| 3 | Good start | 3-day momentum building |
| 7 | Week warrior | One full week! |
| 30 | Master | One full month! |
| 365 | Legend | Full year of daily quests! |

## Progression Journey

### Level 1-5: Tutorial Phase
- Quick XP gains for motivation
- Learn mechanics with easy quests
- Build initial habits

### Level 6-15: Growth Phase
- XP requirements increasing
- Mix of easy and hard quests
- Attributes starting to matter
- Earning gold for cosmetics

### Level 16+: Mastery Phase
- Significant XP requirements
- Challenge-focused quests
- Optimization of attributes
- Collection of cosmetics
- Competition (leaderboards—optional feature)

## Strategy Tips

### Build Your Attributes
- Focused: Pick 1-2 attributes to max out
- Balanced: Spread quests across all four
- Flex: Match quests to what you need

**Focused Example**:
- Want to be "Scholar"? Do all Learning quests
- Want to be "Warrior"? Do all Fitness quests
- Want to be "Sage"? Do all Creative quests

### Efficient Leveling

```
Equation: XP/time = (XP per quest) / (minutes to complete)

High efficiency: Many easy quests
Slow efficiency: Few hard quests
Balanced: Mix of both
```

### Streak Optimization

- Complete 1 small quest per day minimum
- Pick easier quests on busy days
- Save hard quests for days with free time
- Plan ahead: "How can I maintain my streak?"

## Quest Creation Best Practices

### Good Quest Examples

✅ **"Go to the gym for 30 minutes"**
- Clear, time-bound
- Objective completion criteria
- Measurable

✅ **"Read programming book chapter 5"**
- Specific deliverable
- Defined scope
- Trackable

✅ **"Meditate for 10 minutes"**
- Exact duration
- Simple to verify

### Poor Quest Examples

❌ **"Get better at coding"**
- Too vague
- Hard to define completion
- Too long-term

❌ **"Be productive today"**
- Not specific
- Unclear success criteria
- Too broad

❌ **"Exercise"**
- How long?
- What type?
- No measurable goal

### Creating Effective Quests

1. **Use action verbs**: Complete, Read, Run, Write, Build
2. **Add time/quantity**: "for 1 hour", "3 pages", "5km"
3. **Make it achievable**: Completable in one session
4. **Describe why**: Add category for attribute alignment
5. **Set difficulty**: Match actual effort required

## Advanced: Attribute Combos

While any quest works alone, combinations are powerful:

```
Warrior Path: Strength + Endurance
→ Fitness + Health quests
→ Physical excellence

Scholar Path: Intellect + Charisma  
→ Learning + Creative quests
→ Intellectual excellence

Sage Path: Intellect + Endurance
→ Meditation + Deep work
→ Wisdom and resilience
```

## Preventing Cheating

The system has built-in anti-cheat:

- ✅ Database stores task completion server-side
- ✅ No client-side XP modification possible
- ✅ JWT tokens validate user ownership
- ✅ Timestamps prove real completion
- ✅ Difficult to farm gold efficiently

**Fair play** is encouraged by design.

## Accessibility Features

- 🎨 Dark theme (eye-friendly)
- ♿ Keyboard navigation
- 📱 Mobile responsive
- 🔊 Screen reader compatible
- ⚡ Fast load times

## Psychology of Gamification

This system works because:

1. **Immediate Feedback**: Complete quest → See XP instantly
2. **Clear Progression**: Watch level bar fill
3. **Multiple Metrics**: Track 4 attributes + streak + gold
4. **Variable Rewards**: Each quest different
5. **Social Proof**: Share achievements
6. **Long-term Goal**: Max level achievement
7. **Intrinsic Motivation**: Real-world habit building

## Daily Quests (Optional Feature)

Could add:
- Random daily quest suggestions
- Double XP events
- Weekly challenges
- Seasonal events

## Leaderboards (Optional Feature)

Could add:
- Global level rankings
- Fastest to max level
- Highest streak count
- Best attribute optimization

---

**Remember: The real reward is your improved life. 
The game is just tracking your awesome progress! 🎮**
