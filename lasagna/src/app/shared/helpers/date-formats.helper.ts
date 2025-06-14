import {MatDateFormats} from '@angular/material/core';

export const CUSTOM_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'yyyy-MM-dd', // ISO формат или другой, понятный native
  },
  display: {
    dateInput: 'dd.MM.yyyy', // или любой формат, поддерживаемый NativeDateAdapter
    monthYearLabel: 'MMM yyyy',
    dateA11yLabel: 'dd.MM.yyyy',
    monthYearA11yLabel: 'MMMM yyyy',
  },
};
