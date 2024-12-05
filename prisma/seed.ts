import { PrismaClient, Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  try {
    const adminPassword = await bcrypt.hash('admin', 10);
    await prisma.user.create({
      data: {
        name: 'Admin User',
        email: 'admin@admin.com',
        role: 'admin',
        password: adminPassword,
      },
    });
    console.log('Done!');
  } catch (error) {
    console.error(error);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
