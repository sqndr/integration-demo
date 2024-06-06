import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const DEFAULT_USERNAME = "admin";

console.log("📥 Creating default user...");

async function main() {
  const user = await prisma.user.create({
    data: {
      id: "1",
      name: DEFAULT_USERNAME,
    },
  });

  console.log(`👩🏼Created user: ${user.name}\n`);
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
