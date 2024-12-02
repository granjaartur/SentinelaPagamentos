import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = loginSchema.parse(req.body);
      const result = await AuthService.login(email, password);
      res.json(result);
    } catch (error) {
      res.status(400).json({ message: error instanceof Error ? error.message : 'Invalid request' });
    }
  }
}