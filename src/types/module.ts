export interface BlocksModule {
  _id: string
  id: string
  title: string
  views: number
  theme: string
  createdAt: string
}

export enum Status {
  SENT = 'sent',
  ENROLLED = 'enrolled',
  EXPERIENCED = 'experienced',
  COMPLETED = 'completed',
}
