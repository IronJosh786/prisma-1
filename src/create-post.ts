import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function createPost() {
  await prisma.post.create({
    data: {
      title: "First post",
      content: "This is a testing post",
      author: {
        connect: {
          id: 1,
        },
      },
      // authorId: 1,
    },
  });
}

createPost()
  .then(async () => {
    console.log("Created post successfully");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log("error while creating post: ", e);
    await prisma.$disconnect();
    process.exit(1);
  });
