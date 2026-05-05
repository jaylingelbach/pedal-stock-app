import z from 'zod';
import { TRPCError } from '@trpc/server';

import {
  addPartSchema,
  PartsInventory
} from '@/modules/parts-inventory/schemas';

import { router, publicProcedure } from '@/trpc/init';
import { db } from '@/db';
import { parts, inventory } from '@/db/schema';
import { mapPartToDb } from '@/modules/parts-inventory/server/utils';

import { eq, and, sql, ExtractTablesWithRelations } from 'drizzle-orm';
import {
  NodePgDatabase,
  NodePgQueryResultHKT
} from 'drizzle-orm/node-postgres';
import { PgTransaction } from 'drizzle-orm/pg-core';
import * as schema from '@/db/schema';

type DbClient =
  | NodePgDatabase<typeof schema>
  | PgTransaction<
      NodePgQueryResultHKT,
      typeof schema,
      ExtractTablesWithRelations<typeof schema>
    >;

/**
 * -----------------------
 * Find Existing Part
 * -----------------------
 */
async function findExistingPart(client: DbClient, part: PartsInventory) {
  switch (part.type) {
    case 'resistor':
      return client.query.parts.findFirst({
        where: (table, { eq, and }) =>
          and(
            eq(table.type, 'resistor'),
            eq(table.resistance, part.resistance),
            eq(table.resistorUnit, part.resistorUnit),
            eq(table.watts, part.watts)
          )
      });

    case 'capacitor': {
      const conditions = [
        eq(parts.type, 'capacitor'),
        eq(parts.capacitorType, part.capacitorType),
        eq(parts.capacitance, part.capacitance),
        eq(parts.capUnit, part.capUnit),
        eq(parts.leadSpacingMm, part.leadSpacingMm)
      ];

      if (part.capacitorType === 'electrolytic') {
        conditions.push(
          eq(parts.voltageDc, part.voltageDc),
          eq(parts.diameterMm, part.diameterMm)
        );
      } else if (part.capacitorType === 'film') {
        conditions.push(
          eq(parts.voltageDc, part.voltageDc),
          eq(parts.thicknessMm, part.thicknessMm)
        );
      } else if (part.capacitorType === 'mlcc') {
        conditions.push(eq(parts.voltageDc, part.voltageDc));
      }

      return client.query.parts.findFirst({
        where: () => and(...conditions)
      });
    }

    case 'transistor':
      return client.query.parts.findFirst({
        where: (table, { eq, and }) =>
          and(
            eq(table.type, 'transistor'),
            eq(table.partNumber, part.partNumber),
            eq(table.material, part.material),
            eq(table.package, part.package),
            eq(table.polarity, part.polarity)
          )
      });

    case 'diode':
      return client.query.parts.findFirst({
        where: (table, { eq, and }) =>
          and(
            eq(table.type, 'diode'),
            eq(table.partNumber, part.partNumber),
            eq(table.diodeType, part.diodeType),
            eq(table.material, part.material),
            eq(table.package, part.package)
          )
      });

    case 'ic':
      return client.query.parts.findFirst({
        where: (table, { eq, and }) =>
          and(
            eq(table.type, 'ic'),
            eq(table.partNumber, part.partNumber),
            eq(table.package, part.package),
            eq(table.icCategory, part.icCategory)
          )
      });

    case 'potentiometer':
      return client.query.parts.findFirst({
        where: (table, { eq, and }) =>
          and(
            eq(table.type, 'potentiometer'),
            eq(table.potCategory, part.potCategory),
            eq(table.resistance, part.resistance),
            eq(table.taper, part.taper),
            eq(table.shaftType, part.shaftType),
            eq(table.shaftDiameter, part.shaftDiameter),
            eq(table.terminalType, part.terminalType)
          )
      });

    default:
      throw new Error(
        `Unhandled part type in findExistingPart: ${(part as { type: string }).type}`
      );
  }
}

/**
 * -----------------------
 * Router
 * -----------------------
 */
export const partsRouter = router({
  addPart: publicProcedure
    .input(
      z.object({
        part: addPartSchema,
        quantity: z.number().int().positive()
      })
    )
    .mutation(async ({ input }) => {
      const { part, quantity } = input;

      await db.transaction(async (tx) => {
        const existing = await findExistingPart(tx, part);
        let partId: number;

        if (!existing) {
          const inserted = await tx
            .insert(parts)
            .values(mapPartToDb(part))
            .returning();

          partId = inserted[0].id;

          await tx.insert(inventory).values({
            partId,
            quantity
          });
        } else {
          partId = existing.id;

          const result = await tx
            .update(inventory)
            .set({
              quantity: sql`${inventory.quantity} + ${quantity}`
            })
            .where(eq(inventory.partId, partId))
            .returning();
          if (result.length === 0) {
            // no inventory row exists, create one
            await tx.insert(inventory).values({
              partId,
              quantity
            });
          }
        }
      });

      return { success: true };
    }),
  getAllParts: publicProcedure.query(async () => {
    return db
      .select()
      .from(parts)
      .leftJoin(inventory, eq(inventory.partId, parts.id));
  })
});
