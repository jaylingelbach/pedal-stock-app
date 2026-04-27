CREATE TABLE "boms" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "bom_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"bom_id" integer NOT NULL,
	"part_id" integer NOT NULL,
	"quantity_required" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "inventory_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"part_id" integer NOT NULL,
	"quantity" integer NOT NULL,
	CONSTRAINT "inventory_items_part_id_unique" UNIQUE("part_id")
);
--> statement-breakpoint
CREATE TABLE "parts" (
	"id" serial PRIMARY KEY NOT NULL,
	"type" text NOT NULL,
	"part_number" text,
	"resistance" numeric,
	"resistor_unit" text,
	"watts" numeric,
	"capacitance" numeric,
	"cap_unit" text,
	"capacitor_type" text,
	"voltage_dc" numeric,
	"diameter_mm" numeric,
	"lead_spacing_mm" numeric,
	"thickness_mm" numeric,
	"material" text,
	"package" text,
	"polarity" text,
	"diode_type" text,
	"ic_category" text,
	"pot_category" text,
	"taper" text,
	"shaft_type" text,
	"shaft_diameter" numeric,
	"terminal_type" text
);
--> statement-breakpoint
ALTER TABLE "bom_items" ADD CONSTRAINT "bom_items_bom_id_boms_id_fk" FOREIGN KEY ("bom_id") REFERENCES "public"."boms"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bom_items" ADD CONSTRAINT "bom_items_part_id_parts_id_fk" FOREIGN KEY ("part_id") REFERENCES "public"."parts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "inventory_items" ADD CONSTRAINT "inventory_items_part_id_parts_id_fk" FOREIGN KEY ("part_id") REFERENCES "public"."parts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "bom_items_bom_idx" ON "bom_items" USING btree ("bom_id");--> statement-breakpoint
CREATE INDEX "bom_items_part_idx" ON "bom_items" USING btree ("part_id");--> statement-breakpoint
CREATE INDEX "inventory_part_idx" ON "inventory_items" USING btree ("part_id");