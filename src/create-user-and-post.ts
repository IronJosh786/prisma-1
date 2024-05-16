import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function createRecord() {
  await prisma.user.create({
    data: {
      email: "test1@test.com",
      name: "test user",
      post: {
        create: [
          {
            title: "Second Post",
          },
          {
            title: "Third Post",
            content: "This & second post was created along with the user",
          },
        ],
      },
    },
  });
}

createRecord()
  .then(async () => {
    console.log("Created record successfully");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log("error while creating record: ", e);
    await prisma.$disconnect();
    process.exit(1);
  });
