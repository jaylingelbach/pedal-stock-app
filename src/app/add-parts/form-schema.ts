import z from 'zod';
import { addPartSchema } from '@/modules/parts-inventory/schemas';

export const formSchema = addPartSchema.and(
  z.object({
    qtyToAdjust: z.number().int().positive()
  })
);

export type FormValues = z.infer<typeof formSchema>;
