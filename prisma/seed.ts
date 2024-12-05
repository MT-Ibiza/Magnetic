import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  try {
    const admin = await prisma.user.findUnique({
      where: {
        email: 'admin@admin.com',
      },
    });
    if (!admin) {
      const adminPassword = await bcrypt.hash('admin', 10);
      await prisma.user.create({
        data: {
          name: 'Admin User',
          email: 'admin@admin.com',
          role: 'admin',
          password: adminPassword,
        },
      });
      console.log('Admin Created!');
    }

    const packages = ['Gold', 'Platinum'];
    for (const packageName of packages) {
      await prisma.package.upsert({
        where: { name: packageName },
        update: {},
        create: {
          name: packageName,
        },
      });
    }
    console.log('Packages verified/created successfully!');
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
