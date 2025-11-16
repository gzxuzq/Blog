export interface HousingCategoryStat {
  id: string
  name: string
  privateCount: number
  collectiveCount: number
  signedCount: number
  pendingCount: number
  changeRate: number
}

export interface UpdateMeta {
  timestamp: string
  operator: string
}
