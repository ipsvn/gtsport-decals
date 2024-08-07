import { PrismaClient } from '@prisma/client'

const { glob, readFile } = require('node:fs/promises');

const prisma = new PrismaClient()

async function main() {

    for await (const match of glob('data/**/*.json')) {

        console.log(`parse ${match}`)
        const file = await readFile(match, { encoding: 'utf8' });
        
        let json: any = {};
        try {
          json = JSON.parse(file);
        } catch (exc: any) {
          console.error(`error parsing ${match}`);
          continue;
        }

        const userNo  = BigInt(json.user_no);
        const decalId = BigInt(json.decal_id);

        const user = await prisma.user.upsert({
          create: {
            id: userNo,
            name: json.user_id,
            country: json.country,
          },
          update: {
            name: json.user_id,
            country: json.country,
          },
          where: {
            id: userNo
          }
        });

        const tags: string[] = json.tags;

        await prisma.decal.upsert({
          create: {
            id: decalId,
            create_time: new Date(json.create_time),
            title: json.title,
            comment: json.comment,
            status: parseInt(json.status),
            open: parseInt(json.open),
            keyword: json.keyword,
            tags: {
              createMany: {
                data: tags.map(it => ({tag: it}))
              }
            },
            user: {
              connect: user
            }
          },
          update: {
            
          },
          where: {
            id: decalId
          }
        });

    }

}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })