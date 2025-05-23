import { prisma } from "@/server/db/prisma";
import { Role } from "@prisma/client";

async function main() {
  console.log("--------------------------------");
  console.log("便利関数");
  console.log("--------------------------------");
  console.log();

  console.log("一意のレコードを取得");
  const result1a = await prisma.user.findUnique({
    where: {
      email: "alice@example.com",
    },
  });
  console.dir(result1a, { depth: undefined });
  console.log();

  // ❌️ これはエラーになります。
  // const result1b = await prisma.user.findUnique({
  //   where: {
  //     role: Role.USER, // role は unique ではないのでエラーになります。
  //   },
  // })

  console.log("レコードを複数件取得");
  const result1c = await prisma.user.findMany();
  console.dir(result1c, { depth: undefined });
  console.log();

  console.log("特定条件の最初のレコードを取得");
  const result1d = await prisma.user.findFirst();
  console.dir(result1d, { depth: undefined });
  console.log();

  const result1da = await prisma.user.findFirst({
    orderBy: {
      id: "desc",
    },
    where: {
      role: Role.USER,
    },
  });
  console.dir(result1da, { depth: undefined });
  console.log();

  console.log("関連テーブルのレコードを取得");
  const result1e = await prisma.user.findMany({
    include: {
      posts: true,
    },
  });
  console.dir(result1e, { depth: undefined });
  console.log();

  const result1f = await prisma.user.findMany({
    include: {
      posts: true,
    },
    where: {
      email: "alice@example.com",
    },
  });
  console.dir(result1f, { depth: undefined });
  console.log();

  console.log("--------------------------------");
  console.log("レコードを絞り込む");
  console.log("--------------------------------");
  console.log();

  console.log("単一カラムでレコードを絞り込み");
  const result2a = await prisma.user.findMany({
    where: {
      role: Role.USER,
    },
  });
  console.dir(result2a, { depth: undefined });
  console.log();

  console.log("複数カラムでレコードを絞り込み");
  const result2b = await prisma.user.findMany({
    where: {
      email: {
        endsWith: "example.com",
      },
      role: Role.ADMIN,
    },
  });
  console.dir(result2b, { depth: undefined });
  console.log();

  console.log("ロジカル演算子を使用し条件を指定して全件取得");
  const result2c = await prisma.user.findMany({
    where: {
      AND: [
        {
          OR: [
            {
              name: {
                startsWith: "C",
              },
            },
            {
              name: {
                startsWith: "B",
              },
            },
          ],
          role: Role.USER,
        },
      ],
    },
  });
  console.dir(result2c, { depth: undefined });
  console.log();

  console.log("関連テーブルのレコードで絞り込み");
  const result2d = await prisma.user.findMany({
    where: {
      posts: {
        some: {
          title: {
            startsWith: "P",
          },
        },
      },
    },
  });
  console.dir(result2d, { depth: undefined });
  console.log();

  console.log("--------------------------------");
  console.log("カラムを絞り込む");
  console.log("--------------------------------");
  console.log();

  console.log("返却するカラムを指定");
  const result3a = await prisma.user.findMany({
    select: {
      email: true,
    },
  });
  console.dir(result3a, { depth: undefined });
  console.log();

  const result3aa = await prisma.user.findMany({
    select: {
      email: true,
      name: true,
    },
  });
  console.dir(result3aa, { depth: undefined });
  console.log();

  console.log("返却する関連テーブルのカラムを指定");
  const result3b = await prisma.user.findMany({
    select: {
      name: true,
      posts: {
        select: {
          title: true,
        },
      },
    },
  });
  console.dir(result3b, { depth: undefined });
  console.log();

  const result3d = await prisma.user.findMany({
    include: {
      posts: {
        select: {
          title: true,
        },
      },
    },
    where: {
      email: "alice@example.com",
    },
  });
  console.dir(result3d, { depth: undefined });
  console.log();

  // ❌️ これはエラーになります。
  // const result3e = await prisma.user.findMany({
  //   include: {
  //     posts: true
  //   },
  //   select: {
  //     email: true,
  //   },
  // });

  console.log("特定のカラムを除外");
  const result3f = await prisma.user.findMany({
    omit: {
      name: true,
    },
  });
  console.dir(result3f, { depth: undefined });
  console.log();

  console.log("--------------------------------");
  console.log("レコードをソート");
  console.log("--------------------------------");
  console.log();

  console.log("取得するレコードをソート");
  const result4a = await prisma.user.findMany({
    orderBy: {
      email: "asc",
    },
  });
  console.dir(result4a, { depth: undefined });
  console.log();

  console.log("関連テーブルでソート");
  const result4b = await prisma.user.findMany({
    orderBy: {
      posts: {
        _count: "desc",
      },
    },
  });
  console.dir(result4b, { depth: undefined });
  console.log();

  console.log("--------------------------------");
  console.log("ページネーション");
  console.log("--------------------------------");
  console.log();

  console.log("取得するレコード数を指定");
  const result5a = await prisma.user.findMany({
    orderBy: {
      id: "asc",
    },
    take: 2,
  });
  console.dir(result5a, { depth: undefined });
  console.log();

  console.log("スキップするレコード数を指定");
  const result5b = await prisma.user.findMany({
    orderBy: {
      id: "asc",
    },
    skip: 2,
  });
  console.dir(result5b, { depth: undefined });
  console.log();

  console.log("skip と take を利用してページネーションを実装");
  const result5c = await prisma.user.findMany({
    orderBy: {
      id: "asc",
    },
    skip: 2,
    take: 2,
  });
  console.dir(result5c, { depth: undefined });
  console.log();

  console.log("--------------------------------");
  console.log("レコードを集計");
  console.log("--------------------------------");
  console.log();

  console.log("aggregate で集計");
  const result6a = await prisma.post.aggregate({
    _count: true,
  });
  console.dir(result6a, { depth: undefined });
  console.log();

  const result6b = await prisma.post.aggregate({
    _avg: {
      likes: true,
    },
  });
  console.dir(result6b, { depth: undefined });
  console.log();

  const result6c = await prisma.post.aggregate({
    _max: {
      likes: true,
    },
  });
  console.dir(result6c, { depth: undefined });
  console.log();

  const result6d = await prisma.post.aggregate({
    _min: {
      likes: true,
    },
  });
  console.dir(result6d, { depth: undefined });
  console.log();

  const result6e = await prisma.post.aggregate({
    _sum: {
      likes: true,
    },
  });
  console.dir(result6e, { depth: undefined });
  console.log();

  console.log("関連テーブルを集計");
  const result6g = await prisma.user.findMany({
    include: {
      _count: {
        select: { posts: true },
      },
    },
  });
  console.dir(result6g, { depth: undefined });
  console.log();

  console.log("関連テーブルの条件を指定して集計");
  const result6h = await prisma.user.findMany({
    include: {
      _count: {
        select: {
          posts: {
            where: {
              likes: {
                gte: 20,
              },
            },
          },
        },
      },
    },
  });
  console.dir(result6h, { depth: undefined });
  console.log();

  console.log("count で集計");
  const result7a = await prisma.user.count();
  console.dir(result7a, { depth: undefined });
  console.log();

  console.log("特定条件のレコード数を求める");
  const result7b = await prisma.user.count({
    where: {
      role: Role.USER,
    },
  });
  console.dir(result7b, { depth: undefined });
  console.log();

  console.log("複数カラムを同時に集計");
  const result7c = await prisma.user.count({
    select: {
      _all: true,
      name: true,
    },
  });
  console.dir(result7c, { depth: undefined });
  console.log();

  console.log("複数カラムを同時に集計");
  const result7d = await prisma.user.groupBy({
    _count: true,
    by: ["role"],
  });
  console.dir(result7d, { depth: undefined });
  console.log();

  console.log("集計した結果を絞り込む");
  const result7e = await prisma.user.groupBy({
    _count: true,
    by: ["role"],
    having: {
      role: {
        _count: {
          gte: 2,
        },
      },
    },
  });
  console.dir(result7e, { depth: undefined });
  console.log();

  console.log("重複を除外");
  const result7f = await prisma.user.findMany({
    distinct: ["role"],
    select: {
      role: true,
    },
  });
  console.dir(result7f, { depth: undefined });
  console.log();

  console.log("--------------------------------");
  console.log("応用編");
  console.log("--------------------------------");
  console.log();

  console.log("レコードを絞り込んだ後に集計");
  const result8a = await prisma.post.aggregate({
    _avg: {
      likes: true,
    },
    orderBy: {
      likes: "desc",
    },
    take: 2,
    where: {
      author: {
        role: Role.USER,
      },
    },
  });
  console.dir(result8a, { depth: undefined });
  console.log();

  console.log("条件を指定して集計");
  const result8b = await prisma.user.count({
    where: {
      posts: {
        some: {
          likes: {
            gte: 10,
          },
        },
      },
    },
  });
  console.dir(result8b, { depth: undefined });
  console.log();
}
try {
  await main();
} catch (error) {
  console.error(error);
  throw error;
}
