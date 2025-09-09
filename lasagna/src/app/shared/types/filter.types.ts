export interface Filters {
  key: string
  value: any
  // operator: 'equals' | 'not-equals' | 'contains' | 'not-contains' | 'greater-than' | 'less-than' | 'greater-than-equals' | 'less-than-equals' | 'in' | 'not-in'
  operator: 'equals'
}
