import {z} from 'zod';

export const UnitScheme = z.enum([
  'gram',
  'portion',
  'piece'
])
