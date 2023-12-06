export interface SortParam {
  sortKey: string
  /* Sortable object looks like
  {
    enrollments: 'default',
    completions: 'default',
    started: 'default',
    notStarted: 'default',
  }
  */
  sortable: any
}

export interface Office {
  id: number
  name?: string
}

export interface Enterprise {
  id: number
  name?: string
}

export interface OfficeEnterpriseFilter {
  offices: number | null
  enterprises: number | null
}

export interface DateFilter {
  from?: Date
  to?: Date
}

export type ExportFileType = 'xlsx' | 'csv'

export type FilterObject = {
  id: number
  name: string
}
