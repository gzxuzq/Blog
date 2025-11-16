<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import * as echarts from 'echarts'
import CategoryCard from './CategoryCard.vue'
import type { HousingCategoryStat, UpdateMeta } from '@/types/dashboard'

const props = defineProps<{
  categories: HousingCategoryStat[]
  meta: UpdateMeta
}>()

const chartRef = ref<HTMLDivElement | null>(null)
let chartInstance: echarts.ECharts | null = null

const totals = computed(() => {
  const privateTotal = props.categories.reduce((sum, item) => sum + item.privateCount, 0)
  const collectiveTotal = props.categories.reduce((sum, item) => sum + item.collectiveCount, 0)
  const signedTotal = props.categories.reduce((sum, item) => sum + item.signedCount, 0)
  const pendingTotal = props.categories.reduce((sum, item) => sum + item.pendingCount, 0)

  return {
    privateTotal,
    collectiveTotal,
    signedTotal,
    pendingTotal,
  }
})

const initChart = () => {
  if (!chartRef.value) {
    return
  }
  chartInstance = echarts.init(chartRef.value)
  renderChart()
}

const renderChart = () => {
  if (!chartInstance) {
    return
  }

  const categories = props.categories.map(item => item.name)
  const privateData = props.categories.map(item => item.privateCount)
  const collectiveData = props.categories.map(item => item.collectiveCount)

  chartInstance.setOption({
    backgroundColor: 'transparent',
    grid: {
      top: 20,
      left: 0,
      right: 0,
      bottom: 0,
      containLabel: true,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      backgroundColor: '#101a2c',
      borderColor: '#1a2741',
      borderWidth: 1,
      textStyle: {
        color: '#fff',
      },
    },
    legend: {
      icon: 'rect',
      itemWidth: 12,
      itemHeight: 12,
      textStyle: {
        color: '#b9c6da',
      },
    },
    xAxis: {
      type: 'value',
      axisLabel: { color: '#8ea2c6' },
      splitLine: {
        lineStyle: {
          color: '#1a2741',
          type: 'dashed',
        },
      },
    },
    yAxis: {
      type: 'category',
      data: categories,
      axisLabel: {
        color: '#c7d6ee',
        fontSize: 12,
      },
      axisTick: { show: false },
      axisLine: { lineStyle: { color: '#1f2d4a' } },
    },
    series: [
      {
        name: '私宅',
        type: 'bar',
        stack: 'total',
        data: privateData,
        barWidth: 18,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: '#2af9d3' },
            { offset: 1, color: '#22a1ff' },
          ]),
        },
      },
      {
        name: '集体/国有',
        type: 'bar',
        stack: 'total',
        data: collectiveData,
        barWidth: 18,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: '#8a7dff' },
            { offset: 1, color: '#3c58ff' },
          ]),
        },
      },
    ],
  })
}

const handleResize = () => {
  chartInstance?.resize()
}

onMounted(() => {
  initChart()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  chartInstance?.dispose()
  window.removeEventListener('resize', handleResize)
})

watch(
  () => props.categories,
  () => {
    renderChart()
  },
  { deep: true },
)
</script>

<template>
  <section
    class="w-full rounded-3xl border border-white/10 bg-dashboard-panel/80 p-6 text-white shadow-[0_20px_80px_rgba(0,0,0,0.55)] backdrop-blur-2xl"
  >
    <header class="flex flex-col gap-4 border-b border-white/10 pb-4 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <p class="text-xs uppercase tracking-[0.4em] text-dashboard-accent">领导驾驶舱</p>
        <h1 class="mt-1 text-3xl font-semibold">数据分类</h1>
        <p class="mt-1 text-sm text-white/60">
          聚合展示征拆区域内五大类房源现状，为签约和执行提供决策支撑
        </p>
      </div>
      <div class="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
        <p>最新数据：{{ meta.timestamp }}</p>
        <p class="text-right text-xs text-white/40">来源：{{ meta.operator }}</p>
      </div>
    </header>

    <div class="mt-4 grid gap-4 text-center sm:grid-cols-2 lg:grid-cols-4">
      <div class="rounded-2xl bg-white/5 p-4">
        <p class="text-xs text-white/60">签约总量</p>
        <p class="text-3xl font-semibold text-dashboard-accent">{{ totals.signedTotal }}</p>
      </div>
      <div class="rounded-2xl bg-white/5 p-4">
        <p class="text-xs text-white/60">待办理</p>
        <p class="text-3xl font-semibold text-[#ffcc6f]">{{ totals.pendingTotal }}</p>
      </div>
      <div class="rounded-2xl bg-white/5 p-4">
        <p class="text-xs text-white/60">私宅覆盖</p>
        <p class="text-3xl font-semibold text-dashboard-accent">{{ totals.privateTotal }}</p>
      </div>
      <div class="rounded-2xl bg-white/5 p-4">
        <p class="text-xs text-white/60">集体/国有覆盖</p>
        <p class="text-3xl font-semibold text-[#4fd2ff]">{{ totals.collectiveTotal }}</p>
      </div>
    </div>

    <div class="mt-6 grid gap-6 xl:grid-cols-3">
      <div class="xl:col-span-2 grid gap-4 md:grid-cols-2">
        <CategoryCard v-for="category in categories" :key="category.id" :category="category" />
      </div>
      <div class="rounded-2xl border border-white/5 bg-dashboard-bg/60 p-4">
        <p class="text-sm text-white/70">分类对比</p>
        <div ref="chartRef" class="mt-4 h-80 w-full"></div>
      </div>
    </div>
  </section>
</template>
