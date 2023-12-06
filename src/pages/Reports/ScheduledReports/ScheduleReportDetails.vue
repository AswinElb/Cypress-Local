<template>
  <Modal
    v-if="props.show"
    ref="modal"
    @click:close="handleClose"
    @click:save="handleSave"
  >
    <template #header-text>
      <h5 class="modal-title">
        <template v-if="editMode"
          >{{
            getLocalizedText(
              'message.scheduleReportDetails.updateScheduledReports'
            )
          }}
        </template>
        <template v-else
          >{{
            getLocalizedText('message.scheduleReportDetails.scheduleReport')
          }}
        </template>
        <template v-if="report.title">for "{{ report.title }}"</template>
      </h5>
    </template>
    <template #body>
      <form v-if="!loading" class="report-form">
        <div class="row">
          <label for="reportName" class="form-label">Name</label>
        </div>
        <div class="row">
          <div class="col-12">
            <input
              id="reportName"
              v-model="formData.name"
              type="text"
              class="form-control"
              required
            />
            <div v-if="v$.name.$error" class="invalid-feedback d-block">
              {{ v$.name.$errors[0].$message }}
            </div>
            <p class="info">
              {{
                getInterpolatedText(
                  'message.scheduleReportModal.reportFilters',
                  { count: filterNumber },
                  filterNumber
                )
              }}
            </p>
          </div>
        </div>
        <div class="row">
          <label for="reportName" class="form-label">Frequency</label>
        </div>
        <div class="row frequency-block align-items-center mb-1">
          <div class="col-auto">
            <select
              v-if="!editMode"
              v-model="formData.frequency.type"
              class="form-select form-select-sm"
            >
              <option
                v-for="[key, value] in OPTIONS"
                :key="value.id"
                :value="key"
              >
                {{
                  key === REPORT_FREQUENCY.EDIT ? `${value.label}` : value.label
                }}
              </option>
            </select>
            <input
              v-else
              id="selectedFrequency"
              :value="fetchedData.editSelectString"
              type="text"
              disabled
              readonly
              class="form-control"
            />
          </div>
          <div class="col-2">
            <datepicker
              v-model="formData.frequency.time"
              time-picker
              width="100"
              :clearable="false"
            />
          </div>
          <div class="col-auto">
            {{
              editMode
                ? removeUnderscore(data.timeZone)
                : removeUnderscore(timeZone)
            }}
          </div>
          <div v-if="v$.frequency.type.$error" class="invalid-feedback d-block">
            Frequency type is required.
          </div>
          <div
            v-if="
              v$.frequency.time.hours.$error || v$.frequency.time.hours.$error
            "
            class="invalid-feedback d-block"
          >
            Frequency time field is required.
          </div>
        </div>
        <div
          v-if="formData.frequency.type === REPORT_FREQUENCY.DAILY"
          class="row"
        >
          <div class="col-auto">
            <div class="form-check">
              <input
                id="includeWeekends"
                v-model="formData.frequency.includeWeekends"
                class="form-check-input"
                type="checkbox"
              />
              <label class="form-check-label" for="includeWeekends">
                Include weekends
              </label>
            </div>
          </div>
        </div>

        <div class="row mt-3">
          <div class="col-auto">
            <label for="range" class="form-label">Range</label>
          </div>
        </div>
        <div class="row">
          <div class="col-auto">
            <select v-model="formData.range" class="form-select form-select-sm">
              <option
                v-for="[key, value] in RANGE_OPTIONS"
                :key="value.id"
                :value="key"
              >
                {{ value.label }}
              </option>
            </select>
          </div>
          <div v-if="v$.range.$error" class="invalid-feedback d-block">
            Range field is required.
          </div>
        </div>
        <div class="row mt-3">
          <label for="recipient" class="form-label">Recipients</label>
        </div>
        <div class="row">
          <div class="col-12">
            <vue-tags-input
              v-model="tag"
              :tags="tags"
              placeholder="example@example.com"
              :validation="emailValidation"
              :add-on-key="[13, ',']"
              @tags-changed="handleTagChange"
              @blur="handleBlur"
            />
            <div v-if="v$.recipients.$error" class="invalid-feedback d-block">
              {{
                getLocalizedText(
                  'validation.scheduleReportModal.recipientsEmpty'
                )
              }}
            </div>
          </div>
        </div>
      </form>
      <div v-else>
        <Loading />
      </div>
    </template>
    <template v-if="loading" #footer> &nbsp; </template>
  </Modal>
