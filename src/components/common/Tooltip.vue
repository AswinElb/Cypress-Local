<template>
  <div
    ref="toolTipNode"
    data-bs-toggle="tooltip"
    :class="wrapText ? 'wrap-text' : ''"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
  import { onBeforeUnmount, onMounted, ref, PropType } from 'vue'
  import { Tooltip } from 'bootstrap'
  import { getShadowRoot } from '@/utils/base.bootstrap'
  import { Placement } from '@/types/tooltip'

  const toolTipNode = ref<HTMLElement>()

  const props = defineProps({
    message: {
      type: String,
      required: true,
    },
    offsetX: {
      type: Number,
      default: 0,
    },
    offsetY: {
      type: Number,
      default: 0,
    },
    // TODO: Better composition for line-wrapping. Remove wrapping from tooltip.
    wrapText: {
      type: Boolean,
      default: false,
    },
    placement: {
      type: String as PropType<Placement>,
      default: Placement.Auto,
    },
  })

  const toolTip = ref<Tooltip>()

  //check to determine if an overflow is happening
  const isOverflowing = (element: HTMLElement | undefined) => {
    if (!element) {
      return false
    }
    return element.scrollWidth > element.offsetWidth
  }

  onMounted(() => {
    if (isOverflowing(toolTipNode.value)) {
      const shadowRoot = getShadowRoot()
      toolTip.value = new Tooltip(toolTipNode.value as Element, {
        container: shadowRoot as any,
        placement: props.placement as Placement,
        animation: false,
        title: props.message,
        offset: [props.offsetX, props.offsetY],
      })
    }
  })

  onBeforeUnmount(() => {
    if (toolTip.value) {
      toolTip.value.hide()
    }
    if (toolTipNode.value) {
      toolTipNode.value.remove()
    }
  })
</script>
