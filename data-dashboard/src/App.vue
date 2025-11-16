<script setup lang="ts">
import DataClassificationPanel from '@/components/dashboard/DataClassificationPanel.vue'
import { classificationStats, updateMeta } from '@/constants/dashboard'
</script>

<template>
  <main
    class="min-h-screen w-full bg-[radial-gradient(circle_at_top,#1d3a63,transparent_60%),#050912] px-4 py-8 text-white"
  >
    <div class="mx-auto flex max-w-6xl flex-col gap-6">
      <div class="flex flex-col gap-2 text-center">
        <p class="text-sm uppercase tracking-[0.5em] text-dashboard-accent/80">全景指挥系统</p>
        <h1 class="text-4xl font-semibold">领导驾驶舱 · 作战图</h1>
        <p class="text-sm text-white/60">
          聚焦征拆分类场景，实时洞察村民住宅、集体物业、国有住宅等五大类型数据
        </p>
      </div>
      <DataClassificationPanel :categories="classificationStats" :meta="updateMeta" />
    </div>
  </main>
</template>