</template>

<script lang="ts" setup>
  import { computed, nextTick, PropType, ref, watch } from 'vue'
  import Modal from '@/components/common/Modal.vue'
  import {
    FormData,
    RecurrenceDataAndString,
    REPEAT_OPTIONS,
    ReportProp,
    REPORT_FREQUENCY,
  } from './types'
  import Datepicker from '@vuepic/vue-datepicker'
  import '@vuepic/vue-datepicker/dist/main.css'
  import VueTagsInput from '@sipec/vue3-tags-input'
  import {
    dayOfTheMonth,
    day,
    dayAndMonth,
    numberToPlacement,
  } from '@/utils/date'
  import {
    DAYS,
    INITIAL_STATE,
    dayToNextFunctionMapper,
    getReportState,
  } from './constants'
  import { RANGE, SchedulePayload } from './types'
  import { nextSaturday, nextSunday } from 'date-fns'
  import { useVuelidate, ValidationArgs } from '@vuelidate/core'
  import { helpers, maxLength, required } from '@vuelidate/validators'
  import { cloneDeep } from 'lodash'
  import { DateTime } from 'luxon'
  import Loading from '@/pages/Loading.vue'
  import { getLocalizedText, getInterpolatedText } from '@/utils/util'

  const props = defineProps({
    show: {
      type: Boolean,
      default: false,
    },
    report: {
      type: Object as PropType<ReportProp>,
      required: true,
    },
    recurrenceData: {
      type: Object as PropType<RecurrenceDataAndString>,
      default: () => ({
        data: cloneDeep(INITIAL_STATE),
        selectString: '',
      }),
    },
    editMode: {
      type: Boolean,
      required: true,
    },
    data: {
      type: Object as PropType<FormData & { timeZone: string; url?: string }>,
      default: () => ({
        ...getReportState(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      }),
    },
    loading: {
      type: Boolean,
      required: true,
    },
    fetchedData: {
      type: Object as PropType<{
        editSelectString: string
        oldInterval: string
      }>,
      default: () => ({ editSelectString: '', oldInterval: '' }),
    },
  })

  const tag = ref('')
  const tags = ref<Array<{ text: string }>>([])

  const rules: ValidationArgs = {
    name: {
      required: helpers.withMessage(
        getLocalizedText('validation.scheduleReportModal.nameEmpty'),
        required
      ),
      maxLength: helpers.withMessage(
        getLocalizedText('validation.scheduleReportModal.nameCharLimit'),
        maxLength(50)
      ),
    },
    frequency: {
      type: { required },
      time: {
        hours: { required },
        minutes: { required },
      },
      includeWeekends: false,
    },
    recipients: { required },
    range: { required },
  }

  const emailValidation = [
    {
      classes: 'email-validation',
      rule({ text }: { text: string }) {
        const reg = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g
        return !text.trim().match(reg)
      },
      disableAdd: true,
    },
  ]

  const formData = ref<FormData>(getReportState())

  const v$ = useVuelidate(rules, formData)

  const OPTIONS = ref(new Map<string, { id: number; label: string }>())

  OPTIONS.value.set(REPORT_FREQUENCY.DAILY, {
    id: 1,
    label: 'Daily',
  })

  OPTIONS.value.set(REPORT_FREQUENCY.WEEKLY, {
    id: 2,
    label: `Weekly on the ${day}`,
  })

  OPTIONS.value.set(REPORT_FREQUENCY.MONTHLY, {
    id: 3,
    label: `Monthly on the ${numberToPlacement(dayOfTheMonth)} ${day}`,
  })

  OPTIONS.value.set(REPORT_FREQUENCY.ANNUALLY, {
    id: 4,
    label: `Annually on ${dayAndMonth}`,
  })

  OPTIONS.value.set(REPORT_FREQUENCY.CUSTOM, {
    id: 5,
    label: 'Custom...',
  })

  const timeZone = ref(Intl.DateTimeFormat().resolvedOptions().timeZone)

  const RANGE_OPTIONS = ref(new Map<string, { id: number; label: string }>())

  RANGE_OPTIONS.value.set(RANGE.LAST_24_HRS, {
    id: 1,
    label: 'Last 24 hours',
  })

  RANGE_OPTIONS.value.set(RANGE.LAST_7_DAYS, {
    id: 2,
    label: 'Last 7 days',
  })

  RANGE_OPTIONS.value.set(RANGE.LAST_30_DAYS, {
    id: 3,
    label: 'Last 30 days',
  })

  RANGE_OPTIONS.value.set(RANGE.LAST_365_DAYS, {
    id: 4,
    label: 'Last 365 days',
  })

  const emit = defineEmits<{
    (e: 'update:save', payload: SchedulePayload): void
    (e: 'update:close-modal'): void
    (e: 'update:form', data: typeof formData.value): void
    (e: 'custom-frequency'): void
    (e: 'reset:custom-frequency'): void
  }>()

  function handleClose() {
    reset()
    emit('update:close-modal')
  }

  async function handleSave() {
    const result = await v$.value.$validate()

    if (!result) {
      // notify user form is invalid
      return
    }
    const formattedFrequency = getFormattedFrequency(formData.value)

    const recurrence = props.recurrenceData

    emit('update:save', {
      interval: formattedFrequency,
      name: formData.value.name,
      range: formData.value.range,
      until: recurrence.data.ends,
      selectString:
        recurrence.selectString ||
        OPTIONS.value.get(formData.value.frequency.type)?.label ||
        '',
      includeWeekends: formData.value.frequency.includeWeekends,
      recipients: formData.value.recipients,
      timeZone: timeZone.value,
      isCustom:
        formData.value.frequency.type === REPORT_FREQUENCY.CUSTOM ||
        formData.value.frequency.type === REPORT_FREQUENCY.TEMPORARY,
    })
  }

  function calculateCustomFrequency(date: Date) {
    // @TODO: calculate cron expression based on custom parameters.
    const repeat = props.recurrenceData.data

    switch (repeat.repeatType) {
      case REPEAT_OPTIONS.DAY:
        return `${date.getUTCMinutes()} ${date.getUTCHours()} * * *`

      case REPEAT_OPTIONS.WEEK: {
        // have to use custom logic for it.
        const UTCadjustedDays = repeat.repeatOn.map((repeatedDay) => {
          const dayData = DAYS.find((day) => day.cronValue === repeatedDay)
          if (!dayData) {
            return 0
          }
          const dateFunction = dayToNextFunctionMapper[dayData.fullName]
          return dateFunction(date).getUTCDay()
        })
        return `${date.getUTCMinutes()} ${date.getUTCHours()} * * ${UTCadjustedDays.join(
          ','
        )}`
      }

      case REPEAT_OPTIONS.MONTH: {
        date.setDate(Number(repeat.repeatMonthlyOn))
        return `${date.getUTCMinutes()} ${date.getUTCHours()} ${date.getUTCDate()} * *`
      }

      // case REPEAT_OPTIONS.YEAR:
      //   // No support for yearly cron job
      //   return ''

      default:
        return ''
    }
  }

  function getTzadjustedDatebyMode(date: Date) {
    return DateTime.fromISO(date.toISOString(), { zone: timeZone.value })
  }

  function getFormattedFrequency({ frequency }: typeof formData.value) {
    // change the Datetime to the selected timezone
    const adjustedLuxonDate = getTzadjustedDatebyMode(new Date())
    // set hours and minutes to the selected timezone
    const hrAndMinAdjustedLuxonDate = adjustedLuxonDate.set({
      hour: frequency.time.hours,
      minute: frequency.time.minutes,
    })

    // finally convert the adjusted time back to localtime JS date from the saved timezone to compute the interval
    const adjustedDate = DateTime.fromFormat(
      `${hrAndMinAdjustedLuxonDate.toFormat("yyyy-MM-dd'T'HH:mm:ss")} ${
        props.data.timeZone
      }`,
      "yyyy-MM-dd'T'HH:mm:ss z"
    ).toJSDate()

    switch (frequency.type) {
      case REPORT_FREQUENCY.DAILY:
        if (!frequency.includeWeekends) {
          const saturday = nextSaturday(adjustedDate)
          const sunday = nextSunday(adjustedDate)
          const withoutWeekendsInUTC = DAYS.map((day) => day.cronValue).filter(
            (day) => day !== saturday.getUTCDay() || day !== sunday.getUTCDay()
          )
          return `${adjustedDate.getUTCMinutes()} ${adjustedDate.getUTCHours()} * * ${withoutWeekendsInUTC.join(
            ','
          )}`
        }
        return `${adjustedDate.getUTCMinutes()} ${adjustedDate.getUTCHours()} * * *`

      case REPORT_FREQUENCY.WEEKLY:
        return `${adjustedDate.getUTCMinutes()} ${adjustedDate.getUTCHours()} * * ${adjustedDate.getUTCDay()}`

      case REPORT_FREQUENCY.MONTHLY:
        return `${adjustedDate.getUTCMinutes()} ${adjustedDate.getUTCHours()} * * ${adjustedDate.getUTCDay()}#${dayOfTheMonth}`

      case REPORT_FREQUENCY.ANNUALLY:
        return `${adjustedDate.getUTCMinutes()} ${adjustedDate.getUTCHours()} ${adjustedDate.getUTCDate()} ${
          adjustedDate.getUTCMonth() + 1
        } *`

      case REPORT_FREQUENCY.CUSTOM:
      case REPORT_FREQUENCY.TEMPORARY:
        return calculateCustomFrequency(adjustedDate)

      case REPORT_FREQUENCY.EDIT: {
        const oldIntervalArray = props.fetchedData.oldInterval.split(' ')
        oldIntervalArray[0] = adjustedDate.getUTCMinutes().toString()
        oldIntervalArray[1] = adjustedDate.getUTCHours().toString()
        return oldIntervalArray.join(' ')
      }

      default:
        return ''
    }
  }

  watch(
    () => formData.value.frequency?.type,
    (value) => {
      if (value === REPORT_FREQUENCY.CUSTOM) {
        emit('custom-frequency')
      } else if (value !== REPORT_FREQUENCY.TEMPORARY) {
        emit('reset:custom-frequency')
      }
    }
  )

  watch(
    () => props.recurrenceData.selectString,
    (value) => {
      if (value) {
        OPTIONS.value.set(REPORT_FREQUENCY.TEMPORARY, {
          id: 99,
          label: value,
        })
        nextTick(() => {
          formData.value.frequency.type = REPORT_FREQUENCY.TEMPORARY
        })
      } else {
        OPTIONS.value.delete(REPORT_FREQUENCY.TEMPORARY)
      }
    }
  )

  watch(
    () => props.fetchedData.editSelectString,
    (value) => {
      if (value) {
        OPTIONS.value.set(REPORT_FREQUENCY.EDIT, {
          id: 999,
          label: value,
        })
      }
    }
  )

  function resetFrequency() {
    formData.value.frequency.type = REPORT_FREQUENCY.DAILY
  }

  function reset() {
    formData.value = getReportState()
    timeZone.value = Intl.DateTimeFormat().resolvedOptions().timeZone
    v$.value.$reset()
  }

  function handleTagChange(newTags: Array<{ text: string }>) {
    tags.value = newTags.map((tag) => ({ ...tag, text: tag.text.trim() }))
  }

  watch(
    () => tags.value,
    (newTags) => {
      formData.value.recipients = Array.from(
        new Set(newTags.map((tag) => tag.text.trim()))
      )
    }
  )

  function handleBlur() {
    const reg = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g

    const finalRecipient = tag.value.trim()
    if (
      finalRecipient &&
      finalRecipient.match(reg) &&
      !tags.value.some((tag) => tag.text === finalRecipient)
    ) {
      tags.value = [...tags.value, { text: finalRecipient }]
    }

    tag.value = ''
  }

  watch(
    () => props.data.timeZone,
    (value) => {
      if (value) {
        timeZone.value = value
      }
    }
  )

  watch(
    () => props.data.name,
    () => {
      formData.value = props.data
      if (props.recurrenceData.selectString) {
        formData.value.frequency.type = REPORT_FREQUENCY.TEMPORARY
      }
    }
  )

  watch(
    () => props.data.recipients,
    (recipients) => {
      tags.value = recipients.map((recipient) => ({
        text: recipient,
      }))
    }
  )

  watch(
    () => formData.value,
    (value) => {
      if (!value.recipients.length) {
        tag.value = ''
      }
    }
  )

  const filterNumber = computed(() => {
    const filters = props.report.filter
    const totalFilters = Object.keys(filters).reduce((agg, filter) => {
      if (
        filter === 'completionDate' ||
        filter === 'enrollmentDate' ||
        filter === 'dueDate'
      ) {
        if (filters[filter].from && filters[filter].to) {
          return agg + 1
        }
      }
      if (Array.isArray(filters[filter])) {
        return agg + filters[filter].length
      }
      return agg + Object.values(filters[filter]).length
    }, 0)
    return totalFilters
  })

  function removeUnderscore(text: string) {
    return text.replaceAll('_', ' ')
  }

  defineExpose({
    resetFrequency,
    reset,
  })
</script>
