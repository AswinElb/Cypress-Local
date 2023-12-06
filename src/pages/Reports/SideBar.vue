<template>
  <div class="sidebar">
    <Tooltip message="Dashboard" :offset-y="12">
      <div
        tag="button"
        :class="`menu-items row ${
          selectedTab == Pages.ANALYTICS ? 'active' : ''
        }
      `"
        @click="setSelectedTab(Pages.ANALYTICS)"
      >
        <div class="link-container">
          <DashboardSvg class="svg" />
        </div>
      </div>
    </Tooltip>
    <Tooltip message="Reports" :offset-y="12">
      <div
        tag="button"
        :class="`menu-items row ${
          selectedTab == Pages.REPORTS ? 'active' : ''
        }`"
        @click="setSelectedTab(Pages.REPORTS)"
      >
        <div class="link-container"><ReportSvg class="svg" /></div>
      </div>
    </Tooltip>
    <Tooltip message="Scheduled Reports" :offset-y="12">
      <div
        tag="button"
        :class="`menu-items row ${
          selectedTab == Pages.SCHEDULED_REPORTS ? 'active' : ''
        }`"
        @click="setSelectedTab(Pages.SCHEDULED_REPORTS)"
      >
        <div class="link-container"><ScheduledReportsSvg class="svg" /></div>
      </div>
    </Tooltip>
  </div>
</template>

<script lang="ts" setup>
  import DashboardSvg from '@/assets/images/dashboard.svg?component'
  import ReportSvg from '@/assets/images/reports.svg?component'
  import ScheduledReportsSvg from '@/assets/images/scheduled.svg?component'
  import { computed } from 'vue'
  import { Pages, useLoggedInUserStore } from '@/store'
  import Tooltip from '@/components/common/Tooltip.vue'

  const emit = defineEmits(['select-tab', 'revert-tab'])

  const loggedInUserStore = useLoggedInUserStore()

  const setSelectedTab = (tab: Pages) => {
    emit('select-tab', tab)
  }

  const selectedTab = computed(() => {
    return loggedInUserStore.selectedTab
  })
</script>
