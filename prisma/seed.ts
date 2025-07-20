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
  const tsTrack = await prisma.track.create({
    data: {
      name: 'TypeScript',
      slug: 'typescript',
      language: 'typescript',
      description: 'Learn TypeScript from the ground up!',
      order: 1,
      paradigms: ['declarative', 'functional', 'object_oriented'], // example paradigms
    },
  });

  // TypeScript lessons
  const tsLesson1 = await prisma.lesson.create({
    data: {
      trackId: tsTrack.id,
      title: 'Variables and Constants',
      description: 'Introduction to let, const, and var',
      content: `
In this lesson, you'll learn how to declare variables using \`let\` and \`const\`.
      `,
      order: 1,
    },
  });

  const tsLesson2 = await prisma.lesson.create({
    data: {
      trackId: tsTrack.id,
      title: 'Functions',
      description: 'Learn how to write functions in TypeScript.',
      content: `
In this lesson, you'll define and call functions using TypeScript syntax.
      `,
      order: 2,
    },
  });

  // TypeScript challenges
  const tsChallenge1 = await prisma.challenge.create({
    data: {
      trackId: tsTrack.id,
      lessonId: tsLesson1.id,
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

  const tsChallenge2 = await prisma.challenge.create({
    data: {
      trackId: tsTrack.id,
      lessonId: tsLesson1.id,
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

  const tsChallenge3 = await prisma.challenge.create({
    data: {
      trackId: tsTrack.id,
      lessonId: tsLesson2.id,
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

  // Create JavaScript track with paradigms
  const jsTrack = await prisma.track.create({
    data: {
      name: 'JavaScript',
      slug: 'javascript',
      language: 'javascript',
      description: 'Master JavaScript fundamentals and beyond.',
      order: 2,
      paradigms: ['imperative', 'functional', 'object_oriented', 'procedural'],
    },
  });

  // JavaScript lessons
  const jsLesson1 = await prisma.lesson.create({
    data: {
      trackId: jsTrack.id,
      title: 'Basic Syntax',
      description: 'Learn JavaScript syntax basics including variables and data types.',
      content: `
This lesson covers variables (var, let, const), data types, and simple expressions.
      `,
      order: 1,
    },
  });

  const jsLesson2 = await prisma.lesson.create({
    data: {
      trackId: jsTrack.id,
      title: 'Control Flow',
      description: 'If statements, loops, and conditional logic in JavaScript.',
      content: `
You will learn about \`if\`, \`else\`, \`switch\`, \`for\`, and \`while\` loops.
      `,
      order: 2,
    },
  });

  // JavaScript challenges
  const jsChallenge1 = await prisma.challenge.create({
    data: {
      trackId: jsTrack.id,
      lessonId: jsLesson1.id,
      title: 'Declare a variable with var',
      prompt: `Declare a variable named \`name\` using \`var\` and assign it your name.`,
      starterCode: `// your code here`,
      difficulty: 'easy',
      order: 1,
      language: 'javascript',
      testCases: {
        create: {
          input: '',
          expectedOutput: 'Your Name', // replace with expected string for tests
        },
      },
    },
  });

  const jsChallenge2 = await prisma.challenge.create({
    data: {
      trackId: jsTrack.id,
      lessonId: jsLesson2.id,
      title: 'Write a for loop',
      prompt: `Write a \`for\` loop that counts from 1 to 5 and logs each number.`,
      starterCode: `// your code here`,
      difficulty: 'medium',
      order: 1,
      language: 'javascript',
      testCases: {
        create: {
          input: '',
          expectedOutput: '1\n2\n3\n4\n5', // assuming output is newline separated
        },
      },
    },
  });

  // Create progress for the user on all challenges
  await prisma.progress.createMany({
    data: [
      // TypeScript progress
      {
        userId: user.id,
        challengeId: tsChallenge1.id,
        status: 'completed',
      },
      {
        userId: user.id,
        challengeId: tsChallenge2.id,
        status: 'in_progress',
      },
      {
        userId: user.id,
        challengeId: tsChallenge3.id,
        status: 'not_started',
      },
      // JavaScript progress
      {
        userId: user.id,
        challengeId: jsChallenge1.id,
        status: 'not_started',
      },
      {
        userId: user.id,
        challengeId: jsChallenge2.id,
        status: 'not_started',
      },
    ],
  });

  // Create a solution for TypeScript challenge1
  await prisma.solution.create({
    data: {
      userId: user.id,
      challengeId: tsChallenge1.id,
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
