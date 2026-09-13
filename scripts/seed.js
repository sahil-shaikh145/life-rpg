const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create demo user
  const demoPassword = await bcrypt.hash('password123', 10);
  
  const user = await prisma.user.create({
    data: {
      email: 'test@example.com',
      username: 'Brave Adventurer',
      password: demoPassword,
      level: 1,
      totalExp: 0,
      currentExp: 0,
      strength: 15,
      intellect: 18,
      charisma: 12,
      endurance: 14,
      gold: 250,
      currentStreak: 5,
      maxStreak: 12,
      title: 'Novice Warrior',
      theme: 'dark',
    },
  });

  console.log(`✅ Created demo user: ${user.username}`);

  // Create sample tasks
  const tasks = await Promise.all([
    prisma.task.create({
      data: {
        userId: user.id,
        title: 'Complete Daily Standup',
        description: 'Join the team meeting and discuss progress',
        category: 'Work',
        difficulty: 'Easy',
        baseXp: 10,
        strengthXp: 0,
        intellectXp: 0,
        charismaXp: 2,
        enduranceXp: 0,
      },
    }),
    prisma.task.create({
      data: {
        userId: user.id,
        title: 'Read Programming Book Chapter',
        description: 'Complete chapter 5 of Clean Code',
        category: 'Learning',
        difficulty: 'Normal',
        baseXp: 20,
        strengthXp: 0,
        intellectXp: 5,
        charismaXp: 0,
        enduranceXp: 0,
      },
    }),
    prisma.task.create({
      data: {
        userId: user.id,
        title: 'Go to the Gym',
        description: 'Complete 1 hour full body workout',
        category: 'Fitness',
        difficulty: 'Hard',
        baseXp: 30,
        strengthXp: 8,
        intellectXp: 0,
        charismaXp: 0,
        enduranceXp: 5,
      },
    }),
    prisma.task.create({
      data: {
        userId: user.id,
        title: 'Meditate for 10 Minutes',
        description: 'Practice mindfulness meditation',
        category: 'Health',
        difficulty: 'Easy',
        baseXp: 5,
        strengthXp: 0,
        intellectXp: 2,
        charismaXp: 0,
        enduranceXp: 3,
      },
    }),
  ]);

  console.log(`✅ Created ${tasks.length} sample tasks`);

  // Mark one task as completed
  await prisma.task.update({
    where: { id: tasks[0].id },
    data: {
      completed: true,
      completedAt: new Date(),
    },
  });

  console.log('✅ Marked 1 task as completed');

  console.log('\n🎮 Seed complete! Demo credentials:');
  console.log('   Email: test@example.com');
  console.log('   Password: password123');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
