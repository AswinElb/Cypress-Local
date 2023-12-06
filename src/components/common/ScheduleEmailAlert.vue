<template>
  <div class="schedule-email-modal">
    <Modal ref="modal">
      <template #header-text>
        <h5 class="modal-title">
          {{ getLocalizedText('message.scheduleEmailAlert.dialogHeader') }}
        </h5>
      </template>
      <template #body>
        {{ alertText }}
      </template>
      <template #footer>
        <button
          type="button"
          class="btn btn-primary"
          @click="handleConfirmRequest"
        >
          Confirm
        </button>
        <button
          type="button"
          class="btn btn-outline-primary"
          @click="handleCancelRequest"
        >
          Cancel
        </button>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
  import modal from 'bootstrap/js/dist/modal'
  import Modal from '@/components/common/Modal.vue'
  import { onMounted, PropType } from 'vue'
  import { cancelRequest } from '@/api/calls'
  import { CancelTokenSource } from 'axios'
  import { getLocalizedText } from '@/utils/util'

  const props = defineProps({
    alertText: {
      type: String,
      required: true,
    },
    source: {
      type: Object as PropType<CancelTokenSource | null>,
      required: false,
    },
  })

  onMounted(() => {
    if (props.source) {
      cancelRequest(props.source)
    }
  })

  const emit = defineEmits([
    'report-schedule-cancelled',
    'report-schedule-confirmed',
    'cancel-request',
  ])

  const handleCancelRequest = () => {
    emit('report-schedule-cancelled')
  }
  const handleConfirmRequest = () => {
    emit('report-schedule-confirmed')
  }
</script>
