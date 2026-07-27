import { z } from 'zod';

import { checkPasswordPwned } from '@/modules/auth/pwned-password';

export const recoveryEmailSchema = z.object({
  email: z.string().email('Невірна електронна адреса'),
});

export const recoveryTokenSchema = z.object({
  email: z.string().email('Невірна електронна адреса'),
  token: z
    .string()
    .length(8, 'Код повинен містити 8 цифр')
    .regex(/^\d{8}$/, 'Код повинен містити тільки цифри'),
});

export const recoveryTokenFormSchema = z.object({
  token: z
    .string()
    .length(8, 'Код повинен містити 8 цифр')
    .regex(/^\d{8}$/, 'Код повинен містити тільки цифри'),
});

export const recoveryPasswordSchema = z.object({
  password: z
    .string()
    .min(10, 'Пароль повинен містити щонайменше 10 символів')
    .refine(checkPasswordPwned, {
      message:
        'Цей пароль знайдено в базах витоків даних. Будь ласка, оберіть інший.',
    }),
});

export type RecoveryEmailSchema = z.infer<typeof recoveryEmailSchema>;
export type RecoveryTokenSchema = z.infer<typeof recoveryTokenSchema>;
export type RecoveryTokenFormSchema = z.infer<typeof recoveryTokenFormSchema>;
export type RecoveryPasswordSchema = z.infer<typeof recoveryPasswordSchema>;
