/**
 * RPG Progression System
 * Non-linear leveling where each level requires exponentially more XP
 * Formula: XP_needed = 100 * (level^1.5)
 */

export function calculateLevelUpThreshold(level: number): number {
  return Math.floor(100 * Math.pow(level, 1.5));
}

export function getTotalXpForLevel(level: number): number {
  let total = 0;
  for (let i = 1; i < level; i++) {
    total += calculateLevelUpThreshold(i);
  }
  return total;
}

export function calculateNewLevel(currentXp: number, currentLevel: number) {
  let level = currentLevel;
  let totalXpNeeded = getTotalXpForLevel(level);
  let xpGained = currentXp - totalXpNeeded;
  let levelUps = 0;

  while (xpGained >= calculateLevelUpThreshold(level)) {
    xpGained -= calculateLevelUpThreshold(level);
    level++;
    levelUps++;
  }

  return {
    level,
    remainingExp: xpGained,
    leveledUp: levelUps > 0,
    levelUps,
  };
}

export function getXpProgress(currentExp: number, level: number): {
  current: number;
  needed: number;
  percentage: number;
} {
  const threshold = calculateLevelUpThreshold(level);
  const previousTotal = getTotalXpForLevel(level);
  const progressXp = currentExp - previousTotal;

  return {
    current: Math.max(0, progressXp),
    needed: threshold,
    percentage: Math.min(100, (progressXp / threshold) * 100),
  };
}

export const DIFFICULTY_MULTIPLIERS = {
  Easy: 0.5,
  Normal: 1,
  Hard: 1.5,
  Legendary: 2,
} as const;

export const ATTRIBUTE_NAMES = {
  strength: 'Strength',
  intellect: 'Intellect',
  charisma: 'Charisma',
  endurance: 'Endurance',
} as const;

export const ATTRIBUTE_COLORS = {
  strength: '#ef4444',
  intellect: '#3b82f6',
  charisma: '#ec4899',
  endurance: '#10b981',
} as const;
