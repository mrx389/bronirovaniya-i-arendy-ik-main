import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcrypt' ;


const prisma = new PrismaClient();

const initialUsers = [
  {
    email: 'admin@mail.ru',
    name: 'admin',
    password: 'admin',
    role: Role.ADMIN,
  },
  {
    email: 'user@mail.ru',
    name: 'user',
    password: 'user',
    role: Role.USER,
  },
];

const seed = async() => {
  await prisma.users.deleteMany();
  for (const user of initialUsers) {
    const { password, ...userData } = user;
    const hashedPassword = await bcrypt.hash(password, 5);
    await prisma.users.create({
      data: {
        ...userData,
        password: hashedPassword,
      },
    });
  }
};

seed();