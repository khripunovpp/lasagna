import {z} from 'zod';
import {UnitValue} from '../../../../shared/view/const/units.const';

export const UnitScheme = z.enum(Object.values(UnitValue) as [string, ...string[]])
