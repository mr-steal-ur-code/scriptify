import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

async function main() {
  const filePath = path.join(__dirname, "seed-data.json");
  const rawData = fs.readFileSync(filePath, "utf-8");
  const tracks = JSON.parse(rawData);

  await prisma.user.upsert({
    where: { email: 'JohnDoe@example.com' },
    update: {},
    create: {
      email: 'JohnDoe@example.com',
      name: 'John Doe',
    },
  });

  for (const track of tracks) {
    await prisma.track.upsert({
      where: { id: track.id },
      update: {
        name: track.name,
        slug: track.slug,
        language: track.language,
        description: track.description,
        order: track.order,
        paradigms: track.paradigms,
      },
      create: {
        id: track.id,
        name: track.name,
        slug: track.slug,
        language: track.language,
        description: track.description,
        order: track.order,
        paradigms: track.paradigms,
      },
    });

    if (track.lessons) {
      for (const lesson of track.lessons) {
        await prisma.lesson.upsert({
          where: { id: lesson.id },
          update: {
            title: lesson.title,
            description: lesson.description,
            content: lesson.content,
            order: lesson.order,
          },
          create: {
            id: lesson.id,
            title: lesson.title,
            description: lesson.description,
            content: lesson.content,
            order: lesson.order,
            trackId: track.id,
          },
        });

        if (lesson.challenges) {
          for (const challenge of lesson.challenges) {
            await prisma.challenge.upsert({
              where: { id: challenge.id },
              update: {
                title: challenge.title,
                prompt: challenge.prompt,
                starterCode: challenge.starterCode,
                difficulty: challenge.difficulty,
                order: challenge.order,
                language: challenge.language,
              },
              create: {
                id: challenge.id,
                title: challenge.title,
                prompt: challenge.prompt,
                starterCode: challenge.starterCode,
                difficulty: challenge.difficulty,
                order: challenge.order,
                language: challenge.language,
                trackId: track.id,
                lessonId: lesson.id,
              },
            });

            if (challenge.testCases) {
              for (const tc of challenge.testCases) {
                await prisma.testCase.upsert({
                  where: { id: tc.id },
                  update: {
                    input: tc.input,
                    expectedOutput: tc.expectedOutput,
                  },
                  create: {
                    id: tc.id,
                    input: tc.input,
                    expectedOutput: tc.expectedOutput,
                    challengeId: challenge.id,
                  },
                });
              }
            }

            if (challenge.solutions) {
              for (const sol of challenge.solutions) {
                await prisma.solution.upsert({
                  where: { id: sol.id },
                  update: {
                    code: sol.code,
                  },
                  create: {
                    id: sol.id,
                    code: sol.code,
                    challengeId: challenge.id,
                  },
                });
              }
            }
          }
        }
      }
    }

    if (track.challenges) {
      for (const challenge of track.challenges) {
        await prisma.challenge.upsert({
          where: { id: challenge.id },
          update: {
            title: challenge.title,
            prompt: challenge.prompt,
            starterCode: challenge.starterCode,
            difficulty: challenge.difficulty,
            order: challenge.order,
            language: challenge.language,
            lessonId: challenge.lessonId || null,
          },
          create: {
            id: challenge.id,
            title: challenge.title,
            prompt: challenge.prompt,
            starterCode: challenge.starterCode,
            difficulty: challenge.difficulty,
            order: challenge.order,
            language: challenge.language,
            trackId: track.id,
            lessonId: challenge.lessonId || null,
          },
        });

        if (challenge.testCases) {
          for (const tc of challenge.testCases) {
            await prisma.testCase.upsert({
              where: { id: tc.id },
              update: {
                input: tc.input,
                expectedOutput: tc.expectedOutput,
              },
              create: {
                id: tc.id,
                input: tc.input,
                expectedOutput: tc.expectedOutput,
                challengeId: challenge.id,
              },
            });
          }
        }

        if (challenge.solutions) {
          for (const sol of challenge.solutions) {
            await prisma.solution.upsert({
              where: { id: sol.id },
              update: {
                code: sol.code,
              },
              create: {
                id: sol.id,
                code: sol.code,
                challengeId: challenge.id,
              },
            });
          }
        }
      }
    }
  }

  console.log("✅ Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding data:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());