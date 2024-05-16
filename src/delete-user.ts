import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function deleteUser() {
  await prisma.user.update({
    where: {
      id: 1,
    },
    data: {
      post: {
        deleteMany: {
          published: false,
        },
      },
    },
  });
  await prisma.user.delete({
    where: {
      id: 1,
    },
  });
}

deleteUser()
  .then(async () => {
    console.log("Deleted user successfully");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log("error while deleting user: ", e);
    await prisma.$disconnect();
    process.exit(1);
  });
