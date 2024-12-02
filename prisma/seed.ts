import { PrismaClient, Role, Gender, MaritalStatus, PaymentFrequency } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function seed() {
  try {
    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await prisma.user.create({
      data: {
        email: 'admin@example.com',
        password: hashedPassword,
        role: Role.ADMIN,
      },
    });

    // Create members
    const member1 = await prisma.member.create({
      data: {
        name: 'John Doe',
        email: 'john@example.com',
        documentId: '123456789',
        taxId: '987654321',
        gender: Gender.MALE,
        maritalStatus: MaritalStatus.SINGLE,
        birthDate: new Date('1990-01-01'),
        phone: '123456789',
        profession: 'Software Engineer',
      },
    });

    const member2 = await prisma.member.create({
      data: {
        name: 'Jane Smith',
        email: 'jane@example.com',
        documentId: '987654321',
        taxId: '123456789',
        gender: Gender.FEMALE,
        maritalStatus: MaritalStatus.MARRIED,
        birthDate: new Date('1992-05-15'),
        phone: '987654321',
        profession: 'Doctor',
      },
    });

    // Create groups
    const group1 = await prisma.group.create({
      data: {
        name: 'Premium Members',
        description: 'Members with premium benefits',
      },
    });

    const group2 = await prisma.group.create({
      data: {
        name: 'Basic Members',
        description: 'Members with basic benefits',
      },
    });

    // Add members to groups
    await prisma.memberGroup.createMany({
      data: [
        { memberId: member1.id, groupId: group1.id },
        { memberId: member2.id, groupId: group2.id },
      ],
    });

    // Create service categories
    const category1 = await prisma.serviceCategory.create({
      data: {
        name: 'Monthly Services',
        description: 'Regular monthly services',
      },
    });

    const category2 = await prisma.serviceCategory.create({
      data: {
        name: 'Annual Services',
        description: 'Annual membership services',
      },
    });

    // Create services
    const service1 = await prisma.service.create({
      data: {
        name: 'Basic Membership',
        description: 'Basic monthly membership',
        basePrice: 29.99,
        taxPercent: 23,
        frequency: PaymentFrequency.MONTHLY,
        categoryId: category1.id,
      },
    });

    const service2 = await prisma.service.create({
      data: {
        name: 'Premium Membership',
        description: 'Premium annual membership',
        basePrice: 299.99,
        taxPercent: 23,
        frequency: PaymentFrequency.YEARLY,
        categoryId: category2.id,
      },
    });

    // Create email templates
    await prisma.emailTemplate.createMany({
      data: [
        {
          name: 'payment_reminder',
          subject: 'Payment Reminder',
          body: 'Dear {{memberName}}, this is a reminder that your payment of {{amount}} for {{serviceName}} is due on {{dueDate}}.',
        },
        {
          name: 'birthday_wish',
          subject: 'Happy Birthday!',
          body: 'Dear {{memberName}}, wishing you a very happy birthday!',
        },
      ],
    });

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seed();