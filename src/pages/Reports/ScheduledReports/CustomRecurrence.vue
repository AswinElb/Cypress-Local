<template>
  <Modal ref="modal" size="modal-sm" @click:close="close">
    <template #header-text>
      <h5 class="modal-title">Custom Recurrence</h5>
    </template>
    <template #body>
      <form class="report-form">
        <div class="row">
          <label for="reportName" class="form-label">Repeat every</label>
        </div>
        <div class="row">
          <!-- <div class="col-4">
            <input
              v-model="recurrenceData.repeat"
              type="number"
              class="form-control"
            />
          </div> -->
          <div class="col-auto">
            <select
              v-model="recurrenceData.repeatType"
              class="form-select form-select-sm"
            >
              <option
                v-for="type in Object.values(REPEAT_OPTIONS)"
                :key="type"
                :value="type"
              >
                {{ type }}
              </option>
            </select>
          </div>
        </div>
        <div
          v-if="recurrenceData.repeatType === REPEAT_OPTIONS.WEEK"
          class="row mt-2"
        >
          <label for="reportName" class="form-label">Repeat on</label>
          <div v-if="v$.repeatOn.$error" class="invalid-feedback d-block">
            {{
              getLocalizedText('validation.scheduleReportModal.daySelection')
            }}
          </div>
        </div>
        <div class="row">
          <div
            v-if="recurrenceData.repeatType === REPEAT_OPTIONS.WEEK"
            class="col-12 d-flex justify-content-between"
          >
            <single-week-selection @update="updateWeekSelection" />
          </div>
          <div
            v-if="recurrenceData.repeatType === REPEAT_OPTIONS.MONTH"
            class="row mt-2 align-items-center"
          >
            <div class="col-auto">
              <span class="form-label">Monthly On</span>
            </div>
            <div class="col-auto">
              <select
                v-model="recurrenceData.repeatMonthlyOn"
                class="form-select form-select-sm"
              >
                <option v-for="day in NUMBER_OF_DAYS" :key="day" :value="day">
                  {{ day }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-12">
            <label for="range" class="form-label">Ends</label>
          </div>
        </div>
        <div class="row">
          <div class="col-4 d-flex">
            <div class="form-check">
              <input
                id="endsNever"
                v-model="recurrenceData.ends.type"
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                :value="ENDS_ON.NEVER"
                checked
              />
            </div>
            <label class="form-check-label" for="endsNever"> Never </label>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col-4 d-flex mt-1">
            <div class="form-check">
              <input
                id="endsOn"
                v-model="recurrenceData.ends.type"
                class="form-check-input"
                :value="ENDS_ON.DATE"
                type="radio"
                name="flexRadioDefault"
              />
            </div>
            <label class="form-check-label" for="endsOn"> On </label>
          </div>
          <div class="col-8">
            <datepicker
              v-model="recurrenceData.ends.onValue"
              :enable-time-picker="false"
              class="date-picker"
              :format="formatCalendarDate"
              :clearable="false"
            />
          </div>
        </div>

        <div class="row mt-2">
          <div class="col-4 d-flex mt-1">
            <div class="form-check">
              <input
                id="endsAfter"
                v-model="recurrenceData.ends.type"
                class="form-check-input"
                :value="ENDS_ON.AFTER"
                type="radio"
                name="flexRadioDefault"
              />
            </div>
            <label class="form-check-label" for="endsAfter"> After</label>
          </div>
          <div class="col-8 d-flex">
            <input
              v-model="recurrenceData.ends.afterValue"
              type="number"
              class="form-control recurrence-number"
              min="1"
            />
            <span class="fw-light d-inline-flex align-items-center ms-2">
              Occurrences
            </span>
          </div>
          <div
            v-if="v$.ends.afterValue.$error"
            class="invalid-feedback d-block"
          >
            {{ getLocalizedText('validation.scheduleReportModal.occurences') }}
          </div>
        </div>
      </form>
    </template>
    <template #footer>
      <button type="button" class="btn btn-primary" @click="updateRecurrence">
        Done
      </button>
      <button type="button" class="btn btn-outline-primary" @click="cancel">
        Cancel
      </button>
    </template>
  </Modal>
</template>

<script lang="ts" setup>
  import Modal from '@/components/common/Modal.vue'
  import { computed, ref, watch } from 'vue'
  import Datepicker from '@vuepic/vue-datepicker'
  import { formatCalendarDate, formatOrdinals } from '@/utils/date'
  import { DAYS, INITIAL_STATE } from './constants'
  import { cloneDeep } from 'lodash'
  import useVuelidate from '@vuelidate/core'
  import { required, minValue } from '@vuelidate/validators'
  import SingleWeekSelection from './SingleWeekSelection.vue'
  import { getLocalizedText } from '@/utils/util'

  import {
    ENDS_ON,
    REPEAT_OPTIONS,
    RecurrenceData,
    RecurrenceDataAndString,
  } from './types'

  const NUMBER_OF_DAYS = Array.from(Array(32).keys(), (n) => n + 1)

  const emit = defineEmits<{
    (e: 'update:recurrence', payload: RecurrenceDataAndString): void
    (e: 'cancel:recurrence'): void
    (e: 'close'): void
  }>()

  const recurrenceData = ref<RecurrenceData>(cloneDeep(INITIAL_STATE))

  const rules = computed(() => {
    const localRules: any = {
      ends: {
        afterValue: {},
      },
    }

    if (recurrenceData.value.ends.type === ENDS_ON.AFTER) {
      localRules.ends.afterValue = { minValue: minValue(1) }
    }

    if (recurrenceData.value.repeatType === REPEAT_OPTIONS.WEEK) {
      localRules.repeatOn = { required }
    }
    return localRules
  })

  const v$ = useVuelidate(rules, recurrenceData)

  function updateWeekSelection(day: typeof DAYS[number]['cronValue'] | null) {
    if (typeof day === 'number') {
      recurrenceData.value.repeatOn = [day]
      return
    }
    recurrenceData.value.repeatOn = []
  }

  function getfullDayName(id: typeof DAYS[number]['cronValue']) {
    return DAYS.find((day) => day.cronValue === id)?.fullName
  }

  function getRecurrenceString(data: typeof recurrenceData.value) {
    let recurrenceString = ''
    const dayList = data.repeatOn.map(getfullDayName).join(',')

    switch (data.repeatType) {
      case REPEAT_OPTIONS.DAY:
        recurrenceString = 'Daily'

        break
      case REPEAT_OPTIONS.WEEK:
        recurrenceString = `Weekly on ${dayList}`
        break
      case REPEAT_OPTIONS.MONTH:
        recurrenceString = `Every month on the ${formatOrdinals(
          data.repeatMonthlyOn
        )}`
        break
      // case REPEAT_OPTIONS.YEAR:
      //   recurrenceString = `Yearly on ${dayAndMonth}`
      //   stringSplitter = 'Yearly '
      //   replacementString = 'years'
      //   break
      default:
        break
    }

    if (data.ends.type === ENDS_ON.DATE) {
      recurrenceString = `${recurrenceString} until ${formatCalendarDate(
        data.ends.onValue
      )}`
    } else if (data.ends.type === ENDS_ON.AFTER) {
      recurrenceString = `${recurrenceString}, ${data.ends.afterValue} times`
    }

    return recurrenceString
  }

  async function updateRecurrence() {
    const result = await v$.value.$validate()
    if (!result) {
      // notify user form is invalid
      return
    }
    const msg = getRecurrenceString(recurrenceData.value)
    emit('update:recurrence', { data: recurrenceData.value, selectString: msg })
  }

  function reset() {
    recurrenceData.value = cloneDeep(INITIAL_STATE)
    v$.value.$reset()
  }
  function cancel() {
    reset()
    emit('cancel:recurrence')
  }

  function close() {
    reset()
    emit('close')
  }

  watch(
    () => recurrenceData.value.repeatType,
    (value) => {
      if (value !== REPEAT_OPTIONS.WEEK) {
        recurrenceData.value.repeatOn = []
      }
    }
  )
</script>
