import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/database';
import { config } from '../config/environment';

export class AuthService {
  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  static async comparePasswords(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  static generateToken(userId: string, role: string): string {
    return jwt.sign({ id: userId, role }, config.app.jwtSecret, {
      expiresIn: '24h',
    });
  }

  static async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error('User not found');
    }

    const isValid = await this.comparePasswords(password, user.password);
    if (!isValid) {
      throw new Error('Invalid password');
    }

    return {
      token: this.generateToken(user.id, user.role),
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }
}