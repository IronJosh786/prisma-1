import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function updatePost() {
  await prisma.post.update({
    where: {
      id: 2,
    },
    data: {
      content: "This is updated content",
    },
  });
}

updatePost()
  .then(async () => {
    console.log("Updated post successfully");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log("error while updating post: ", e);
    await prisma.$disconnect();
    process.exit(1);
  });
