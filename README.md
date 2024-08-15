A Next.js app to search through the gtsport decals dump

## Instance
[A running instance, with the full dataset is available here](https://decals.automod.club)

## Getting Started
1. Download the [required data](https://mega.nz/file/ta1WXBwR#GsBY-v6kO8jlpt-h8Q4gB1fxzUmwv2ZyBokwJI4Y5VI) and place it into the folder `/data`. 
2. Install dependencies: `npm i`
3. Setup and seed prisma database: `npx prisma migrate dev`
4. Run: `npm run dev`