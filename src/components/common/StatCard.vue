<template>
  <div :class="`card card-stats`">
    <div class="d-flex card-body bs-override">
      <div class="row">
        <h5 class="card-title text-muted mb-0">{{ title }}</h5>
        <div class="row">
          <div class="bottom-text pt-1 d-flex align-items-center">
            <span class="col-auto h4 px-0 my-0">
              {{
                figures.new > 1000
                  ? (Math.round(figures.new * 100) / 100000).toFixed(2) + 'k'
                  : figures.new
              }}
            </span>

            <span
              :class="`col-auto ${
                figures.new > figures.old
                  ? 'stat-card-progress'
                  : 'stat-card-regress'
              }`"
            >
              <Icon
                class="cursor-default"
                :icon-type="`${
                  figures.new > figures.old ? 'arrow-up' : 'arrow-down'
                }`"
                :stroke="`${figures.new > figures.old ? 'green' : 'red'}`"
                size="15"
              />
              {{ Math.round(diffPercentage ?? 0) }}%
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import Icon from './Icon.vue'
  import { StatData } from '@/pages/Reports/Analytics/types'

  export default defineComponent({
    name: 'StatCard',
    components: {
      Icon,
    },
    props: {
      title: {
        type: String,
        default: '',
      },
      figures: {
        type: Object as () => StatData,
        default: () => ({ new: 0, old: 0 }),
      },
      isLast: {
        type: Boolean,
        default: false,
      },
    },
    setup(props) {
      const diffPercentage = computed(() => {
        const diffResult = percDiff(props.figures.new, props.figures.old)
        if (isNaN(diffResult) || diffResult === Infinity) {
          return 0
        }
        return diffResult
      })

      const percDiff = (newNumber: number, oldNumber: number) => {
        return +Math.abs(100 - (newNumber / oldNumber) * 100).toFixed(2)
      }

      return { diffPercentage }
    },
  })
</script>
