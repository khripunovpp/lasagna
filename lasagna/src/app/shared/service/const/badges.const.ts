export const stateToBadgeClassMap: Record<string, string> = {
  draft: 'text-secondary',
  paid: 'text-success',
  cancelled: 'text-danger',
  issued: 'text-info'
}
export const stateToLabelMap: Record<string, string> = {
  draft: 'invoices.state.draft',
  paid: 'invoices.state.paid',
  cancelled: 'invoices.state.cancelled',
  issued: 'invoices.state.issued'
};
