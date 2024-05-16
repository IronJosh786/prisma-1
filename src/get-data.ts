import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function createUser() {
  const users = await prisma.user
    .findMany
    // {
    //     where: {
    //         id: 1,
    //     },
    // }
    ();
  console.log(users);
  const user = await prisma.user.findUnique({
    where: {
      id: 3,
    },
    include: {
      post: true,
    },
  });
  console.log(user);
}

createUser()
  .then(async () => {
    console.log("Fetched details successfully");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log("error while fetching details: ", e);
    await prisma.$disconnect();
    process.exit(1);
  });
