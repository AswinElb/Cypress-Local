export interface Pagination {
  currentPage: number
  totalPages: number
  perPage: number
}

export interface CourseModule {
  title: string
  id: string
  url: string
}

export interface CourseModuleList {
  modules: CourseModule
}
