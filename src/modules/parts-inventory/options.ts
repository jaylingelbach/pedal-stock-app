export const resistanceOptions = [
  { value: 'R', label: 'Ω' },
  { value: 'K', label: 'KΩ' },
  { value: 'M', label: 'MΩ' }
];

export const resistorWattOptions = [
  { value: 0.125, label: '1/8 watt' },
  { value: 0.25, label: '1/4 watt' },
  { value: 0.5, label: '1/2 watt' },
  { value: 1, label: '1 watt' }
];

export const electrolyticDiameterOptions = [
  { value: 5, label: '5 mm' },
  { value: 6.3, label: '6.3 mm' },
  { value: 8, label: '8 mm' },
  { value: 10, label: '10 mm' }
];
export const electrolyticVoltageOptions = [
  { value: 5.5, label: '5.5 V' },
  { value: 6.3, label: '6.3 V' },
  { value: 10, label: '10 V' },
  { value: 16, label: '16 V' },
  { value: 25, label: '25 V' },
  { value: 35, label: '35 V' },
  { value: 50, label: '50 V' },
  { value: 63, label: '63 V' },
  { value: 100, label: '100 V' },
  { value: 250, label: '250 V' }
];

export const filmBoxThickness = [
  { value: 4.5, label: '4.5 mm' },
  { value: 5, label: '5 mm' },
  { value: 7.2, label: '7.2 mm' },
  { value: 8.5, label: '8.5 mm' }
];

export const filmBoxLeadSpacing = [
  { value: 2.5, label: '2.5 mm' },
  { value: 5, label: '5 mm' }
];

export const filmBoxVoltage = [
  { value: 25, label: '25 V' },
  { value: 63, label: '63 V' },
  { value: 100, label: '100 V' },
  { value: 250, label: '250 V' }
];

export const ceramicLeadSpacing = [
  { value: 2.5, label: '2.5 mm' },
  { value: 5, label: '5 mm' }
];

export const mlccVoltage = [
  { value: 63, label: '63 V' },
  { value: 100, label: '100 V' },
  { value: 250, label: '250 V' },
  { value: 500, label: '500 V' }
];

export const mlccLeadSpacing = [
  { value: 2.5, label: '2.5 mm' },
  { value: 5, label: '5 mm' }
];

export const transistorMaterial = [
  { value: 'germanium', label: 'Germanium' },
  { value: 'silicon', label: 'Silicon' }
];

export const transistorPolarity = [
  { value: 'npn', label: 'NPN' },
  { value: 'pnp', label: 'PNP' },
  { value: 'mosfet', label: 'MOSFET' }
];

export const transistorPackage = [
  { value: 'to-18', label: 'TO-18' },
  { value: 'to-39', label: 'TO-39' },
  { value: 'to-92', label: 'TO-92' },
  { value: 'to-220', label: 'TO-220' },
  { value: 'sot-23', label: 'SOT-23' }
];

export const diodeType = [
  { value: 'signal', label: 'Signal' },
  { value: 'rectifier', label: 'Rectifier' },
  { value: 'zener', label: 'Zener' },
  { value: 'schottky', label: 'Schottky' }
];

export const diodeMaterial = [
  { value: 'germanium', label: 'Germanium' },
  { value: 'silicon', label: 'Silicon' }
];

export const diodePackage = [
  { value: 'do-35', label: 'DO-35' },
  { value: 'do-41', label: 'DO-41' },
  { value: 'smd', label: 'SMD' }
];

export const icPackage = [
  { value: 'dip-8', label: 'DIP-8' },
  { value: 'dip-16', label: 'DIP-16' },
  { value: 'soic-8', label: 'SOIC-8' },
  { value: 'soic-16', label: 'SOIC-16' },
  { value: 'sop-8', label: 'SOP-8' },
  { value: 'sop-16', label: 'SOP-16' }
];

export const icCategory = [
  { value: 'opamp', label: 'Opamp' },
  { value: 'cmos', label: 'CMOS' },
  { value: 'logic', label: 'Logic' },
  { value: 'microcontroller', label: 'Microcontroller' },
  { value: 'other', label: 'Other' }
];

export const potCategory = [
  { value: 'rotary', label: 'Rotary' },
  { value: 'trimmer', label: 'Trimmer' }
];

export const potentiometerResistance = [
  { value: 0.5, label: '500 Ω' },
  { value: 1, label: '1 KΩ' },
  { value: 2, label: '2 KΩ' },
  { value: 2.2, label: '2.2 KΩ' },
  { value: 5, label: '5 KΩ' },
  { value: 10, label: '10 KΩ' },
  { value: 20, label: '20 KΩ' },
  { value: 25, label: '25 KΩ' },
  { value: 50, label: '50 KΩ' },
  { value: 100, label: '100 KΩ' },
  { value: 200, label: '200 KΩ' },
  { value: 250, label: '250 KΩ' },
  { value: 500, label: '500 KΩ' },
  { value: 1000, label: '1 MΩ' },
  { value: 2000, label: '2 MΩ' }
];

export const potTaper = [
  { value: 'linear', label: 'Linear' },
  { value: 'logarithmic', label: 'Logarithmic' },
  { value: 'anti-log', label: 'Anti-Log' },
  { value: 'w-taper', label: 'W-Taper' }
];

export const potShaftType = [
  { value: 'round', label: 'Round' },
  { value: 'spline', label: 'Spline' },
  { value: 'd-shaft', label: 'D-Shaft' }
];

export const potShaftDiameter = [
  { value: 6, label: '6 mm' },
  { value: 6.35, label: '6.35 mm' },
  { value: 9, label: '9 mm' }
];

export const terminalType = [
  { value: 'pcb', label: 'PCB' },
  { value: 'solder-lugs', label: 'Solder Lugs' },
  { value: 'long-pins', label: 'Long Pins' }
];
