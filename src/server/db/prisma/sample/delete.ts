import { prisma } from "@/server/db/prisma";
import { Role } from "@prisma/client";

async function main() {
  console.log("レコードを1件削除");
  const result1 = await prisma.user.delete({
    where: {
      email: "dave@example.com",
    },
  });
  console.dir(result1, { depth: undefined });
  console.log();

  console.log("レコードを複数削除");
  const result2a = await prisma.post.deleteMany();
  console.dir(result2a, { depth: undefined });
  console.log();

  const result2b = await prisma.user.deleteMany({
    where: {
      role: Role.ADMIN,
    },
  });
  console.dir(result2b, { depth: undefined });
  console.log();
}
try {
  await main();
} catch (error) {
  console.error(error);
  throw error;
}
