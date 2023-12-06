import { Sort } from '@/types/table'

export const getOpenSearchCompatibleSort = (sortable: Record<string, Sort>) => {
  return Object.keys(sortable)
    .filter((sortKey) => sortable[sortKey] !== Sort.default)
    .map((sortKey) => ({ [sortKey]: sortable[sortKey] }))
}
