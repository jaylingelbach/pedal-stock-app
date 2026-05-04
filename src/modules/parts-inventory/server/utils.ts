import { PartsInventory } from '@/modules/parts-inventory/schemas';

export function mapPartToDb(part: PartsInventory) {
  switch (part.type) {
    case 'resistor':
      return {
        type: part.type,
        resistance: part.resistance,
        resistorUnit: part.resistorUnit,
        watts: part.watts
      };

    case 'capacitor':
      return {
        type: part.type,
        capacitance: part.capacitance,
        capacitorType: part.capacitorType,
        capUnit: part.capUnit,
        voltageDc: 'voltageDc' in part ? part.voltageDc : null,
        diameterMm: 'diameterMm' in part ? part.diameterMm : null,
        thicknessMm: 'thicknessMm' in part ? part.thicknessMm : null,
        leadSpacingMm: part.leadSpacingMm
      };

    case 'transistor':
      return {
        type: part.type,
        partNumber: part.partNumber,
        material: part.material,
        package: part.package,
        polarity: part.polarity
      };

    case 'diode':
      return {
        type: part.type,
        partNumber: part.partNumber,
        diodeType: part.diodeType,
        material: part.material,
        package: part.package
      };

    case 'ic':
      return {
        type: part.type,
        partNumber: part.partNumber,
        package: part.package,
        icCategory: part.icCategory
      };

    case 'potentiometer':
      return {
        type: part.type,
        potCategory: part.potCategory,
        resistance: part.resistance,
        taper: part.taper,
        shaftType: part.shaftType,
        shaftDiameter: part.shaftDiameter,
        terminalType: part.terminalType
      };
    default: {
      // catches at compile rather than runtime
      const _exhaustiveCheck: never = part;
      throw new Error(
        `Unhandled part type: ${(_exhaustiveCheck as { type: string }).type}`
      );
    }
  }
}
