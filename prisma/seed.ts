import { PrismaClient } from '@prisma/client'

const { glob, readFile } = require('node:fs/promises');

const prisma = new PrismaClient()

async function main() {

    for await (const match of glob('data/**/*.json')) {

        const file = await readFile(match, { encoding: 'utf8' });

        console.log(file);

    }
    // glob('data/**/*.json', (err: any, matches: any) => {

    //     for (let match of matches) {
    //         console.log(match);
    //     }

    // });
    
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