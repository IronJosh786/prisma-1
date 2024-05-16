import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function createUser() {
  await prisma.user.create({
    data: {
      email: "test@test.com",
      name: "test user",
    },
  });
}

createUser()
  .then(async () => {
    console.log("Created user successfully");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log("error while creating user: ", e);
    await prisma.$disconnect();
    process.exit(1);
  });
