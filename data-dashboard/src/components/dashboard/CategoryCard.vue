<script setup lang="ts">
import { computed } from 'vue'
import type { HousingCategoryStat } from '@/types/dashboard'

const props = defineProps<{
  category: HousingCategoryStat
}>()

const totalCount = computed(
  () => props.category.privateCount + props.category.collectiveCount,
)
const privateRatio = computed(() =>
  totalCount.value ? Math.round((props.category.privateCount / totalCount.value) * 100) : 0,
)
const collectiveRatio = computed(() =>
  totalCount.value ? Math.round((props.category.collectiveCount / totalCount.value) * 100) : 0,
)
const trendIcon = computed(() => (props.category.changeRate >= 0 ? '▲' : '▼'))
const trendColor = computed(() =>
  props.category.changeRate >= 0 ? 'text-dashboard-accent' : 'text-[#ff5f5f]',
)
</script>

<template>
  <article
    class="rounded-xl border border-white/5 bg-gradient-to-br from-white/5 via-white/0 to-white/5 p-4 shadow-[0_4px_25px_rgba(0,0,0,0.35)] backdrop-blur-lg"
  >
    <header class="flex items-center justify-between">
      <p class="text-sm text-white/60">{{ category.name }}</p>
      <span
        class="rounded-full border border-white/15 px-3 py-0.5 text-xs text-white/70 tracking-wide"
      >
        共 {{ totalCount }} 套
      </span>
    </header>

    <div class="mt-4 flex items-end justify-between">
      <div>
        <p class="text-xs text-white/40">签约完成</p>
        <p class="text-2xl font-semibold text-dashboard-accent">
          {{ category.signedCount }}
          <span class="text-sm text-white/50">套</span>
        </p>
      </div>
      <div class="text-right">
        <p class="text-xs text-white/40">剩余办理</p>
        <p class="text-lg font-medium text-white">{{ category.pendingCount }}</p>
        <p :class="['mt-1 text-xs font-semibold', trendColor]">
          {{ trendIcon }} {{ Math.abs(category.changeRate).toFixed(1) }}%
        </p>
      </div>
    </div>

    <div class="mt-3 space-y-2">
      <div class="flex items-center justify-between text-xs text-white/60">
        <span>私宅</span>
        <span>{{ category.privateCount }} 套 · {{ privateRatio }}%</span>
      </div>
      <div class="h-2 rounded-full bg-white/10">
        <span
          class="block h-full rounded-full bg-dashboard-accent"
          :style="{ width: `${privateRatio}%` }"
        />
      </div>
      <div class="flex items-center justify-between text-xs text-white/60">
        <span>集体/国有</span>
        <span>{{ category.collectiveCount }} 套 · {{ collectiveRatio }}%</span>
      </div>
      <div class="h-2 rounded-full bg-white/10">
        <span
          class="block h-full rounded-full bg-dashboard-accent-strong"
          :style="{ width: `${collectiveRatio}%` }"
        />
      </div>
    </div>
  </article>
</template>
