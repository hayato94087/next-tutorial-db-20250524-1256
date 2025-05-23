import { prisma } from "@/server/db/prisma";
import { Role } from "@prisma/client";

async function main() {
  console.log("レコードを1件更新");
  const result1a = await prisma.user.update({
    data: {
      name: "Dave",
    },
    where: {
      email: "dave@example.com",
    },
  });
  console.dir(result1a, { depth: undefined });
  console.log();

  console.log("レコードを複数件更新");
  const result2a = await prisma.user.updateMany({
    data: {
      role: Role.ADMIN,
    },
    where: {
      name: {
        startsWith: "C",
      },
    },
  });
  console.dir(result2a, { depth: undefined });
  console.log();

  console.log("レコードを複数件更新後に更新したレコードを返却");
  const result3a = await prisma.user.updateManyAndReturn({
    data: {
      role: Role.ADMIN,
    },
    where: {
      name: {
        startsWith: "B",
      },
    },
  });
  console.dir(result3a, { depth: undefined });
  console.log();

  console.log("Upsert");
  const result4a = await prisma.user.upsert({
    create: {
      email: "viola@prisma.io",
      name: "Viola the Magnificent",
    },
    update: {
      name: "Viola the Magnificent",
    },
    where: {
      email: "viola@prisma.io",
    },
  });
  console.dir(result4a, { depth: undefined });
  console.log();

  const result4b = await prisma.user.upsert({
    create: {
      email: "dave@example.com",
      name: "Dave the Magnificent",
    },
    update: {
      name: "Dave the Magnificent",
    },
    where: {
      email: "dave@example.com",
    },
  });
  console.dir(result4b, { depth: undefined });
  console.log();

  console.log("数値を更新");
  const result5a = await prisma.post.updateMany({
    data: {
      likes: {
        increment: 1,
      },
    },
    where: {
      author: {
        email: "alice@example.com",
      },
    },
  });
  console.dir(result5a, { depth: undefined });
  console.log();
}
try {
  await main();
} catch (error) {
  console.error(error);
  throw error;
}
