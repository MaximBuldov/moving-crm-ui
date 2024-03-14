export enum JobsStatusColors {
  ORANGE = '#eb8c00',
  GREEN = '#33ad00',
  RED = '#1890ff',
  BLACK = '#222',
  GRAY = '#8b8b8b'
}

export enum JobsStatus {
  LEAD_IN_PROGRESS = 'Lead in progress',
  OPPORTUNITY = 'Opportunity',
  NEW_LEAD = 'New Lead',
  BOOKED = 'Booked',
  SCEDULED = 'Scheduled',
  CONFIRMED = 'Confirmed',
  IN_PROGRESS = 'In progress',
  CANCELLED = 'Cancelled',
  LOST = 'Lost',
  BAD_LEAD = 'Bad lead',
  CLOSED = 'Closed'
}

export interface IField {
  id: number;
  label: string;
  value?: string;
  active?: boolean
}