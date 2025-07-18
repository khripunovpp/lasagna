import {Tax} from '../../features/settings/service/models/Tax';
import {TaxDTO} from '../../features/settings/service/schemes/Tax.scheme';

export const taxToFormValue = (tax: Tax) => {
  return {
    name: tax.name,
    description: tax.description,
    amount: tax.amount,
    percentage: tax.percentage,
    uuid: tax.uuid,
  }
};

export const taxDTOFromFormValue = (taxFormValue: any): TaxDTO => {
  return {
    name: taxFormValue.name,
    description: taxFormValue.description,
    amount: taxFormValue.value,
    percentage: taxFormValue.percentage,
    uuid: taxFormValue.uuid,
  }
}
