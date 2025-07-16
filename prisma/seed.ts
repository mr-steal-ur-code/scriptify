import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const users = [
    { name: 'Test User 10', email: 'test1@example.com', role: 'free' },
    { name: 'Test User 20', email: 'test2@example.com', role: 'free' },
    { name: 'Test User 30', email: 'test3@example.com', role: 'free' },
    { name: 'Test User 40', email: 'test4@example.com', role: 'free' },
    { name: 'Test User 50', email: 'test5@example.com', role: 'free' },
  ];

  await prisma.user.createMany({
    data: users,
    skipDuplicates: true,
  });

  console.log('✅ Seeded 5 test users');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
