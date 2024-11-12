import { PrismaClient } from "@prisma/client";

//init singleton client
const prisma = new PrismaClient();
export default prisma;
