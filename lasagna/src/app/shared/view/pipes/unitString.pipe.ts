import {Pipe} from '@angular/core';
import {marker} from '@colsen1991/ngx-translate-extract-marker';
import {UnitValue} from '../const/units.const';

@Pipe({
  name: 'unitString',
  standalone: true,
})
export class UnitStringPipe {

  private readonly _unitMap: Record<string, string> = {
    [UnitValue.GRAM]: marker('unit.gram'),
    [UnitValue.KILOGRAM]: marker('unit.kilogram'),
    [UnitValue.PIECE]: marker('unit.piece'),
  };

  transform(value?: string) {
    return value
      ? this._unitMap[value] || value
      : marker('unit.unknown');
  }
}
