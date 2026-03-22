export type PopoverPosition = 'top' | 'bottom' | 'left' | 'right';

export interface PopoverRef {
  close(): void;
  readonly closeOnOther: boolean;
}