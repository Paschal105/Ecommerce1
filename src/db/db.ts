import { PrismaClient } from "@prisma/client"
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3"

const prismaClientSingleton = () => {
  // Directly pass the URL to the adapter constructor
  const adapter = new PrismaBetterSqlite3({ 
    url: process.env.DATABASE_URL || "file:./prisma/dev.db" 
  })
  
  // Pass the adapter to the PrismaClient constructor
  return new PrismaClient({ adapter })
}

declare global {
  var db: undefined | ReturnType<typeof prismaClientSingleton>;
}

const db = globalThis.db ?? prismaClientSingleton();

export default db;

if (process.env.NODE_ENV !== "production") globalThis.db = db;