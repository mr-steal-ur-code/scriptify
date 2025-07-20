import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create user
  const user = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      name: 'Test User',
    },
  });

  // Create TypeScript track
  const track = await prisma.track.create({
    data: {
      name: 'TypeScript',
      slug: 'typescript',
      language: 'typescript',
      description: 'Learn TypeScript from the ground up!',
      order: 1,
    },
  });

  // Create lessons
  const lesson1 = await prisma.lesson.create({
    data: {
      trackId: track.id,
      title: 'Variables and Constants',
      description: 'Introduction to let, const, and var',
      content: `
In this lesson, you'll learn how to declare variables using \`let\` and \`const\`.
      `,
      order: 1,
    },
  });

  const lesson2 = await prisma.lesson.create({
    data: {
      trackId: track.id,
      title: 'Functions',
      description: 'Learn how to write functions in TypeScript.',
      content: `
In this lesson, you'll define and call functions using TypeScript syntax.
      `,
      order: 2,
    },
  });

  // Create challenges
  const challenge1 = await prisma.challenge.create({
    data: {
      trackId: track.id,
      lessonId: lesson1.id,
      title: 'Declare a variable',
      prompt: `Declare a variable called \`greeting\` with the value "Hello, world!"`,
      starterCode: `// your code here`,
      difficulty: 'easy',
      order: 1,
      language: 'typescript',
      testCases: {
        create: {
          input: '',
          expectedOutput: 'Hello, world!',
        },
      },
    },
  });

  const challenge2 = await prisma.challenge.create({
    data: {
      trackId: track.id,
      lessonId: lesson1.id,
      title: 'Use const keyword',
      prompt: `Use \`const\` to declare a variable \`pi\` with the value 3.14.`,
      starterCode: `// your code here`,
      difficulty: 'easy',
      order: 2,
      language: 'typescript',
      testCases: {
        create: {
          input: '',
          expectedOutput: '3.14',
        },
      },
    },
  });

  const challenge3 = await prisma.challenge.create({
    data: {
      trackId: track.id,
      lessonId: lesson2.id,
      title: 'Write a function',
      prompt: `Write a function \`add(a, b)\` that returns the sum of a and b.`,
      starterCode: `function add(a: number, b: number) {\n  // your code here\n}`,
      difficulty: 'medium',
      order: 1,
      language: 'typescript',
      testCases: {
        create: {
          input: '2, 3',
          expectedOutput: '5',
        },
      },
    },
  });

  // Create progress for the user
  await prisma.progress.createMany({
    data: [
      {
        userId: user.id,
        challengeId: challenge1.id,
        status: 'completed',
      },
      {
        userId: user.id,
        challengeId: challenge2.id,
        status: 'in_progress',
      },
      {
        userId: user.id,
        challengeId: challenge3.id,
        status: 'not_started',
      },
    ],
  });

  // Create a solution for challenge1
  await prisma.solution.create({
    data: {
      userId: user.id,
      challengeId: challenge1.id,
      code: `const greeting = "Hello, world!";`,
    },
  });

  console.log('Seed complete!');
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
