<template>
  <div class="container-fluid">
    <div class="row no-p">
      <SideBar
        class="col-side"
        @select-tab="onTabSelect"
        @revert-tab="onTabRevert"
      />
      <div class="col-container">
        <Analytics v-if="selectedTab === Pages.ANALYTICS" />
        <Reports v-else-if="selectedTab === Pages.REPORTS" />
        <ScheduledReports v-else />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Pages, useLoggedInUserStore } from '@/store'
  import { defineComponent, computed } from 'vue'
  import SideBar from './SideBar.vue'
  import Reports from './Reports.vue'
  import Analytics from './Analytics/Analytics.vue'
  import ScheduledReports from './ScheduledReports/Index.vue'
  import { saveUserSelectedPage } from '@/utils/user'

  export default defineComponent({
    name: 'Reporting',
    components: { SideBar, Reports, Analytics, ScheduledReports },
    setup() {
      const store = useLoggedInUserStore()

      const onTabSelect = (tab: Pages) => {
        store.updateSelectedTab(tab)
        saveUserSelectedPage(tab)
      }

      const onTabRevert = () => {
        store.revertTab()
      }

      const selectedTab = computed(() => {
        return store.selectedTab
      })

      return {
        location,
        selectedTab,
        onTabSelect,
        Pages,
        onTabRevert,
      }
    },
  })
</script>
