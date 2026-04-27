import z from 'zod';

/**
 * -----------------------
 * Helpers
 * -----------------------
 */

const requiredNumber = () =>
  z.number({
    error: (issue) =>
      issue.input === undefined ? 'Required' : 'Must be a number'
  });

const requiredString = () =>
  z
    .string({
      error: (issue) =>
        issue.input === undefined ? 'Required' : 'Must be a string'
    })
    .trim()
    .min(1, 'Required');

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

  resistorUnit: z.enum(['R', 'K', 'M']),

  watts: requiredNumber().positive('Must be a positive number')
});

/**
 * -----------------------
 * Capacitors
 * -----------------------
 */

const electrolyticSchema = z.object({
  type: z.literal('capacitor'),
  capacitorType: z.literal('electrolytic'),

  capacitance: requiredNumber().positive('Must be a positive number'),
  capUnit: z.enum(['uF', 'nF']),

  voltageDc: requiredNumber().positive('Must be a positive number'),
  diameterMm: requiredNumber().positive('Must be a positive number'),
  leadSpacingMm: requiredNumber().positive('Must be a positive number')
});

const filmSchema = z.object({
  type: z.literal('capacitor'),
  capacitorType: z.literal('film'),

  capacitance: requiredNumber().positive('Must be a positive number'),
  capUnit: z.enum(['nF', 'uF']),

  voltageDc: requiredNumber().positive('Must be a positive number'),
  thicknessMm: requiredNumber().positive('Must be a positive number'),
  leadSpacingMm: requiredNumber().positive('Must be a positive number')
});

const mlccSchema = z.object({
  type: z.literal('capacitor'),
  capacitorType: z.literal('mlcc'),

  capacitance: requiredNumber().positive('Must be a positive number'),
  capUnit: z.enum(['pF', 'nF', 'uF']),

  voltageDc: requiredNumber().positive('Must be a positive number'),
  leadSpacingMm: requiredNumber().positive('Must be a positive number')
});

const ceramicSchema = z.object({
  type: z.literal('capacitor'),
  capacitorType: z.literal('ceramic'),

  capacitance: requiredNumber().positive('Must be a positive number'),
  capUnit: z.enum(['pF', 'nF']),

  leadSpacingMm: requiredNumber().positive('Must be a positive number')
});

const capacitorSchema = z.discriminatedUnion('capacitorType', [
  electrolyticSchema,
  filmSchema,
  mlccSchema,
  ceramicSchema
]);

/**
 * -----------------------
 * Transistors
 * -----------------------
 */

const transistorSchema = z.object({
  type: z.literal('transistor'),

  partNumber: requiredString(),

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

  partNumber: requiredString(),

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

  partNumber: requiredString(),

  package: z.enum(['dip-8', 'dip-16', 'soic-8', 'soic-16', 'sop-8', 'sop-16']),
  icCategory: z.enum(['opamp', 'cmos', 'logic', 'microcontroller', 'other'])
});

/**
 * -----------------------
 * Potentiometers
 * -----------------------
 */

const potentiometersSchema = z.object({
  type: z.literal('potentiometer'),

  potCategory: z.enum(['rotary', 'trimmer']),

  resistance: requiredNumber().positive('Must be a positive number'),

  taper: z.enum(['linear', 'logarithmic', 'anti-log', 'w-taper']),

  shaftType: z.enum(['round', 'spline', 'd-shaft']),

  shaftDiameter: requiredNumber().positive('Must be a positive number'),

  terminalType: z.enum(['pcb', 'solder-lugs', 'long-pins'])
});

/**
 * -----------------------
 * FINAL UNION
 * -----------------------
 */

export const addPartSchema = z.discriminatedUnion('type', [
  resistorSchema,
  capacitorSchema,
  transistorSchema,
  diodeSchema,
  icSchema,
  potentiometersSchema
]);

export type PartsInventory = z.infer<typeof addPartSchema>;
