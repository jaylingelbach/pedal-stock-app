import z from 'zod';

const requiredNumber = () =>
  z.number({
    error: (issue) =>
      issue.input === undefined ? 'Required' : 'Must be a number'
  });
/**
 * -----------------------
 * Base part schema
 * -----------------------
 */

const basePartSchema = z.object({
  qtyToAdjust: requiredNumber().int().min(1, 'Must be at least 1')
});

/**
 * -----------------------
 * Resistors
 * -----------------------
 */

const resistorSchema = z.object({
  type: z.literal('resistor'),

  resistance: requiredNumber()
    .positive('Must be a positive number')
    .max(2000, 'Must be 2000 or less'),

  unit: z.enum(['R', 'K', 'M']),

  watts: requiredNumber().positive('Must be a positive number')
});

/**
 * -----------------------
 * CAPACITOR SUBTYPES
 * -----------------------
 */

const electrolyticSchema = z.object({
  type: z.literal('capacitor'),
  capacitorType: z.literal('electrolytic'),

  capacitance: requiredNumber().positive('Must be a positive number'),

  voltageDc: requiredNumber().positive('Must be a positive number'),

  diameterMm: requiredNumber().positive('Must be a positive number'),

  leadSpacingMm: requiredNumber().positive('Must be a positive number'),

  unit: z.enum(['uF', 'nF'])
});

const filmSchema = z.object({
  type: z.literal('capacitor'),
  capacitorType: z.literal('film'),

  capacitance: requiredNumber().positive('Must be a positive number'),

  voltageDc: requiredNumber().positive('Must be a positive number'),

  thicknessMm: requiredNumber().positive('Must be a positive number'),

  leadSpacingMm: requiredNumber().positive('Must be a positive number'),

  unit: z.enum(['nF', 'uF'])
});

const mlccSchema = z.object({
  type: z.literal('capacitor'),
  capacitorType: z.literal('mlcc'),

  capacitance: requiredNumber().positive('Must be a positive number'),

  voltageDc: requiredNumber().positive('Must be a positive number'),

  leadSpacingMm: requiredNumber().positive('Must be a positive number'),

  unit: z.enum(['pF', 'nF', 'uF'])
});

const ceramicSchema = z.object({
  type: z.literal('capacitor'),
  capacitorType: z.literal('ceramic'),

  capacitance: requiredNumber().positive('Must be a positive number'),

  leadSpacingMm: requiredNumber().positive('Must be a positive number'),

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
 * TRANSISTORS
 * -----------------------
 */

const transistorSchema = z.object({
  type: z.literal('transistor'),

  partNumber: z.string().trim().min(1, 'Required'),

  material: z.enum(['silicon', 'germanium']),

  package: z.enum(['to-18', 'to-39', 'to-92', 'to-220', 'sot-23']),

  polarity: z.enum(['npn', 'pnp', 'mosfet'])
});

/**
 * -----------------------
 * Diodes
 * -----------------------
 */

const diodeSchema = z.object({
  type: z.literal('diode'),

  partNumber: z.string().trim().min(1, 'Required'),

  diodeType: z.enum(['signal', 'rectifier', 'zener', 'schottky']),

  material: z.enum(['silicon', 'germanium']),

  package: z.enum(['do-35', 'do-41', 'smd'])
});

/**
 * -----------------------
 * Integrated Circuits
 * -----------------------
 */

const icSchema = z.object({
  type: z.literal('ic'),

  partNumber: z.string().trim().min(1, 'Required'),

  package: z.enum(['dip-8', 'dip-16', 'soic-8', 'soic-16', 'sop-8', 'sop-16']),

  category: z.enum(['opamp', 'cmos', 'logic', 'microcontroller', 'other'])
});

/**
 * -----------------------
 * Potentiometers
 * -----------------------
 */

const potentiometersSchema = z.object({
  type: z.literal('potentiometer'),

  category: z.enum(['rotary', 'trimmer']),

  resistance: requiredNumber().positive('Must be a positive number'),

  taper: z.enum(['linear', 'logarithmic', 'anti-log', 'w-taper']),

  shaftType: z.enum(['round', 'spline', 'd-shaft']),

  shaftDiameter: requiredNumber().positive('Must be a positive number'),

  terminalType: z.enum(['pcb', 'solder-lugs', 'long-pins'])
});

/**
 * -----------------------
 * PART UNION (TOP LEVEL)
 * -----------------------
 */

export const addPartSchema = z.intersection(
  basePartSchema,
  z.discriminatedUnion('type', [
    resistorSchema,
    capacitorSchema,
    transistorSchema,
    diodeSchema,
    icSchema,
    potentiometersSchema
  ])
);

/**
 * -----------------------
 * TYPE EXPORT
 * -----------------------
 */

export type PartsInventory = z.infer<typeof addPartSchema>;
