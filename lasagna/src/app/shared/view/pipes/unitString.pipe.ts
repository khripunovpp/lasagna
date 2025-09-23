import {Pipe} from '@angular/core';
import {getUnitMarker} from '../../helpers/unit.helper';

@Pipe({
  name: 'unitString',
  standalone: true,
})
export class UnitStringPipe {
  transform(value?: string) {
    return getUnitMarker(value);
  }
}
