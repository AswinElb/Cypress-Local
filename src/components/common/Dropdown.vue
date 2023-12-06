<template>
  <div id="dropdown" ref="dropdown" class="dropdown" @blur="hide">
    <slot name="selected" v-bind="{ show, hide, toggle, activeClass }">
      <button
        id="dropdownMenuButton1"
        class="btn btn-outline-secondary dropdown-toggle"
        :class="{ active: activeClass }"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        @click="toggle"
      ></button>
    </slot>
    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
      <slot name="options" v-bind="{ show, hide, toggle }"></slot>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import { Dropdown } from 'bootstrap'
  import { onMounted, ref, defineExpose, onUnmounted } from 'vue'
  import { getShadowRoot } from '@/utils/base.bootstrap'

  const activeClass = ref(false)

  const dropdown = ref<HTMLElement>()
  let dropdownEl: Dropdown
  function toggle() {
    dropdownEl.toggle()
    activeClass.value = !activeClass.value
  }
  function hide() {
    dropdownEl.hide()
    activeClass.value = false
  }
  function show() {
    dropdownEl.show()
    activeClass.value = true
  }

  function mountHandler(event: Event) {
    if (!dropdown.value?.contains(event.target as Node)) {
      hide()
    }
  }

  onMounted(() => {
    if (dropdown.value) {
      dropdownEl = new Dropdown(dropdown.value, {
        popperConfig: {
          placement: 'auto-start',
        },
      })
    }

    const shadowRoot = getShadowRoot()

    shadowRoot?.addEventListener('click', mountHandler)
  })

  onUnmounted(() => {
    const shadowRoot = getShadowRoot()
    shadowRoot?.removeEventListener('click', mountHandler)
  })

  defineExpose({
    hide,
    toggle,
    show,
  })
</script>
