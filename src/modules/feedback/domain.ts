import { z } from 'zod';

export const FeedbackSchema = z.object({
  category: z.enum(['bug', 'idea', 'other']),
  message: z
    .string()
    .trim()
    .min(10, 'Опишіть відгук щонайменше 10 символами')
    .max(5_000, 'Відгук має містити не більше 5 000 символів'),
});

export type FeedbackRequest = z.infer<typeof FeedbackSchema>;
