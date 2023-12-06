<template>
  <div class="root-app-wrapper">
    <Loading v-if="pageState === GlobalPageState.LOADING" />
    <Reporting v-else-if="pageState === GlobalPageState.VALID" />
    <Modal v-else-if="pageState === GlobalPageState.NO_COOKIES">
      <template #header-text>
        <h5 class="modal-title">
          {{ getLocalizedText('message.acceptCookies.dialogHeader') }}
        </h5>
      </template>
      <template #body>
        {{ getLocalizedText('message.acceptCookies.dialogBody') }}
      </template>
      <template #footer>
        <button type="button" class="btn btn-primary" @click="requestStorage">
          Accept Cookies
        </button>
      </template>
    </Modal>
    <Error v-else />
    <div
      ref="toastComponent"
      :class="`toast ${
        toast.variant
      } text-white position-absolute top-0 end-0 mt-4 fade ${
        toast.show ? 'show' : 'hide'
      } z-10`"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <template v-if="toast.title">
        <div class="toast-header">
          <strong class="me-auto">{{ toast.title }}</strong>
          <small class="text-muted">{{ toast.age || 'just now' }}</small>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="toast"
            aria-label="Close"
            @click="hideToast"
          />
        </div>
        <div class="toast-body">
          {{ toast.body }}
        </div>
      </template>
      <template v-else>
        <div class="d-flex">
          <div class="toast-body">
            {{ toast.body }}
          </div>
          <button
            type="button"
            class="btn-close btn-close-white me-2 m-auto"
            data-bs-dismiss="toast"
            aria-label="Close"
            @click="hideToast"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
  import {
    defineComponent,
    onMounted,
    computed,
    ref,
    watch,
    onUnmounted,
    onBeforeMount,
  } from 'vue'
  import { useLoggedInUserStore } from '@/store/index'
  import { fetchUserInfo, getValidateOrg } from './utils/user'
  import Loading from './pages/Loading.vue'
  import Reporting from './pages/Reports/Reporting.vue'
  import { Toast } from 'bootstrap'
  import { displayToast } from './utils/show-toast'
  import { Variant } from './types/toast'
  import { getLocalizedText } from './utils/util'
  import { GlobalPageState } from './types'
  import Error from './Error.vue'
  import modal from 'bootstrap/js/dist/modal'
  import Modal from '@/components/common/Modal.vue'

  export default defineComponent({
    name: 'App',
    components: {
      Loading,
      Reporting,
      Error,
      Modal,
    },
    props: {
      email: {
        type: String,
        required: true,
      },
      organizationId: {
        type: Number,
        required: true,
      },
      sid: {
        type: String,
        required: true,
      },
    },
    setup(props) {
      const store = useLoggedInUserStore()

      const toastComponent = ref()

      const toast = computed(() => store.toast)

      const requestStorage = () => {
        const promise = document.requestStorageAccess()
        promise.then(
          async function () {
            await validateEnabledOrg(props.organizationId)
            await getUserInfo()
          },
          function (reason) {
            console.warn('reason', reason)
            // Promise was rejected for some reason.
          }
        )
      }

      watch(toast, () => {
        if (toast.value.show && toastComponent.value) {
          const toastEl = new Toast(toastComponent.value)
          toastEl.show()
        }
      })

      const getUserInfo = async () => {
        try {
          await fetchUserInfo(props.email, props.organizationId, props.sid)
          store.setPageState(GlobalPageState.VALID)
        } catch (error) {
          store.setPageStateMsg(getLocalizedText('alert.general.userAuthFail'))
          store.setPageState(GlobalPageState.ERROR)
          throw error
        }
      }

      const onToastHidden = () => {
        const updatedToast = { ...toast.value, show: false }
        store.updateToast(updatedToast)
      }

      const validateEnabledOrg = async (orgId: number) => {
        try {
          const res = await getValidateOrg(orgId)
          if (!res.data.data) {
            throw new Error()
          }
        } catch (error) {
          displayToast(
            getLocalizedText('alert.general.orgCheckFail'),
            Variant.DANGER,
            `Error`
          )
          store.setPageState(GlobalPageState.ERROR)
          throw error
        }
      }

      const checkCookie = () => {
        var cookieEnabled = navigator.cookieEnabled
        if (!cookieEnabled) {
          document.cookie = 'testcookie'
          cookieEnabled = document.cookie.indexOf('testcookie') !== -1
        }
        return cookieEnabled
      }

      onBeforeMount(async () => {
        store.setPageState(GlobalPageState.LOADING)
        try {
          if (document.hasStorageAccess) {
            const hasAccess = await document.hasStorageAccess()
            if (hasAccess) {
              await validateEnabledOrg(props.organizationId)
              await getUserInfo()
            } else {
              store.setPageState(GlobalPageState.NO_COOKIES)
            }
          } else if (!checkCookie()) {
            store.setPageState(GlobalPageState.NO_COOKIES)
          } else {
            await validateEnabledOrg(props.organizationId)
            await getUserInfo()
          }
        } catch (e) {
          console.error(e)
        }
      })

      onMounted(() => {
        if (toastComponent.value) {
          toastComponent.value.addEventListener(
            'hidden.bs.toast',
            () => onToastHidden
          )
        }
      })

      const hideToast = () => {
        if (toastComponent.value) {
          const toastEl = new Toast(toastComponent.value)
          toastEl.hide()
        }
      }

      onUnmounted(() => {
        removeEventListener('hidden.bs.toast', onToastHidden)
      })

      return {
        pageState: computed(() => store.pageState),
        toast,
        toastComponent,
        hideToast,
        requestStorage,
        getLocalizedText,
        GlobalPageState: GlobalPageState,
      }
    },
  })
</script>

<style lang="scss">
  @import 'src/assets/styles/global';
</style>
