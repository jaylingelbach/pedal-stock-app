import z from 'zod';

/**
 * -----------------------
 * Base part schema
 * -----------------------
 */

const basePartSchema = z.object({
  qtyToAdjust: z
    .number({
      error: (issue) =>
        issue.input === undefined ? 'Required' : 'Must be a number'
    })
    .int()
    .min(1, 'Must be at least 1')
});

/**
 * -----------------------
 * Resistors
 * -----------------------
 */

const resistorSchema = z.object({
  type: z.literal('resistor'),

  resistance: z
    .number({
      error: (issue) =>
        issue.input === undefined ? 'Required' : 'Must be a number'
    })
    .positive('Must be a positive number')
    .max(2000, 'Must be 2000 or less'),

  unit: z.enum(['R', 'K', 'M']),

  watts: z
    .number({
      error: (issue) =>
        issue.input === undefined ? 'Required' : 'Must be a number'
    })
    .positive('Must be a positive number')
});

/**
 * -----------------------
 * CAPACITOR SUBTYPES
 * -----------------------
 */

const electrolyticSchema = z.object({
  type: z.literal('capacitor'),
  capacitorType: z.literal('electrolytic'),

  capacitance: z
    .number({
      error: (issue) =>
        issue.input === undefined ? 'Required' : 'Must be a number'
    })
    .positive('Must be a positive number'),

  voltageDc: z
    .number({
      error: (issue) =>
        issue.input === undefined ? 'Required' : 'Must be a number'
    })
    .positive('Must be a positive number'),

  diameterMm: z
    .number({
      error: (issue) =>
        issue.input === undefined ? 'Required' : 'Must be a number'
    })
    .positive('Must be a positive number'),

  leadSpacingMm: z
    .number({
      error: (issue) =>
        issue.input === undefined ? 'Required' : 'Must be a number'
    })
    .positive('Must be a positive number'),

  unit: z.enum(['uF', 'nF'])
});

const filmSchema = z.object({
  type: z.literal('capacitor'),
  capacitorType: z.literal('film'),

  capacitance: z
    .number({
      error: (issue) =>
        issue.input === undefined ? 'Required' : 'Must be a number'
    })
    .positive('Must be a positive number'),

  voltageDc: z
    .number({
      error: (issue) =>
        issue.input === undefined ? 'Required' : 'Must be a number'
    })
    .positive('Must be a positive number'),

  thicknessMm: z
    .number({
      error: (issue) =>
        issue.input === undefined ? 'Required' : 'Must be a number'
    })
    .positive('Must be a positive number'),

  leadSpacingMm: z
    .number({
      error: (issue) =>
        issue.input === undefined ? 'Required' : 'Must be a number'
    })
    .positive('Must be a positive number'),

  unit: z.enum(['nF', 'uF'])
});

const mlccSchema = z.object({
  type: z.literal('capacitor'),
  capacitorType: z.literal('mlcc'),

  capacitance: z
    .number({
      error: (issue) =>
        issue.input === undefined ? 'Required' : 'Must be a number'
    })
    .positive('Must be a positive number'),

  voltageDc: z
    .number({
      error: (issue) =>
        issue.input === undefined ? 'Required' : 'Must be a number'
    })
    .positive('Must be a positive number'),

  leadSpacingMm: z
    .number({
      error: (issue) =>
        issue.input === undefined ? 'Required' : 'Must be a number'
    })
    .positive('Must be a positive number'),

  unit: z.enum(['pF', 'nF', 'uF'])
});

const ceramicSchema = z.object({
  type: z.literal('capacitor'),
  capacitorType: z.literal('ceramic'),

  capacitance: z
    .number({
      error: (issue) =>
        issue.input === undefined ? 'Required' : 'Must be a number'
    })
    .positive('Must be a positive number'),

  leadSpacingMm: z
    .number({
      error: (issue) =>
        issue.input === undefined ? 'Required' : 'Must be a number'
    })
    .positive('Must be a positive number'),

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

  partNumber: z.string().min(1, 'Required'),

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

  partNumber: z.string().min(1, 'Required'),

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

  partNumber: z.string().min(1, 'Required'),

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

  resistance: z
    .number({
      error: (issue) =>
        issue.input === undefined ? 'Required' : 'Must be a number'
    })
    .positive('Must be a positive number'),

  taper: z.enum(['linear', 'logarithmic', 'anti-log', 'w-taper']),

  shaftType: z.enum(['round', 'spline', 'd-shaft']),

  shaftDiameter: z
    .number({
      error: (issue) =>
        issue.input === undefined ? 'Required' : 'Must be a number'
    })
    .positive('Must be a positive number'),

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
