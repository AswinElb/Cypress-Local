<template>
  <div class="row card-header bs-override">
    <div class="row no-w align-items-center justify-content-between">
      <div class="row col-4 align-items-center">
        <div class="col-auto no-p">
          <div class="page__header">
            Dashboard
            <span class="badge rounded-pill bg-primary">Pre-Beta</span>
          </div>
        </div>
      </div>
      <div class="col-4 col-md-6 col-lg-8 d-flex justify-content-end">
        <div
          class="btn-group col-auto"
          role="group"
          aria-label="Time range radio group buttons"
        >
          <input
            id="days"
            type="radio"
            class="btn-check"
            name="btnradio"
            autocomplete="off"
            @click="setReportDuration(ANALYTICS_RANGE.DAY)"
          />
          <label
            :class="`${
              selectMode === ANALYTICS_RANGE.DAY ? 'active' : ''
            } btn button-primary navbar-button no-line-height`"
            for="days"
            >{{
              getLocalizedText('message.dashboardDateRanges.last24Hours')
            }}</label
          >
          <input
            id="weeks"
            type="radio"
            class="btn-check"
            name="btnradio"
            autocomplete="off"
            @click="setReportDuration(ANALYTICS_RANGE.WEEK)"
          />
          <label
            :class="`${
              selectMode === ANALYTICS_RANGE.WEEK ? 'active' : ''
            } btn button-primary navbar-button no-line-height`"
            for="weeks"
            >{{
              getLocalizedText('message.dashboardDateRanges.last7Days')
            }}</label
          >
          <input
            id="months"
            type="radio"
            class="btn-check"
            name="btnradio"
            autocomplete="off"
            @click="setReportDuration(ANALYTICS_RANGE.MONTH)"
          />
          <label
            :class="`${
              selectMode === ANALYTICS_RANGE.MONTH ? 'active' : ''
            } btn button-primary navbar-button no-line-height`"
            for="months"
            >{{
              getLocalizedText('message.dashboardDateRanges.last30Days')
            }}</label
          >
          <input
            id="year"
            type="radio"
            class="btn-check"
            name="btnradio"
            autocomplete="off"
            @click="setReportDuration(ANALYTICS_RANGE.YEAR)"
          />
          <label
            :class="`${
              selectMode === ANALYTICS_RANGE.YEAR ? 'active' : ''
            } btn button-primary navbar-button no-line-height`"
            for="year"
            >{{
              getLocalizedText('message.dashboardDateRanges.last365Days')
            }}</label
          >
          <input
            id="custom"
            type="radio"
            class="btn-check"
            name="btnradio"
            autocomplete="off"
            value="customDate"
          />
          <label
            :class="`${
              selectMode.includes(ANALYTICS_RANGE.CUSTOM) ? 'active' : ''
            }`"
            class="btn button-primary navbar-button no-line-height col-auto d-flex align-content-center align-items-center calendar-component"
            for="custom"
          >
            <calendar-component
              ref="datePicker"
              :class="'col-10 p-0'"
              @range:select="(date: Date[]) => setReportDuration(`customDate:${date}`, date)"
            />
            <DropdownIconSvg class="svg col-2" @click="openDatePicker" />
          </label>
        </div>
      </div>
      <!-- @TODO: Create separate component -->
      <div
        class="col-auto export-container close-btn"
        title="Close"
        @click="goBack()"
      >
        <div class="row">
          <Icon icon-type="x" stroke="white" />
        </div>
      </div>
    </div>
  </div>
  <div v-if="isLoading" class="analytics-loading">
    <Loading />
  </div>
  <div v-else class="row justify-content-center">
    <div class="col-12 dash-p">
      <div class="row mt-4">
        <div class="col-2 col-sm stat-card">
          <stat-card title="Logins" :figures="logins" :frequency="selectMode" />
        </div>
        <div class="col-2 stat-card">
          <stat-card title="Course enrollments" :figures="courseEnrollments" />
        </div>

        <div class="col-2 stat-card">
          <stat-card title="Unique logins" :figures="uniqueLogins" />
        </div>
        <div class="col-2 stat-card">
          <stat-card title="Course completions" :figures="courseCompletions" />
        </div>
        <div class="col-2 stat-card">
          <stat-card title="Module completions" :figures="moduleCompletions" />
        </div>
        <div class="col-2 stat-card">
          <stat-card title="New users" :figures="newUsers" :is-last="true" />
        </div>
      </div>
      <div class="card card-stats mt-4 apex-chart">
        <div class="card-body">
          <div class="row">
            <h5 class="card-title text-muted mb-4">Activity</h5>
          </div>
          <div class="row">
            <VueApexCharts
              width="100%"
              height="500"
              type="line"
              :options="chartOptions"
              :series="series"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import VueApexCharts from 'vue3-apexcharts'
  import { computed, defineComponent, ref, watch } from '@vue/runtime-core'
  import Loading from '@/pages/Loading.vue'
  import CalendarComponent from '@/components/common/CalendarComponent.vue'
  import StatCard from '@/components/common/StatCard.vue'
  import { subtractDays, getDifferenceInDays, formatDate } from '@/utils/date'
  import { displayToast } from '@/utils/show-toast'
  import { StatData } from './types'

  import { Variant } from '@/types/toast'
  import { fetchDashboardData } from '@/api/calls'
  import DropdownIconSvg from '@/assets/images/dropdown-arrow.svg?component'
  import { addDays } from 'date-fns'
  import { getLocalizedText } from '@/utils/util'
  import {
    ANALYTICS_RANGE,
    DASHBOARD_USER_DATES,
    DASHBOARD_USER_MODE,
  } from './constants'
  import Icon from '@/components/common/Icon.vue'
  import { onMounted } from 'vue'
  import { ApexOptions } from 'apexcharts'

  export default defineComponent({
    name: 'Analytics',
    components: {
      CalendarComponent,
      StatCard,
      VueApexCharts,
      Loading,
      DropdownIconSvg,
      Icon,
    },
    setup() {
      const isLoading = ref(false)
      const userSelectedDates = ref<Date[]>([])

      const datePicker = ref<InstanceType<typeof CalendarComponent> | null>(
        null
      )

      const chartOptions = ref<ApexOptions>({
        stroke: {
          curve: 'smooth',
        },
        legend: {
          offsetY: 10,
          height: 40,
        },
        xaxis: {
          type: 'datetime',
          labels: {
            formatter: function (val: any, opts: any) {
              // API returns counts in format {date:  nov 12, val: 20} which is the count from nov 12 upto nov 13.
              // But in apex chart, we are showing the count so far so it needs nov 13 as the label for point of inflection.
              if (!val) {
                return val
              }
              const nextDay = addDays(new Date(val), 1)

              val = formatDate(nextDay.toISOString())
              return val
            },
          },
        },

        colors: [
          '#017CFF',
          '#29A746',
          '#FFC108',
          '#DC3646',
          '#18A2B8',
          '#A020F0',
        ],
        chart: {
          toolbar: {
            show: true,
            offsetY: -48,
            tools: {
              download: false,
              selection: true,
              zoom: true,
              zoomin: true,
              zoomout: true,
              pan: false,
              reset: true,
              customIcons: [],
            },
            autoSelected: 'zoom',
          },
        },
        tooltip: {
          y: {
            formatter(val) {
              return val ? Math.round(val).toString() : '0'
            },
          },
        },
      })

      const logins = ref<StatData>({ new: 0, old: 0, range: [] })
      const uniqueLogins = ref<StatData>({ new: 0, old: 0, range: [] })
      const newUsers = ref<StatData>({ new: 0, old: 0, range: [] })
      const courseEnrollments = ref<StatData>({ new: 0, old: 0, range: [] })
      const moduleCompletions = ref<StatData>({ new: 0, old: 0, range: [] })
      const courseCompletions = ref<StatData>({ new: 0, old: 0, range: [] })

      const openDatePicker = () => {
        if (datePicker) {
          datePicker.value?.getRef()?.openMenu()
        }
      }

      const returnFormattedDates = () => {
        let from = new Date()
        let to = new Date()
        let oldFrom, oldTo
        oldFrom = oldTo = new Date()

        if (selectMode.value === ANALYTICS_RANGE.MONTH) {
          from = subtractDays(to, 30)
          oldTo = subtractDays(to, 31)
          oldFrom = subtractDays(oldTo, 30)
        } else if (selectMode.value === ANALYTICS_RANGE.WEEK) {
          from = subtractDays(to, 7)
          oldTo = subtractDays(to, 8)
          oldFrom = subtractDays(oldTo, 7)
        } else if (selectMode.value === ANALYTICS_RANGE.DAY) {
          from = subtractDays(to, 1)
          oldTo = subtractDays(to, 2)
          oldFrom = subtractDays(oldTo, 1)
        } else if (selectMode.value === ANALYTICS_RANGE.YEAR) {
          from = subtractDays(to, 365)
          oldTo = subtractDays(to, 366)
          oldFrom = subtractDays(oldTo, 365)
        } else if (selectMode.value.includes(ANALYTICS_RANGE.CUSTOM)) {
          from = userSelectedDates.value[0]
          to = userSelectedDates.value[1]
          const differenceInDays = getDifferenceInDays(to, from)
          oldFrom = subtractDays(from, differenceInDays + 1)
          oldTo = subtractDays(to, differenceInDays + 1)
        }

        return { from, to, oldFrom, oldTo }
      }

      const dashboardDataReducer = (
        acc: number,
        obj: { date: string; value: number }
      ) => {
        return acc + obj.value
      }

      const getDashboardData = async () => {
        const { from, to, oldFrom, oldTo } = returnFormattedDates()

        isLoading.value = true

        try {
          const res = await fetchDashboardData({ from, to, oldFrom, oldTo })
          const resData = res.data.data

          logins.value = {
            new: resData.loginData.logins.reduce(dashboardDataReducer, 0),
            old: resData.oldLogin.logins.reduce(dashboardDataReducer, 0),
            range: resData.loginData.logins,
          }

          uniqueLogins.value = {
            new: resData.loginData.uniqueLogins.reduce(dashboardDataReducer, 0),
            old: resData.oldLogin.uniqueLogins.reduce(dashboardDataReducer, 0),
            range: resData.loginData.uniqueLogins,
          }
          newUsers.value = {
            new: resData.newUsers.reduce(dashboardDataReducer, 0),
            old: resData.oldUsers.reduce(dashboardDataReducer, 0),
            range: resData.newUsers,
          }

          courseEnrollments.value = {
            new: resData.courseEnrollmentsData.reduce(dashboardDataReducer, 0),
            old: resData.oldCourseEnrollmentsData.reduce(
              dashboardDataReducer,
              0
            ),
            range: resData.courseEnrollmentsData,
          }

          moduleCompletions.value = {
            new: resData.moduleData.reduce(dashboardDataReducer, 0),
            old: resData.oldModuleData.reduce(dashboardDataReducer, 0),
            range: resData.moduleData,
          }

          courseCompletions.value = {
            new: resData.courseCompletions.reduce(dashboardDataReducer, 0),
            old: resData.oldCourseCompletions.reduce(dashboardDataReducer, 0),
            range: resData.courseCompletions,
          }

          isLoading.value = false
        } catch (e) {
          isLoading.value = false
          displayToast(
            getLocalizedText('alert.dashboard.fetchFail'),
            Variant.DANGER,
            'Error'
          )
          console.error(e)
        }
      }

      const goBack = () => {
        window.parent.postMessage('bl-reports-close', '*')
      }

      const selectMode = ref('')

      const setReportDuration = (mode: string, dates?: Date[]) => {
        if (!mode.includes(ANALYTICS_RANGE.CUSTOM)) {
          saveDashboardState(mode)
          selectMode.value = mode

          if (datePicker.value) {
            datePicker.value.resetDate()
          }
          return
        }
        if (!dates || !dates.length) {
          resetMode()
          //reset
          return
        }

        selectMode.value = mode
        userSelectedDates.value = dates

        saveDashboardState(mode, dates)
      }

      const saveDashboardState = (mode: string, dates?: Date[]) => {
        sessionStorage.setItem(DASHBOARD_USER_MODE, mode)
        if (!dates || !dates.length) {
          return
        }

        sessionStorage.setItem(DASHBOARD_USER_DATES, JSON.stringify(dates))
      }

      onMounted(() => {
        const userDates = sessionStorage.getItem(DASHBOARD_USER_DATES)
        if (userDates) {
          try {
            const userDatesParsed = JSON.parse(userDates)
            userSelectedDates.value = userDatesParsed

            datePicker.value?.setDate(userDatesParsed)
          } catch (error) {
            console.error('Could not parse user dates', error)
          }
        }

        selectMode.value =
          sessionStorage.getItem(DASHBOARD_USER_MODE) || ANALYTICS_RANGE.YEAR
      })

      const resetMode = () => {
        if (
          sessionStorage
            .getItem(DASHBOARD_USER_MODE)
            ?.includes(ANALYTICS_RANGE.CUSTOM)
        ) {
          selectMode.value = ANALYTICS_RANGE.YEAR
          sessionStorage.removeItem(DASHBOARD_USER_MODE)
        }

        sessionStorage.removeItem(DASHBOARD_USER_DATES)
      }

      watch(selectMode, getDashboardData)

      const figureCount = computed(() =>
        selectMode.value === ANALYTICS_RANGE.MONTH
          ? '350,897'
          : selectMode.value === ANALYTICS_RANGE.WEEK
          ? '50,897'
          : '897'
      )

      const series = computed(() => [
        {
          name: 'Logins',
          data: logins.value.range.map((val) => [
            new Date(val.date).getTime(),
            val.value,
          ]),
        },
        {
          name: 'Course enrollments',
          data: courseEnrollments.value.range.map((val) => [
            new Date(val.date).getTime(),
            val.value,
          ]),
        },
        {
          name: 'Unique logins',
          data: uniqueLogins.value.range.map((val) => [
            new Date(val.date).getTime(),
            val.value,
          ]),
        },
        {
          name: 'Course completions',
          data: courseCompletions.value.range.map((val) => [
            new Date(val.date).getTime(),
            val.value,
          ]),
        },
        {
          name: 'Module completions',
          data: moduleCompletions.value.range.map((val) => [
            new Date(val.date).getTime(),
            val.value,
          ]),
        },
        {
          name: 'New users',
          data: newUsers.value.range.map((val) => [
            new Date(val.date).getTime(),
            val.value,
          ]),
        },
      ])

      return {
        chartOptions,
        series,
        figureCount,
        selectMode,
        logins,
        uniqueLogins,
        newUsers,
        goBack,
        courseEnrollments,
        moduleCompletions,
        courseCompletions,
        setReportDuration,
        isLoading,
        openDatePicker,
        getLocalizedText,
        datePicker,
        ANALYTICS_RANGE,
      }
    },
  })
</script>
