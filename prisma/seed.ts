import { PrismaClient } from '@prisma/client'

const { Glob } = require("glob");
const { readFile } = require('node:fs/promises');

const prisma = new PrismaClient()

async function main() {

    let batch: any[] = [];
    let batchNumber = 0;

    const dataGlob = new Glob('data/**/*.json', {});
    for await (const match of dataGlob) {

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

        const tags: string[] = json.tags;

        batch.push(
          prisma.decal.upsert({
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
                connectOrCreate: {
                  create: {
                    id: userNo,
                    name: json.user_id,
                    country: json.country
                  },
                  where: {
                    id: userNo
                  }
                }
              }
            },
            update: {},
            where: {
              id: decalId
            }
          })
        );

        if (batch.length > 10000)
        {
          batchNumber++;
          console.log("run batch " + batchNumber);
          await prisma.$transaction(batch);
          batch = [];
        }
        
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