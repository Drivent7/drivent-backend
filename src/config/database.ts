import { PrismaClient } from "@prisma/client";
import { createClient } from "redis";

export let prisma: PrismaClient;
export let redis: ReturnType<typeof createClient>;

export async function connectDb(): Promise<void> {
  prisma = new PrismaClient();
  redis = createClient();
  await redis.connect();
}

export async function disconnectDB(): Promise<void> {
  await prisma?.$disconnect();
  await redis.quit();
}
