import z from 'zod';

/**
 * -----------------------
 * Base part schema
 * -----------------------
 */

const basePartSchema = z.object({
  qtyToAdjust: z.number().int()
});

/**
 * -----------------------
 * Resistors
 * -----------------------
 */

const resistorSchema = z.object({
  type: z.literal('resistor'),

  resistance: z
    .number()
    .positive({ message: 'Must be a positive number' })
    .max(2000),
  unit: z.enum(['R', 'K', 'M']), // Ω, KΩ, MΩ
  watts: z.number().positive({ message: 'Must be a positive number' })
});

/**
 * -----------------------
 * CAPACITOR SUBTYPES
 * -----------------------
 */

const electrolyticSchema = z.object({
  type: z.literal('capacitor'),
  capacitorType: z.literal('electrolytic'),

  capacitance: z.number().positive({ message: 'Must be a positive number' }), // typically µF
  voltageDc: z.number().positive({ message: 'Must be a positive number' }),
  diameterMm: z.number().positive({ message: 'Must be a positive number' }),
  leadSpacingMm: z.number().positive({ message: 'Must be a positive number' }),
  unit: z.enum(['uF', 'nF'])
});

const filmSchema = z.object({
  type: z.literal('capacitor'),
  capacitorType: z.literal('film'),

  capacitance: z.number().positive({ message: 'Must be a positive number' }), // typically nF
  voltageDc: z.number().positive({ message: 'Must be a positive number' }),
  thicknessMm: z.number().positive({ message: 'Must be a positive number' }),
  leadSpacingMm: z.number().positive({ message: 'Must be a positive number' }),
  unit: z.enum(['nF', 'uF'])
});

const mlccSchema = z.object({
  type: z.literal('capacitor'),
  capacitorType: z.literal('mlcc'),

  capacitance: z.number().positive(), // pF–nF range
  voltageDc: z.number().positive({ message: 'Must be a positive number' }),
  leadSpacingMm: z.number().positive({ message: 'Must be a positive number' }),
  unit: z.enum(['pF', 'nF', 'uF'])
});

const ceramicSchema = z.object({
  type: z.literal('capacitor'),
  capacitorType: z.literal('ceramic'),

  capacitance: z.number().positive({ message: 'Must be a positive number' }), // pF
  leadSpacingMm: z.number().positive({ message: 'Must be a positive number' }),
  unit: z.enum(['pF', 'nF'])
});

/**
 * -----------------------
 * CAPACITOR UNION
 * -----------------------
 */

const capacitorSchema = z.discriminatedUnion('capacitorType', [
  electrolyticSchema,
  filmSchema,
  mlccSchema,
  ceramicSchema
]);

/**
 * -----------------------
 * PART UNION (TOP LEVEL)
 * -----------------------
 */
export const addPartSchema = z.intersection(
  basePartSchema,
  z.discriminatedUnion('type', [resistorSchema, capacitorSchema])
);

/**
 * -----------------------
 * TYPE EXPORT
 * -----------------------
 */
export type PartsInventory = z.infer<typeof addPartSchema>;
