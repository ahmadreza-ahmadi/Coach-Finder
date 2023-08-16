<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  type: {
    type: String,
    default: 'button'
  },
  to: {
    type: String,
    default: '/'
  },
  mode: {
    type: String,
    default: 'fill'
  }
})

const BASE_CLASS = 'px-4 py-2 rounded-lg font-medium'

const MODES_CLASS = {
  fill: 'bg-blue-500 text-white',
  outline: 'border-2 border-blue-400 text-blue-500'
}

const finalClass = computed(() => {
  return [BASE_CLASS, MODES_CLASS[props.mode]]
})
</script>

<template>
  <RouterLink v-if="props.type === 'router-link'" :to="props.to" :class="finalClass">
    <slot></slot>
  </RouterLink>
  <button v-else :type="props.type" :class="finalClass">
    <slot></slot>
  </button>
</template>
