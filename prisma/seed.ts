import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  try {
    // Crear Admin si no existe
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

    // Crear Packages si no existen
    const packages = ['Gold', 'Platinum', 'Diamond'];
    for (const packageName of packages) {
      await prisma.package.upsert({
        where: { name: packageName },
        update: {},
        create: { name: packageName },
      });
    }
    console.log('Packages verified/created successfully!');

    // Crear Services con los nombres de la imagen
    const services = [
      'Reservations',
      'Childcare',
      'Security',
      'Food Delivery',
      'Car Rentals',
      'Wellness & Fitness',
      'Spa & Beauty',
      'Boat Charters',
      'Chefs & Assistants',
      'Drinks Delivery',
      'Transfers & Drivers',
    ];

    for (const serviceName of services) {
      await prisma.service.upsert({
        where: { name: serviceName }, // Asegurar que 'name' sea único en el modelo Prisma
        update: {},
        create: {
          name: serviceName,
          description: `Description for ${serviceName}`,
          serviceType: 'none',
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
