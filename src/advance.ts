import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  // to log raw queries
  log: [
    {
      emit: "event",
      level: "query",
    },
  ],
});

async function query1() {
  const data = await prisma.user.findMany({
    where: {
      email: {
        endsWith: "test.com",
      },
    },
    include: {
      post: {
        where: {
          published: false,
        },
      },
    },
    take: 2,
    skip: 0,
  });
  console.log(JSON.stringify(data));
}

query1()
  .then(async () => {
    console.log("Fetched data successfully");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log("error while fetching data: ", e);
    await prisma.$disconnect();
    process.exit(1);
  });

// to see the data that are being passed as $1, $2, ...
prisma.$on("query", async (e) => {
  console.log(`${e.query} ${e.params}`);
});
