1. Follow : https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch-typescript-postgres/
  - npm init -y
  - npm install prisma typescript ts-node @types/node --save-dev 
  
  - npx prisma init => create prisma sample schema file
  - npx prisma db pull => create prisma model from database 
  - npx prisma generate => Generate database + update @prisma/client on model changes.
  - npx prisma migrate dev --name init => Generate database migration
  
  - npm install @prisma/client
  
  - npx ts-node index.ts
  - npx prisma studio
  - npx prisma introspect
2. Nexus Doc
  - npm install nexus graphql apollo-server
  - npm install typescript ts-node-dev --save-dev 

3. Nexus-Prisma Plugin
  - npm add nexus-plugin-prisma



  ### OTHER
  GraphQL Schema with Nexus (Resolver) => Prisma Context => Prisma Schema

Prisma Schema => Generated Code => Nexus Schema (Resolver) => GraphQL

SDL => Types (Typescript) :https://github.com/dotansimha/graphql-code-generator 
Class => SDL : type-graphql
class =>  DB : typeorm
model => DB : Prisma
function => SDL : nexus


Fullstack based on prisma+react : 
  waps JS
  keystone JS
  Amplification JS