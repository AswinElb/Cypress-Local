export interface CourseCompletion {
  id: string
  title: string
  enrolled: string
  completed: string
  experienced: string
  sent: string
}

export interface CourseCompletionDetailed {
  completedModules: number
  completionDate: string
  completionPercent: number
  completionStatus: string
  courseID: number
  courseName: string
  coursePath: string
  currentEnterprise: string
  currentLearnerGroup: string
  currentOffice: string
  dueDate: string
  emailID: string
  enrollmentDate: string
  firstName: string
  lastName: string
  numberOfModules: number
  userID: number
}

export interface CourseLearnersCompletion {
  id: string
  name: string
  progress: number
  lastAccessedAt: Date
}

export interface OSEnterprise {
  id: number
  name: string
  alias: string
  abbr: string
  created_by: number
  created_at: Date
  flagged: boolean
  user_group_flagged?: boolean
}

export type OSOffice = OSEnterprise
export type OSLearnerGroup = OSEnterprise

export interface OSModule {
  id: number
  name: string
  title: string
  real_name: string
  description: string
  created_at: Date
  created_by: number
  views_count: number
  module_type: string
  last_accessed_at?: Date
  learner_groups?: Partial<OSLearnerGroup> &
    Required<Pick<OSLearnerGroup, 'id' | 'name'>>
  flagged: boolean
}

export interface OSCourse {
  id: number
  name: string
  alias: string
  description: string | null
  created_at: Date
  created_by: number
  flagged: boolean
  subscription_id?: number
  organization_id?: number
  enrollment_enabled: boolean
  child_depth?: number
  parent_id?: number
  modules?: (Partial<OSModule> &
    Required<Pick<OSModule, 'id' | 'name' | 'real_name'>> & {
      is_removed_from_course: boolean
    })[]
}

export interface OSUser {
  id: number
  email: string
  first_name: string
  last_name: string
  active: boolean
}

export interface CourseCompletionSummaryReportAfterKey {
  courseAgg: string
}
