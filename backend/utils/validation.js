import { z } from 'zod';

export const subscribeSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .trim()
    .toLowerCase()
    .min(1, 'Email is required')
    .max(254, 'Email is too long')
    .email('Please enter a valid email address'),
});
