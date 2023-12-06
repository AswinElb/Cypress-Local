export interface TableColumns {
  id: string
  label: string
  isNumerical?: boolean
}

export enum Sort {
  asc = 'asc',
  dsc = 'desc',
  default = 'default',
}

export interface SortEmitObject {
  sortable: Record<string, any>
  sortKey: string
}
