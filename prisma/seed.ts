import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  try {
    const admin = await prisma.user.findUnique({
      where: { email: 'admin@magnetic.com' },
    });
    if (!admin) {
      const adminPassword = await bcrypt.hash('magnetic2025', 10);
      await prisma.user.create({
        data: {
          name: 'Admin Magnetic',
          firstName: 'Admin',
          lastName: 'Magnetic',
          email: 'admin@magnetic.com',
          role: 'admin',
          password: adminPassword,
        },
      });
      console.log('Admin Created!');
    }

    const packages = ['Gold', 'Platinum', 'Diamond'];
    for (const packageName of packages) {
      await prisma.package.upsert({
        where: { name: packageName },
        update: {},
        create: { name: packageName },
      });
    }
    console.log('Packages verified/created successfully!');
    const services = [
      { name: 'Car Rentals', type: 'cart_rental' },
      { name: 'Transfers & Drivers', type: 'transfer' },
      { name: 'Drinks Delivery', type: 'drinks' },
      { name: 'Food Delivery', type: 'food' },
      { name: 'Chefs & Assistants', type: 'chefs' },
      { name: 'Boat Charters', type: 'boat_rental' },
      { name: 'Spa & Beauty', type: 'spa' },
      { name: 'Wellness & Fitness', type: 'wellness' },
      { name: 'Security', type: 'security' },
      { name: 'Childcare', type: 'childcare' },
      { name: 'Reservations', type: 'reservations' },
    ];

    for (const service of services) {
      await prisma.service.upsert({
        where: { name: service.name },
        update: {},
        create: {
          name: service.name,
          description: `Description for ${service.name}`,
          serviceType: service.type as 'none',
          script: null,
          imageUrl: null,
          termsAndConditions: null,
          instructions: null,
        },
      });
    }
    console.log('Services verified/created successfully!');
  } catch (error) {
    console.error('Error seeding the database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
