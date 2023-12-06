import { OSEnterprise, OSLearnerGroup, OSUser } from '../CourseCompletion/types'

export interface ModuleCompletion {
  id: string
  title: string
  enrolled: number
  experienced: number
  notStarted: number
  completed: number
}

export interface SingularModuleCompletion extends ModuleCompletion {
  learners: Array<ModuleCompletionLearner>
}

export interface ModuleCompletionLearner {
  firstName: string
  lastName: string
  moduleStatus: string
  lastAccessedAt: string
}

export interface Module {
  name: string
  id: number
  views_count: number
}

export interface User {
  active: boolean
  id: number
  name: string
  enterprises: Array<
    Partial<OSEnterprise> & Required<Pick<OSEnterprise, 'id' | 'name'>>
  >
  email: string
  learner_groups: Array<
    Partial<OSLearnerGroup> & Required<Pick<OSLearnerGroup, 'id' | 'name'>>
  >
}

export interface ModuleDetails {
  completion_percentage: number
  score: number
  scorm_id: number
  number_of_attempts: number
  completed_on: string
  module: Module
  user: OSUser
  status: string
}

export interface ModuleCompletionSummaryReportAfterKey {
  moduleAgg: string
  userAgg: string
}
export interface ModuleCompletionDetailedReportAfterKey {
  moduleAgg: string
}
