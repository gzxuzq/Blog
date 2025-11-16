import type { HousingCategoryStat, UpdateMeta } from '@/types/dashboard'

export const classificationStats: HousingCategoryStat[] = [
  {
    id: 'village-house',
    name: '村民住宅',
    privateCount: 482,
    collectiveCount: 66,
    signedCount: 388,
    pendingCount: 94,
    changeRate: 6.5,
  },
  {
    id: 'collective-property',
    name: '集体物业',
    privateCount: 0,
    collectiveCount: 128,
    signedCount: 102,
    pendingCount: 26,
    changeRate: 4.1,
  },
  {
    id: 'state-house',
    name: '国有住宅',
    privateCount: 72,
    collectiveCount: 58,
    signedCount: 99,
    pendingCount: 31,
    changeRate: 3.2,
  },
  {
    id: 'state-nonhouse',
    name: '国有非住宅',
    privateCount: 14,
    collectiveCount: 205,
    signedCount: 151,
    pendingCount: 68,
    changeRate: -1.6,
  },
  {
    id: 'raising-house',
    name: '集资房',
    privateCount: 126,
    collectiveCount: 42,
    signedCount: 101,
    pendingCount: 67,
    changeRate: 2.7,
  },
]

export const updateMeta: UpdateMeta = {
  timestamp: '2025-11-16 08:30',
  operator: '城更指挥中心',
}
