import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

async function main() {
  console.log("🔄 Fetching data from production database...");

  const tracks = await prisma.track.findMany({
    include: {
      lessons: {
        orderBy: { order: "asc" },
      },
      challenges: {
        include: {
          solutions: true,
          testCases: true,
        },
        orderBy: { order: "asc" },
      },
    },
    orderBy: { order: "asc" },
  });

  const filePath = path.join(__dirname, "../prisma/seed-data.json");

  fs.writeFileSync(filePath, JSON.stringify(tracks, null, 2));

  console.log(`✅ Exported ${tracks.length} tracks to ${filePath}`);
}

main()
  .catch((e) => {
    console.error("❌ Error exporting data:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
