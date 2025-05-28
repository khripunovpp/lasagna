import { AbstractControl, FormControl, FormGroup, FormArray } from '@angular/forms';

type InferControlValue<T> =
  T extends FormControl<infer V> ? V :
  T extends FormGroup<infer G> ? InferFormShape<G> :
  T extends FormArray<infer A> ? InferControlValue<A>[] :
  never;

export type InferFormShape<T extends { [key: string]: AbstractControl<any> }> = {
  [K in keyof T]: InferControlValue<T[K]>;
};
