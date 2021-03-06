'use es6';

import convert from 'convert-units';
import { Map } from 'immutable';

import Distance from '../data/Distance';
import DistanceUnit from '../data/DistanceUnit';

export default class DistanceConverter {
  constructor() {
    let unitConversionIdentifier = {};
    unitConversionIdentifier[DistanceUnit.MILE.name] = 'mi';
    unitConversionIdentifier[DistanceUnit.KILOMETER.name] = 'm';

    this.unitConversionIdentifier = Map(unitConversionIdentifier);
  }

  convert(distance, toUnit) {
    const fromUnitIdentifier = this.getUnitConversionIdentifier(distance.unit);
    const toUnitIdentifier = this.getUnitConversionIdentifier(toUnit);
    const convertedValue = convert(distance.value).from(fromUnitIdentifier).to(toUnitIdentifier);

    switch (toUnit) {
      case DistanceUnit.KILOMETER: {
        // Note divided by 1000 because convert library does not have kilometers, so using meters
        return new Distance({
          value: convertedValue / 1000,
          unit: DistanceUnit.KILOMETER
        });
      }

      case DistanceUnit.MILE: {
        return new Distance({
          value: convertedValue,
          unit: DistanceUnit.MILE
        });
      }

      default: {
        throw new TypeError(`Unknown unit: ${toUnit}`);
      }
    }
  }

  getUnitConversionIdentifier(unit) {
    const identifier = this.unitConversionIdentifier.get(unit.name);
    if (typeof identifier === "undefined") {
      throw new TypeError('Unknown unit');
    }
    return identifier;
  }
}
