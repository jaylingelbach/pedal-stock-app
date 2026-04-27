import {
  pgTable,
  integer,
  numeric,
  serial,
  text,
  index
} from 'drizzle-orm/pg-core';

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
  resistance: numeric('resistance'),
  resistorUnit: text('resistor_unit'),
  watts: numeric('watts'),

  /**
   * -----------------------
   * Capacitors
   * -----------------------
   */
  capacitance: numeric('capacitance'),
  capUnit: text('cap_unit'),
  capacitorType: text('capacitor_type'),
  voltageDc: numeric('voltage_dc'),
  diameterMm: numeric('diameter_mm'),
  leadSpacingMm: numeric('lead_spacing_mm'),
  thicknessMm: numeric('thickness_mm'),

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
  shaftDiameter: numeric('shaft_diameter'),
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
  (table) => ({
    partIdx: index('inventory_part_idx').on(table.partId)
  })
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
  (table) => ({
    bomIdx: index('bom_items_bom_idx').on(table.bomId),
    partIdx: index('bom_items_part_idx').on(table.partId)
  })
);
