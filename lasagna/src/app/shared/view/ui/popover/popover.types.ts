export type PopoverPosition = 'top' | 'bottom' | 'left' | 'right' | 'auto';

export interface PopoverRef {
  close(): void;
  readonly closeOnOther: boolean;
}