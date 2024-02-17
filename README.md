# Find a friend

FindAFriend is a API for animal adoption, using SOLID and testing

## Requeriments

### Application ruls

- It must be possible to register a pet
- It must be possible to list all pets available for adoption in a city
- It must be possible to filter pets by their characteristics
- It must be possible to view details of a pet up for adoption
- It must be possible to register as an ORG
- It must be possible to log in as an ORG

### Business ruls

- To list the pets, we must inform the city
- An ORG must have an address and a WhatsApp number
- A pet must be linked to an ORG
- The user who wants to adopt will contact the ORG via WhatsApp
- All filters, besides the city, are optional
- For an ORG to access the application as admin, it must be logged in

## Getting started

Copy file environment

```bash
cp .env.example .env
```

## Docker

Create postgres container

```bash
docker compose up -d
```

## Prisma

Execute prisma migration

```bash
npx prisma migrate dev                         //Develop
npx prisma migrate dev --name create_tables    //Develop and specific name migration
npx prisma migrate deploy                      //Production
```

Open Prisma Studio

```bash
npx prisma studio
```

## Start and test

Start project

```bash
yarn dev

npm run dev
```

Test with yarn

```bash
yarn test             //Run tests usecases
yarn test:watch       //Watch tests usecases

yarn test:e2e         //Run tests controllers
yarn test:e2e:watch   //Watch tests controllers

yarn test:coverage
```

Test with npm

```bash
npm run test            //Run tests usecases
npm run test:watch      //Watch tests usecases

npm run test:e2e        //Run tests controllers
npm run test:e2e:watch  //Watch tests controllers

npm run test:coverage
```
