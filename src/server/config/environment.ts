import dotenv from 'dotenv';

dotenv.config();

export const config = {
  app: {
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || 'default-secret-key',
    nodeEnv: process.env.NODE_ENV || 'development',
  },
  smtp: {
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  ifThenPay: {
    backofficeKey: process.env.IFTHEN_PAY_BACKOFFICE_KEY,
    antiPhishingKey: process.env.IFTHEN_PAY_ANTI_PHISHING_KEY,
    mbEntity: process.env.IFTHEN_PAY_MB_ENTITY,
    mbwayKey: process.env.IFTHEN_PAY_MBWAY_KEY,
  },
};