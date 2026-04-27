import {
  pgTable,
  integer,
  numeric,
  serial,
  text,
  index,
  check
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

/**
 * -----------------------
 * Parts Table
 * -----------------------
 */

export const parts = pgTable('parts', {
  id: serial('id').primaryKey(),

  // Core type
  type: text('type').notNull(),

  // Shared
  partNumber: text('part_number'),

  /**
   * -----------------------
   * Resistors
   * -----------------------
   */
  resistance: numeric('resistance', { mode: 'number' }),
  resistorUnit: text('resistor_unit'),
  watts: numeric('watts', { mode: 'number' }),

  /**
   * -----------------------
   * Capacitors
   * -----------------------
   */
  capacitance: numeric('capacitance', { mode: 'number' }),
  capUnit: text('cap_unit'),
  capacitorType: text('capacitor_type'),
  voltageDc: numeric('voltage_dc', { mode: 'number' }),
  diameterMm: numeric('diameter_mm', { mode: 'number' }),
  leadSpacingMm: numeric('lead_spacing_mm', { mode: 'number' }),
  thicknessMm: numeric('thickness_mm', { mode: 'number' }),

  /**
   * -----------------------
   * Transistors / Diodes
   * -----------------------
   */
  material: text('material'),
  package: text('package'),
  polarity: text('polarity'),
  diodeType: text('diode_type'),

  /**
   * -----------------------
   * Integrated Circuits
   * -----------------------
   */
  icCategory: text('ic_category'),

  /**
   * -----------------------
   * Potentiometers
   * -----------------------
   */
  potCategory: text('pot_category'),
  taper: text('taper'),
  shaftType: text('shaft_type'),
  shaftDiameter: numeric('shaft_diameter', { mode: 'number' }),
  terminalType: text('terminal_type')
});

/**
 * -----------------------
 * Inventory Table
 * -----------------------
 */

export const inventory = pgTable(
  'inventory_items',
  {
    id: serial('id').primaryKey(),

    partId: integer('part_id')
      .notNull()
      .references(() => parts.id)
      .unique(),

    quantity: integer('quantity').notNull()
  },
  (table) => [
    index('inventory_part_idx').on(table.partId),
    check('inventory_quantity_check', sql`${table.quantity} > 0`)
  ]
);

/**
 * -----------------------
 * BOM
 * -----------------------
 */

export const bom = pgTable('boms', {
  id: serial('id').primaryKey(),
  name: text('name').notNull()
});

/**
 * -----------------------
 * BOM Items (join table)
 * -----------------------
 */

export const bomItems = pgTable(
  'bom_items',
  {
    id: serial('id').primaryKey(),

    bomId: integer('bom_id')
      .notNull()
      .references(() => bom.id),

    partId: integer('part_id')
      .notNull()
      .references(() => parts.id),

    quantityRequired: integer('quantity_required').notNull()
  },
  (table) => [
    index('bom_items_bom_idx').on(table.bomId),
    index('bom_items_part_idx').on(table.partId),
    check(
      'bom_items_quantity_required_check',
      sql`${table.quantityRequired} > 0`
    )
  ]
);
