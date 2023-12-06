export enum Variant {
  PRIMARY = 'bg-primary',
  INFO = 'bg-info',
  DANGER = 'bg-danger',
  SUCCESS = 'bg-success',
  WARNING = 'bg-warning',
}

export interface Toast {
  show: boolean
  title?: string
  age?: string
  body: string
  variant: Variant
}
